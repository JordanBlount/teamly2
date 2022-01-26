const express = require('express');
const router = express.Router();
const OrganizationController = require('./OrganizationController');
const TaskController = require('./TaskController');
const TeamController = require('./TeamController');
const ThreadController = require('./ThreadController');
const ActivityController = require('./ActivityController');

router.get('/', (req, res) => {
    res.send("Hello world.");
});

// Routes for organization
router.get('/org/:orgId', OrganizationController.find)
router.post('/org', OrganizationController.create);
router.put('/org/:orgId', OrganizationController.update);



// Routes for teams
router.get('/team', TeamController.find)
router.post('/team', TeamController.create);
router.put('/team', TeamController.update)

router.get('/team/:teamId', TeamController.findById)
router.get('/team/:teamId/tasks', TeamController.findTasks)
router.get('/team/:teamId/members', TeamController.findMembers)

router.get('/team/:teamId/threads', ThreadController.findAll)
router.put('/team/:teamId/threads', ThreadController.create)
router.post('/team/:teamId/threads/:threadId', ThreadController.update)
router.delete('/team/:teamId/threads/:threadId', ThreadController.delete)

router.get("/teams/:teamId/members")
router.post('/teams/:teamId/members')
router.put('/teams/:teamId/members/:memberId')
router.delete('/teams/:teamId/:memberId')

// Routes for task
router.get('/org/:orgId/tasks', TaskController.findById)
router.get('/org/:orgId/tasks/all', TaskController.findAll)
router.post('/org/:orgId/tasks', TaskController.create)
router.put('/org/:orgId/tasks', TaskController.update)
router.delete('/org/:orgId/tasks', TaskController.delete)

router.get('/org/:orgId/activities', ActivityController.findById)
router.get('/org/:orgId/activities/all', ActivityController.find)
router.post('/org/:orgId/activities', ActivityController.create)
router.put('/org/:orgId/activities', ActivityController.update)
router.delete('/org/:orgId/activities', ActivityController.delete)


module.exports = router;