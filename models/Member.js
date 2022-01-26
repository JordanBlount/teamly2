const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String, // TODO: May not be necessary for now
    jobTitle: String,
    address: [{

    }],
    phoneNumber: [{

    }],
    birthday: Date,
    nativeLanguage: "",
    languages: [],
    teams: []
});

const Member = mongoose.model("Member", MemberSchema);

module.exports = {
    Member
}