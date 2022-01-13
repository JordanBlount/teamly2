const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

const Organization = mongoose.model("Organization", OrganizationSchema);

module.exports = {
    Organization
}