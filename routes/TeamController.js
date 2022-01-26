const { Team } = require("../models")

let TeamController = {
    find: async (req, res) => {
        res.send("Testing the team controller")
    },
    findById: async (req, res) => {

    },
    create: async (req, res) => {
        // let newTeam = Team.create(req.body);
        // newTeam.save();
        res.send("Testing post (create) request")
    },
    update: async (req, res) => {
        res.send("Testing put (update) request")
    },
    findMembers: async (req, res) => {
        Team
            .find({ _id: req.params.teamId }, { members: 1 })
            .then((err, teamObj) => {
                if (err) return res.status(500).json(err)
                return res.status(200).json(teamObj);
            })

    },
    addMember: async (req, res) => {
        if(req.params?.memberId === undefined) return res.send(400).json("Did not include member id to update.") 
        Team
            .findByIdAndUpdate({ _id: req.params.teamId}, 
                { $push: { members: req.body.memberId }, $inc: { team_count:  1} }, 
                { new: true})
            .then((updatedTeam) => {
                res.send(updatedTeam)
            })
            .catch(err => {
                res.json(err);
            });
    },
    // Will most likely never be used
    updateMember: async (req, res) => {
    },
    removeMember: async (req, res) => {
        if (req.params?.memberId === undefined) {
            return res.status(400).json("Did not include member to update.")
        }
        let team = await Team.findOne({ _id: req.params.teamId, members: req.params.memberId })
        if (!team) {
            return res.status(400).json("This team does not exist or does not contain this member");
        }
        team.update({ _id: req.params.teamId },
            { $pull: { members: req.params.memberId }, $inc: { memberCount: -1 } },
            { new: true })
            .then((updatedTeam) => {
                res.send(updatedTeam)
            })
            .catch(err => {
                res.json(err);
            })
    },
}

module.exports = TeamController