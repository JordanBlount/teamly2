const { Member } = require('../models/');

let MemberController = {

    findById: async (req, res) => {
        res.send("Task found");
    },
    findAll: async (req, res) => {
        res.send("All tasks sent");
    },
    create: async (req, res) => {
        res.send('THIS IS WORKING');
    },
    update: async(req, res) => {
        res.send('Task was update successfully');
    },
    delete: async (req, res) => {
        res.send("Task was deleted successfully");
    }
    
}

module.exports = MemberController;