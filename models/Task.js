const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    notes: String,
    dueDate: {type: Date},
    completed: {
        type: Boolean,
        default: false
    },
    completedOn: {
        type: Date
    },
    isSubtask: {
        type: Boolean,
        default: false,
        required: true
    },
    subtask: {
        tasks: [mongoose.Types.ObjectId],
        mainTaskId: mongoose.Types.ObjectId // Provides a way of finding what this belongs to
    },
    createdBy: [{
        type: mongoose.Types.ObjectId,
        ref: 'Member'
    }],
    teams: [{
        type: mongoose.Types.ObjectId,
        ref: 'Team'
    }],
    assignedTo: [mongoose.Types.ObjectId],
    _organizationId: mongoose.Types.ObjectId
},
{
    timestamps: true
})

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;