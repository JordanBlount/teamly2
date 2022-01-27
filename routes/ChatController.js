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
        if (req.params?.memberId === undefined) 
            return res.status(400).json("Does not contain member id.");
        Member
            .findById(req.params.memberId, { chats: 1 })
            .then(chats => {
                res.status(200).json(chats);
            })
            .catch(err => {
                res.json(err)
            })

    },
    find: async (req, res) => {
        if (req.params?.chatId === undefined) 
            return res.status(400).json("Does not contain chat id.");
        Chat
            .findById(req.params.chatId)
            .then(chat => {
                res.status(200).json(chat)
            })
            .catch(err => {
                res.json(err);
            })
    },
    create: async (req, res) => {
        if(req.body?.startedBy === undefined) 
            return res.status(400).json("Somehow no one started this chat.")
        let newChat = new Chat(req.body);
        newChat.save(err => {
            if(err) {
                if(err instanceof mongoose.Error.ValidationError) {
                    console.log("An error occured while validating.");
                    // Return details to be seen on client side
                    return res.status(422).json(err); 
                } else {
                    console.log(err);
                    return res.status(500).json(err);
                }
            }
            res.status(200).json(newChat);
        })
        Member
            .updateMany({ _id: { $all: newChat.participants } }, { $push: { chats: newChat._id, $inc: { chatCount: 1 } } })
    },
    update: async (req, res) => {
        if (req.params?.chatId === undefined) 
            return res.status(400).json("Does not contain chat id.");
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
        if (req.params?.chatId === undefined) 
            return res.status(400).json("Does not contain chat id.");
        Chat
            .findByIdAndDelete(req.params.chatId)
            .then(deletedChat => {
                res.status(200).json(deletedChat)
            })   
            .catch(err => {
                res.send(err)
            })
        // Remove all chat messages or archive them? It may be a good idea to save them for potential future linking
        // Maybe not
    }
}

module.exports = ChatController;