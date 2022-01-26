const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }, 
    teams_count: {
        type: BigInt,
    },
    members_count: {
        type: BigInt
    },
    teams: [{

    }],
    tasks: {
        completed: 0,
        inProgress: 0,
    },
    inviteId: {
        type: BigInt
    },
    leadership: null,
    canModify: null,
    /* 
        TODO: Make this auto-generated. This can be given to someone to be
        so that they can sign up for a specific organization. That way,
        this app can be used for multiple organizations and not just one.
    */
    // inviteId: {
    //     type: BigInt,
    // }
});

const Organization = mongoose.model("Organization", OrganizationSchema);

module.exports = {
    Organization
}