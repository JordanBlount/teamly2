const { Organization } = require('../models');

let OrganizationController = {
    
    find: async (req, res) => {
        try {
            let org = await Organization.findOne({ _id: req.params.orgId });
            if(org) {
                res.json(org)
            } else {
                res.status(401).json("Organization does not exist.")
            }
        } catch(err) {
            console.log(err)
            res.status(500).json("Server error.")
        }
    },

    // FIXME: Catch error for when title is not present
    create: async (req, res) => {
        const { title } = req.body;
        if(title === '' || title === null) {
            res.status(401).json("Does not contain a title.")
        } else {
            let newOrg = new Organization(req.body);
            newOrg.save();
        }
    },

    update: async (req, res) => {
        try {
            let org = await Organization.find({ _id: req.params.orgId })
            if(!org) {
                res.status(400).json("This organization does not exist.")
            } 
        } catch(err) {
            console.log(err)
            res.status(500).json("Server error.")
        }
    }

}

module.exports = OrganizationController