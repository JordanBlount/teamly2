const { Thread, Team } = require('../models/');

let ThreadController = {
    findAll: async (req, res) => {
        if (req.params?.teamId === undefined) return res.status(400).json("This team does not exist.")
        Team
            .find(req.params.teamId, { threads: 1 })
            .then(threads => {
                if (err) return res.status(500).json(err)
                return res.status(200).json(threads);
            })
    },
    findById: async (req, res) => {
        if (req.params?.teamId === undefined) return res.status(400).json("This team does not exist.")
        if (req.params?.threadId === undefined) return res.status(400).json("This thread does not exist.")
        Team
            .findById(req.params.teamId, { threads: 1 })
            .then(threads => {
                // threads should be an array which we can then filter through before returning the thread.
                // TODO: Mongoose should definitely have a way of doing this
                let thread = threads.filter((td) => td._id === req.params.teadId)
                if (err) return res.status(500).json(err)
                return res.status(200).json(thread);
            })
    },
    create: async (req, res) => {
        if (req.params?.teamId === undefined) return res.status(400).json("This team does not exist.")
        if (req.params?.threadId === undefined) return res.status(400).json("Did not include thread id.")
        let thread = new Thread({...req.body, _teamId: teamId})
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
        if (req.params?.threadId === undefined) return res.status(400).json("Did not include thread id.")
        Thread
            .findByIdAndUpdate(req.params.threadId, req.body, { new: true })
            .then((updatedThread) => {
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
    delete: async (req, res) => {
        // TODO: Add archive feature
        if (req.params?.teamId === undefined) {
            return res.status(400).json("Did not include the team id.")
        }
        if (req.params?.threadId === undefined) {
            return res.status(400).json("Did not include the ihread id.")
        }
        // Deletes the thread
        Thread
            .findOneAndDelete({ _id: req.params.threadId })
            .then(deletedThread => {
                res.status(200).json(deletedThread);
                // Removes it from all Teams
                Team
                    .updateMany({ threads: req.params.threadId }, { $pull: { threads: req.params.threadId }, $inc: { threadCount: -1} })
                    .catch(err => {
                        res.send(err);
                    })
                
            })
            .catch(err => {
                res.send(err)
            })
    },
}

module.exports = ThreadController