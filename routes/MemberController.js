const { Member, Team } = require('../models/');

let MemberController = {
    findAll: (req, res) => {
        if (Object.keys(req.body).length > 0) return res.status(400).json("The api call should be empty.");
        if (req.params?.orgId === undefined) return res.status(400).json("Does not contain a organization id.");
        Member
            .find({ _organizationId: req.params.orgId })
            .then(members => {
                res.send(members)
            })
            .catch(err => {
                res.send(err)
            })
    },
    findById: (req, res) => {
        if (req.params?.orgId === undefined) return res.status(400).json("Does not contain a organization id.");
        if (req.params?.memberId === undefined) return res.status(400).json("Does not contain member id.");
        Member
            .findOne({ _id: req.params.memberId, _organizationId: req.params.orgId })
            .then(member => {
                res.send(member)
            })
            .catch(err => {
                res.send(err)
            })
    },
    create: async (req, res) => {
        if (req.params?.orgId === undefined) return res.status(400).json("Does not contain a organization id.");
        if (req.params?.memberId === undefined) return res.status(400).json("Does not contain member id.");
        let newMember = new Member(req.body);
        newMember.save(err => {
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
            res.status(200).json(newMember);
        })
        if (newMember?.teams !== undefined && newMember.teams.length > 0) {
            // TODO: This code needs to be tested. Members should be added to all the Teams that they are included in
            //       when created
            // Team.updateMany({ _id: teams },
            //     { $push: { members: newMember._id }, $inc: { memberCount: 1 }})
        }
    },
    update: async (req, res) => {
        if (req.params?.orgId === undefined) return res.status(400).json("Does not contain a organization id.");
        if (req.params?.memberId === undefined) return res.status(400).json("Does not contain member id.");
        Member
            .findByIdAndUpdate(req.params.memberId, req.body, { new: true })
            .then(updatedMember => {
                res.sendStatus(200)
            })
            .catch(err => {
                res.send(err)
            })
    },
    delete: async (req, res) => {
        // This should archive the members information. We do not want to outright delete them. Similar to organizations or even
        // teams.
    }

}

module.exports = MemberController;