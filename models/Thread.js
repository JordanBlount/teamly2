const mongoose = require('mongoose');

// TODO: Expand on this so that we can created Threads in the application.
//       For now, I want these to actually be pulled from another API.
const ThreadSchema = new mongoose.Schema({
    title: String,
    body: { 
        type: String,
        default: ""
    },
    authors: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Member' 
    }],
    comments: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ThreadMessage' 
    }],
    seenBy: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Member' }], //Ids of everyone who has read the message
    _teamId: { 
        type: mongoose.Types.ObjectId, 
        ref: 'Team' 
    },
    lastEdit: Date,
    lastEditBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    } // Should only be updated when the "body" is changed
},
{
    timestamps: true
});

const Thread = mongoose.model("Thread", ThreadSchema);

module.exports = Thread;