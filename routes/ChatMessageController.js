const { Chat, ChatMessage, Member } = require('../models');

let ChatMessageController = {
    findAll: async (req, res) => {
        if (req.params?.chatId === undefined) return res.status(400).json("Does not contain a chat id.");
        ChatMessage
            .find({ _chatId: req.params.chatId }).sort({ createdAt: -1 })
            .then(messages => {
                res.status(200).json(messages)
            })
            .catch(err => {
                res.json(err)
            })
    },
    find: async (req, res) => {
        if (req.params?.chatId === undefined) return res.status(400).json("Does not contain chat id.");
        if (req.params?.messageId === undefined) return res.status(400).json("Does not contain message id.");
        ChatMessage
            .findById(req.params.messageId)
            .then(chat => {
                res.status(200).json(chat)
            })
            .catch(err => {
                res.json(err);
            })
    },
    findWithConditions: async (req, res) => {
        if (req.params?.chatId === undefined) return res.status(400).json("Does not contain chat id.");
        if (req.params?.messageId === undefined) return res.status(400).json("Does not contain message id.");

        // Make it based on a date range and/or limit of messages (e.g. 10)
    },
    create: async (req, res) => {
        if(req.params?.chatId === undefined) return res.status(400).json("Needs a chat Id.")
        if(req.body?.sender === undefined) return res.status(400).json("The sender field can not be empty")
        let newMessage = new ChatMessage(req.body);
        newMessage.save(err => {
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
            res.status(200).json(newMessage);
            Chat
                .findOneAndUpdate({ _id: req.params.chatId }, { $push: { messages: newMessage._id }, $inc: { messageCount: 1 }})
                .then(log => {});
            // TODO: Add pusher event to send message to everyone in the chat.
        })
    },
    update: async (req, res) => {
        if (req.params?.chatId === undefined) return res.status(400).json("Does not contain chat id.");
        if (req.params?.messageId === undefined) return res.status(400).json("Does not contain message id.");
        ChatMessage
            .findByIdAndUpdate(req.params.messageId, req.body, { new: true })
            .then(updatedChat => {
                res.sendStatus(200)
            })
            .catch(err => {
                res.send(err)
            })
        // TODO: Add pusher event to update message on client side.
    },
    delete: async (req, res) => {
        if (req.params?.chatId === undefined) return res.status(400).json("Does not contain chat id.");
        if (req.params?.messageId === undefined) return res.status(400).json("Does not contain message id.");
        ChatMessage
            .findByIdAndDelete(req.params.messageId)
            .then(deletedChat => {
                res.status(200).json(deletedChat)
            })   
            .catch(err => {
                res.send(err)
            })
        // TODO: Add pusher event to delete message on client side. Replace with a "Deleted Message"
        // text. Should be something super simple
    }
}

module.exports = ChatMessageController;