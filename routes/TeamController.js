const { Team } = require("../models")

let TeamController = {
    find: async (req, res) => {
        res.send("Testing the team controller")
    },
    findById: async (req, res) => {

    },
    findTasks: async (req, res) => {

    },
    findMembers: async (req, res) => {
        
    },
    create: async (req, res) => {
        // let newTeam = Team.create(req.body);
        // newTeam.save();
        res.send("Testing post (create) request")
    },
    update: async (req, res) => {
        res.send("Testing put (update) request")
    }
}

module.exports = TeamController