const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    name: String,
    email: String,
    jobtitle: String,
    teamCount: {
        type: Number,
        default: 0
    },
    teams: [],
    chatCount: {
        type: Number,
        default: 0
    },
    chats: [{ 
        type: mongoose.Types.ObjectId, 
        ref: 'Chat' 
    }]
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