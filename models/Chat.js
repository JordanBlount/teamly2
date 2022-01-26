const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    participates: [],
    messageCount: 0,
    messages: [],
    createdOn: null,
    startedBy: null,
});

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = {
    Chat
}