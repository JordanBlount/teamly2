const { Task } = require('../models');

let TaskController = {

    find: async (req, res) => {
        if (req.params?.taskId === undefined) return res.sendStatus(400).json("Does not contain task id.")
        Task
            .findOne({ _id: req.params.taskId })
            .then(task => {
                res.sendStatus(200).json(task);
            })
            .catch(err => {
                res.send(err)
            })
    },
    findAll: async (req, res) => {
        Task
            .find()
            .then(tasks => {
                res.sendStatus(200).json(tasks);
            })
            .catch(err => {
                res.send(err)
            })
    },
    findAllByTeamId: async (req, res) => {
        if (req.params?.teamId === undefined) return res.sendStatus(400).json("Does not contain task id.")
        Task
            .find({ teams: req.params.teamId })
            .then(tasks => {
                res.sendStatus(200).json(tasks);
            })
            .catch(err => {
                res.send(err)
            })
    },
    create: async (req, res) => {
        if (req.body?._organizationId === undefined) return res.sendStatus(400).json("Does not contain an organization id.")
        if (req.body?.teams === undefined) return res.sendStatus(400).json("The task is not being assigned to any teams.")
        if (req.body.teams.length < 0) return res.sendStatus(400).json("This task needs to be assigned to a team.") // Eventually to the whole organization

        let task = new Task(req.body);

        task.save(err => {
            res.send(err);
        })
    },
    update: async (req, res) => {
        if (req.params?.taskId === undefined) return res.sendStatus(400).json("Does not contain a task id.")
        Task
            .findOneAndUpdate({ _id: req.params.taskId }, req.body, { new: true })
            .then(updatedTask => {
                res.sendStatus(200)
            })
            .catch(err => {

            })

    },
    delete: async (req, res) => {
        if (req.params?.taskId === undefined) return res.sendStatus(400).json("Does not contain a task id.")
        Task
            .findOneAndDelete({ _id: req.params.taskId })
            .then(deletedTask => {
                res.sendStatus(200).json(deletedTask);
                // Removes it from all Teams
                Team
                    .updateMany({ tasks: req.params.taskId }, { $pull: { tasks: req.params.taskId }, $inc: { taskCount: -1 } })
                    .catch(err => {
                        res.send(err);
                    })
            })
    }

}

module.exports = TaskController