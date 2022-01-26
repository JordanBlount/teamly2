const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
    body: { 
        type: String,
        default: ""
    },
    sender: [{ type: mongoose.Types.ObjectId, ref: 'Member'}],
    isReply: {
        type: Boolean,
        default: false
    },
    repliedToMsgId: {
        type: { type: mongoose.Types.ObjectId, ref: 'ChatMessage' }
    },
    seenBy: [{ type: mongoose.Types.ObjectId, ref: 'Member'}] //Ids of everyone who has read the message
},
{
    timestamps: true
});

const ChatMessage = mongoose.model("ChatMessage", ChatMessageSchema);

module.exports = {
    ChatMessage
}