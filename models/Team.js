const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }, 
    description: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    type: {
        type: BigInt,
        required: true
    }, 
    threads: [mongoose.Types.ObjectId],
    members: [mongoose.Types.ObjectId],
    leadership: [mongoose.Types.ObjectId],
    _organizationId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
},
{
    timestamps: true
});

const Team = mongoose.model("Team", TeamSchema);

module.exports = {
    Team
}