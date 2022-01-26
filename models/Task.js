const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    notes: String,
    isSubtask: {
        type: Boolean,
        default: false,
        required: true
    },
    subtask: {
        tasks: [mongoose.Types.ObjectId],
        mainTaskId: mongoose.Types.ObjectId // Provides a way of finding what this belongs to
    },
    createdBy: null,
    dueDate: Date,
    teams: [mongoose.Types.ObjectId],
    assignedTo: [mongoose.Types.ObjectId],
    _organizationId: mongoose.Types.ObjectId
},
{
    timestamps: true
})