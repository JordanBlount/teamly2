const { Chat, ChatMessage, Member } = require('../models');
const mongoose = require('mongoose')

let ChatController = {
    findAll: async (req, res) => {
        Chat
            .find()
            .then(chats => {
                res.send(chats)
            })
            .catch(err => {
                res.send(err)
            })
    },
    findAllByMemberId: async (req, res) => {
        if (req.params?.memberId === undefined) return res.status(400).json("Does not contain member id.");
        Member
            .findById(req.params.memberId, { chatCount: 1, chats: 1 })
            .then(chats => {
                res.status(200).json(chats);
            })
            .catch(err => {
                res.json(err)
            })

    },
    find: async (req, res) => {
        if (req.params?.chatId === undefined) return res.status(400).json("Does not contain chat id.");
        Chat
            .findById(req.params.chatId)
            .then(chat => {
                res.status(200).json(chat)
            })
            .catch(err => {
                res.json(err);
            })
    },
    create: async (req, res) => { // TODO: This should also prevent new chats from being made if the same people are already in a chat (or group chat)
        if (req.body?.startedBy === undefined) return res.status(400).json("Somehow no one started this chat.")
        if (req.body?.participants === undefined || req.body.participants.length <= 1) return res.status(400).json("A chat can not be started by only one person alone.")

        Chat
            // TODO: We need to check this for performance because it may be super costly.
            // May be possible to try and do this on the client side before on the server side.
            // We could check the "state" data to see if a conversation already exist and then
            // create it. Also, due to pusher giving us realtime updates, we would not need to
            // worry about date being stale. It would be available there.
            .countDocuments({ participants: { $in: req.body.participants } }, { limit: 1 })
            .then((count) => {
                if (count > 0) {
                    //console.log("Tried to create a chat that already exist.")
                    return res.status(400).json("This chat already exists");
                } else {
                    let newChat = new Chat(req.body);
                    newChat.save(err => {
                        if (err) {
                            if (err instanceof mongoose.Error.ValidationError) {
                                console.log("An error occured while validating.");
                                // Return details to be seen on client side
                                return res.status(422).json(err);
                            } else {
                                console.log(err);
                                return res.status(500).json(err);
                            }
                        }
                        res.status(200).json(newChat);
                        // To get this to work, I had to use "$in" + "[...req.body.participants]"
                        Member
                            .updateMany({ _id: { $in: [...req.body.participants] } }, { $push: { chats: newChat._id }, $inc: { chatCount: 1 } })
                            // Somehow chaining this onto the updateMany makes it work....
                            .then(log => { });
                    })
                }
            })
    },
    update: async (req, res) => {
        if (req.params?.chatId === undefined) return res.status(400).json("Does not contain chat id.");
        Chat
            .findByIdAndUpdate(req.params.chatId, req.body, { new: true })
            .then(updatedChat => {
                res.sendStatus(200)
            })
            .catch(err => {
                res.send(err)
            })
    },
    delete: async (req, res) => {
        if (req.params?.chatId === undefined) return res.status(400).json("Does not contain chat id.");
        Chat
            .findByIdAndDelete(req.params.chatId)
            .then(deletedChat => {
                res.status(200).json(deletedChat)
                // TODO: Add pusher event to remove this chat from everyone's list
                Member
                    .updateMany({ _id: { $in: [...req.body.participants] } }, { $pull: { chats: req.params.chatId }, $inc: { chatCount: -1 } })
                    .then(log => { })
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = ChatController;