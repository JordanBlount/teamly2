const { Team } = require("../models")

let TeamController = {
    findAll: async (req, res) => {
        try {
            let teams = await Team.find();
            if (teams) {
                res.status(200).json(teams)
            } else {
                res.status(401).json("There are no teams.")
            }
        } catch (err) {
            console.log(err)
            res.status(500).json("Server error.")
        }
    },
    find: async (req, res) => {
        try {
            let team = await Team.findOne({ _id: req.params.orgId });
            if (team) {
                res.status(200).json(team)
            } else {
                res.status(401).json("Team does not exist.")
            }
        } catch (err) {
            console.log(err)
            res.status(500).json("Server error.")
        }
    },
    create: async (req, res) => {
        // TODO: Make the error handling better here
        const { title, description, type } = req.body;
        if (title === undefined || title === '') {
            return res.status(401).json("Does not contain a title.")
        }
        if (description === undefined || description === '') {
            return res.status(401).json("Does not have a description.")
        }
        if (type === undefined || type === -1) {
            return res.status(401).json("Does not have a team type")
        }
        let newTeam = new Team(req.body);
        newTeam.save(err => {
            if (err) {
                if (err instanceof mongoose.Error.ValidationError) {
                    console.log("An error occured while validating.");
                    // Return details to be seen on client side
                    return res.status(422).json(err);
                } else {
                    console.log(err);
                    return res.status(500).json(err);
                }
            }
            res.status(200).json(newTeam);
        })
    },
    update: async (req, res) => {
        if (req.params?.teamId === undefined) return res.status(400).json("Did not include team id.")
        Team
            .findByIdAndUpdate(req.params.teamId, req.body, { new: true })
            .then((updatedTeam) => {
                res.sentStatus(200);
            })
            .catch((err) => {
                if (err instanceof mongoose.Error.ValidationError) {
                    console.log("An error occured while validating.");
                    // Return details to be seen on client side
                    res.status(422).json(err);
                } else {
                    console.log(err)
                    res.status(500).json("Server error.");
                }
            })
    },
    findTasks: async (req, res) => {
        Team
            .find({ _id: req.params.teamId }, { tasks: 1 })
            .then((err, teamObj) => {
                if (err) return res.status(500).json(err)
                return res.status(200).json(teamObj);
            })
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
        if (req.params?.memberId === undefined) return res.send(400).json("Did not include member id to update.")
        Team
            .findByIdAndUpdate({ _id: req.params.teamId },
                { $push: { members: req.body.memberId }, $inc: { team_count: 1 } },
                { new: true })
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