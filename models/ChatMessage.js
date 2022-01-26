const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
    body: { 
        type: String,
        default: ""
    },
    sender: null,
    isReply: {
        type: Boolean,
        default: false
    },
    repliedToMsgId: {
        type: mongoose.Schema.ObjectId
    },
    seenBy: [mongoose.Types.ObjectId] //Ids of everyone who has read the message
},
{
    timestamps: true
});

const ChatMessage = mongoose.model("ChatMessage", ChatMessageSchema);

module.exports = {
    ChatMessage
}