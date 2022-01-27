const mongoose = require('mongoose');

// TODO: Expand on this so that we can created Threads in the application.
//       For now, I want these to actually be pulled from another API.
const ActivitySchema = new mongoose.Schema({
    body: { 
        type: String,
        default: ""
    },
    authors: [{ 
        type: mongoose.Types.ObjectId,
        ref: 'Member'
    }],
    eventId: mongoose.Types.ObjectId, // So we an know what triggered this event and also link to it.
    appUsed: String, // In case this was generated from another app using our API
    _organizationId: { 
        type: mongoose.Types.ObjectId, 
        ref: 'Organization'
    }
},
{
    timestamps: true
});

const Activity = mongoose.model("Activity", ActivitySchema);

module.exports = {
    Thread
}