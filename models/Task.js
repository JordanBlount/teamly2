const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    notes: String,
    subtasks: [],
    createdOn: null,
    createdBy: null,
    dueDate: Date,
    teams: [],
    assignedTo: [],
    _organizationId: mongoose.Types.ObjectId
})