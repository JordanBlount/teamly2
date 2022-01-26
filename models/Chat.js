const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    participates: [mongoose.Types.ObjectId],
    messageCount: 0,
    messages: [mongoose.Types.ObjectId],
    startedBy: [mongoose.Types.ObjectId],
},
{
    timestamps: true
});

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = {
    Chat
}