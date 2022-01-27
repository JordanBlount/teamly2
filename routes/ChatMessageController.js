const { Chat, ChatMessage, Member } = require('../models');

let ChatMessageController = {
    findAll: async (req, res) => {
        if (req.params?.chatId === undefined) return res.status(400).json("Does not contain a chat id.");
        ChatMessage
            .find({ _chatId: req.params.chatId }).sort({ date: -1 })
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
    }
}

module.exports = ChatMessageController;