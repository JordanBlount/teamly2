const mongoose = require('mongoose');

// TODO: Expand on this so that we can created Threads in the application.
//       For now, I want these to actually be pulled from another API.
const ActivitySchema = new mongoose.Schema({
    body: { 
        type: String,
        default: ""
    },
    authors: [mongoose.Types.ObjectId],
    eventId: mongoose.Types.ObjectId, // So we an know what triggered this event and also link to it.
    appUsed: String, // In case this was generated from another app using our API
    _organizationId: mongoose.Types.ObjectId
},
{
    timestamps: true
});

const Activity = mongoose.model("Activity", ActivitySchema);

module.exports = {
    Thread
}