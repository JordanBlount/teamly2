const { Organization } = require('../models');

let OrganizationController = {
    
    find: async (req, res) => {
        let org = await Organization.find({ _id: req.params._id });
        res.json(org);
        console.log("Organization found");
    },

    create: async (req, res) => {
        // let org = await Organization.create(req);
        // res.status(200);
        res.send('THIS IS WORKING');
    }

}

module.exports = OrganizationController