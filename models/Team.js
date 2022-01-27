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
        type: Number,
        //required: true
    }, 
    memberCount: {
        type: Number,
        default: 0
    },
    threadCount: {
        type: Number,
        default: 0
    },
    threads: [mongoose.Types.ObjectId],
    members: [mongoose.Types.ObjectId],
    tasks: [{ type: mongoose.Types.ObjectId, ref: 'Task'}], //Add rights to this as well
    leadership: [mongoose.Types.ObjectId],
    _organizationId: {
        type: mongoose.Types.ObjectId,
        //required: true
    }
},
{
    timestamps: true
});

const Team = mongoose.model("Team", TeamSchema);

module.exports = Team;