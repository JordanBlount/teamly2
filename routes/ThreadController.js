const { Thread, Team } = require('../models/');

let ThreadController = {
    findAll: async (req, res) => {
        if (req.params?.teamId === undefined) return res.status(400).json("This team does not exist.")
        Team
            .find(teamId, { threads: 1 })
            .then((err, threads) => {
                if (err) return res.status(500).json(err)
                return res.status(200).json(threads);
            })
    },
    findById: async (req, res) => {
        if (req.params?.teamId === undefined) return res.status(400).json("This team does not exist.")
        if (req.params?.threadId === undefined) return res.status(400).json("This thread does not exist.")
        Team
            .findById(teamId, { threads: 1 })
            .then((err, thread) => {
                if (err) return res.status(500).json(err)
                return res.status(200).json(thread);
            })
    },
    create: async (req, res) => {
        if (req.params?.teamId === undefined) return res.status(400).json("This team does not exist.")
        if (req.params?.threadId === undefined) return res.send(400).json("Did not include thread id.")
        let thread = new Thread(req.body)
        thread.save(err => {
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
            // TODO: Add ability to save thread to multiple teams
            Team
                .findByIdAndUpdate({ _id: req.params.teamId },
                    { $push: { threads: thread._id }, $inc: { threadCount: 1 } },
                    { new: true })
                .then((updatedTeam) => {
                    res.send(updatedTeam);
                })
                .catch(err => {
                    res.json(err);
                });
        })
    },
    update: async (req, res) => {
        if (req.params?.teamId === undefined) return res.status(400).json("This team does not exist.")
        if (req.params?.threadId === undefined) return res.send(400).json("Did not include thread id.")
        Thread
            .findByIdAndUpdate(req.params.threadId, req.body, { new: true })
            .then((updatedThread) => {
                res.send(updatedThread)
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
    delete: async (req, res) => {
        // Archive
        if (req.params?.threadId === undefined) {
            return res.status(400).json("Did not include the ihread id.")
        }
        let thread = await Thread.findOne({ _id: req.params.threadId })
        if (!thread) {
            return res.status(400).json("This thread does not exist or does not contain this member");
        }
        // thread.update({ _id: req.params.teamId },
        //     { $pull: { threads: req.params.threadId }, $inc: { threadCount: -1 } },
        //     { new: true })
        //     .then((updatedTeam) => {
        //         res.send(updatedTeam)
        //     })
        //     .catch(err => {
        //         res.json(err);
        // })
    },
}

module.exports = ThreadController