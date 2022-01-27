const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    participates: [{ type: mongoose.Types.ObjectId, ref: 'Member' }],
    messageCount: 0,
    messages: [{ type: mongoose.Types.ObjectId, ref: 'ChatMessage' }],
    startedBy: { type: mongoose.Types.ObjectId, ref: 'Member', required: true}
},
{
    timestamps: true
});

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;