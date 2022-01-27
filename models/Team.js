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
        required: true
    }, 
    memberCount: {
        type: Number,
        default: 0
    },
    threadCount: {
        type: Number,
        default: 0
    },
    taskCount: {
        type: Number,
        default: 0
    },
    threads: [{ 
        type: mongoose.Types.ObjectId,
        ref: 'Thread' 
    }],
    members: [{ 
        type: mongoose.Types.ObjectId,
        ref: 'Member' 
    }],
    tasks: [{ //Add rights to this as well
        type: mongoose.Types.ObjectId, 
        ref: 'Task'
    }],
    leadership: [{ 
        type: mongoose.Types.ObjectId, 
        ref: 'Member' 
    }],
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