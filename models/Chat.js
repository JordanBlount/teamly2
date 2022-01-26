const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    participates: [{ type: mongoose.Types.ObjectId, ref: 'Member' }],
    messageCount: 0,
    messages: [{ type: mongoose.Types.ObjectId, ref: 'ChatMessage' }],
    startedBy: mongoose.Types.ObjectId,
},
{
    timestamps: true
});

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = {
    Chat
}