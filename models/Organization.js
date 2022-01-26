const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }, 
    teams_count: {
        type: Number,
        default: 0
    },
    members_count: {
        type: Number,
        default: 0
    },
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
    tasks: {
        completed: {
            type: Number,
            default: 0
        },
        inProgress: {
            type: Number,
            default: 0
        }
    },
    inviteId: {
        type: Number,
        default: 0
    },
    leadership: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }],
    canModify: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }],
},
{
    timestamps: true
});

const Organization = mongoose.model("Organization", OrganizationSchema);

module.exports = Organization;