const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    name: String,
    email: String,
    jobtitle: String,
    teams: []
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

module.exports = {
    Member
}