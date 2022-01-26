const mongoose = require('mongoose');

const ThreadMessageSchema = new mongoose.Schema({
    body: { 
        type: String,
        default: ""
    },
    sender: { type: mongoose.Types.ObjectId, ref: 'Member' },
    replies: [{
        body: String,
        name: String,
        postedBy: {
            type: mongoose.Types.ObjectId,
            ref: 'Member'
        }
    }],
    isReply: {
        type: Boolean,
        default: false
    },
    repliedToMsgId: {
        type: mongoose.Schema.ObjectId, 
        ref: 'ThreadMessage'
    },
},
{
    timestamps: true
});

const ThreadMessage = mongoose.model("ThreadMessage", ThreadMessageSchema);

module.exports = ThreadMessage;