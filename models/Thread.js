const mongoose = require('mongoose');

// TODO: Expand on this so that we can created Threads in the application.
//       For now, I want these to actually be pulled from another API.
const ThreadSchema = new mongoose.Schema({
    title: String,
    body: { 
        type: String,
        default: ""
    },
    authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ThreadMessage' }],
    seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }], //Ids of everyone who has read the message
    _teamId: mongoose.Types.ObjectId
},
{
    timestamps: true
});

const Thread = mongoose.model("Thread", ThreadSchema);

module.exports = {
    Thread
}