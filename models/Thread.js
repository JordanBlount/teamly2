const mongoose = require('mongoose');

// TODO: Expand on this so that we can created Threads in the application.
//       For now, I want these to actually be pulled from another API.
const ThreadSchema = new mongoose.Schema({
    body: { 
        type: String,
        default: ""
    },
    publishedBy: [],
    publishedDate: {
        type: Date,
        required: true
    },
    comments: [],
    seenBy: [], //Ids of everyone who has read the message
    _teamId: mongoose.Types.ObjectId
});

const Thread = mongoose.model("Thread", ThreadSchema);

module.exports = {
    Thread
}