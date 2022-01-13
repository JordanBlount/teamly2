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
        trim
    },
    type: {
        type: BigInt,
        required: true
    }, 
    _organizationId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

const Team = mongoose.model("Team", TeamSchema);

module.exports = {
    Team
}