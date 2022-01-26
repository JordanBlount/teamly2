const { Organization } = require('../models');
const mongoose = require('mongoose')

let OrganizationController = {
    
    find: async (req, res) => {
        try {
            let org = await Organization.findOne({ _id: req.params.orgId });
            if(org) {
                res.status(200).json(org)
            } else {
                res.status(401).json("Organization does not exist.")
            }
        } catch(err) {
            console.log(err)
            res.status(500).json("Server error.")
        }
    },

    findAll: async (req, res) => {
        try {
            let orgs = await Organization.find();
            if(orgs) {
                res.status(200).json(orgs)
            } else {
                res.status(401).json("There are not organizations")
            }
        } catch(err) {
            console.log(err)
            res.status(500).json("Server error.")
        }
    },

    create: async (req, res) => {
        // TODO: Make the error handling better here
        const { title } = req.body;
        if(title === undefined || title === '') {
            res.status(401).json("Does not contain a title.")
        } else {
            let newOrg = new Organization(req.body);
            newOrg.save(err => {
                if(err) {
                    if(err instanceof mongoose.Error.ValidationError) {
                        console.log("An error occured while validating.");
                        // Return details to be seen on client side
                        return res.status(422).json(err); 
                    } else {
                        console.log(err);
                        return res.status(500).json(err);
                    }
                }
                res.status(200).json(newOrg);
            })
        }
    },

    update: (req, res) => {
        Organization
            .findByIdAndUpdate(req.params.orgId, req.body, { new: true }) // new: true will send updated doc
            .then((updatedOrg) => {
                // I could potentially use this as a way to archive changes in case they need to be undone.
                // TODO: Check to see if there is a way to get the old and new document in here
                res.send(updatedOrg);
            })
            .catch((err) => {
                if(err instanceof mongoose.Error.ValidationError) {
                    console.log("An error occured while validating.");
                    // Return details to be seen on client side
                    res.status(422).json(err);
                } else {
                    console.log(err)
                    res.status(500).json("Server error.");
                }
            })   
    }

}

module.exports = OrganizationController