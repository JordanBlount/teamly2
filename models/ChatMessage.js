const mongoose = require('mongoose');

// TODO: Turning this into a cluster of messages may be better
//       I could save the messages for each day into a single document
const ChatMessageSchema = new mongoose.Schema({
    body: { 
        type: String,
        default: ""
    },
    sender: [{ type: mongoose.Types.ObjectId, ref: 'Member', required: true}],
    isReply: {
        type: Boolean,
        default: false
    },
    repliedToMsgId: {
        type: { type: mongoose.Types.ObjectId, ref: 'ChatMessage' }
    },
    seenBy: [{ type: mongoose.Types.ObjectId, ref: 'Member'}], //Ids of everyone who has read the message
    _chatId: { type: mongoose.Types.ObjectId, ref: 'Chat' }
},
{
    timestamps: true
});

const ChatMessage = mongoose.model("ChatMessage", ChatMessageSchema);

module.exports = ChatMessage;