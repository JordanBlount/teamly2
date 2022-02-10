const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    name: String,
    email: String,
    jobTitle: String,
    profileImg: String, // I can create a default for this. I may 
    teamCount: {
        type: Number,
        default: 0
    },
    teams: [
        {
            teamId: {
                type: mongoose.Types.ObjectId,
                ref: "Team"
            }, 
            roles: {}
        }
    ],
    chatCount: {
        type: Number,
        default: 0
    },
    chats: [{ 
        type: mongoose.Types.ObjectId, 
        ref: 'Chat' 
    }],
    taskCount: {
        type: Number,
        default: 0
    }, 
    tasks: [{
        type: mongoose.Types.ObjectId,
        ref: 'Task'
    }],
    _organizationId: {
        type: mongoose.Types.ObjectId,
        ref: "Organization"
    },
    org_roles: {
        
    }
    // name: String,
    // email: String,
    // password: String, // TODO: May not be necessary for now
    // jobTitle: String,
    // address: [{

    // }],
    // phoneNumber: [{

    // }],
    // birthday: Date,
    // nativeLanguage: "",
    // languages: [],
    // teams: [],
    // socialMediaHandles: []
},
{
    timestamps: true
});

const Member = mongoose.model("Member", MemberSchema);

module.exports = Member;