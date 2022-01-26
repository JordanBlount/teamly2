const express = require('express');
const router = express.Router();
const OrganizationController = require('./OrganizationController');

router.get('/', (req, res) => {
    res.send("Hello world.");
});




// Routes for organization
router.get('/organization/', (req, res) => {
    res.sendStatus(200);
});

module.exports = router;