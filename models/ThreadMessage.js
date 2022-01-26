const mongoose = require('mongoose');

const ThreadMessageSchema = new mongoose.Schema({
    body: { 
        type: String,
        default: ""
    },
    sender: mongoose.Types.ObjectId,
    replies: [],
    isReply: {
        type: Boolean,
        default: false
    },
    repliedToMsgId: {
        type: mongoose.Schema.ObjectId
    },
    publishedDate: {
        type: Date,
        required: true
    },
});

const ThreadMessage = mongoose.model("ThreadMessage", ThreadMessageSchema);

module.exports = {
    ThreadMessage
}