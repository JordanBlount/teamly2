const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }, 
    teams_count: Number,
    members_count: Number,
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
    tasks: {
        completed: 0,
        inProgress: 0,
    },
    inviteId: Number,
    leadership: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }],
    canModify: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }],
},
{
    timestamps: true
});

const Organization = mongoose.model("Organization", OrganizationSchema);

module.exports = {
    Organization
}