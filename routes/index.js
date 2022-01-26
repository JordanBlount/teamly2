const express = require('express');
const router = express.Router();
const OrganizationController = require('./OrganizationController');
const TaskController = require('./TaskController');
const TeamController = require('./TeamController');
const ThreadController = require('./ThreadController');
const ActivityController = require('./ActivityController');
const MemberController = require('./MemberController');

router.get('/', (req, res) => {
    res.send("Hello world.");
});

// Routes for organization
router.get('/org', OrganizationController.findAll)
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

router.get("/teams/:teamId/members", TeamController.findMembers)
router.post('/teams/:teamId/members', TeamController.addMember)
router.put('/teams/:teamId/members/:memberId', TeamController.updateMember)
router.delete('/teams/:teamId/:memberId', TeamController.removeMember)

// Routes for task
router.get('/org/:orgId/tasks', TaskController.findAll)
router.get('/org/:orgId/tasks/:taskId', TaskController.findById)
router.post('/org/:orgId/tasks', TaskController.create)
router.put('/org/:orgId/tasks', TaskController.update)
router.delete('/org/:orgId/tasks', TaskController.delete)

// Routes for activities
router.get('/org/:orgId/activities', ActivityController.find)
router.get('/org/:orgId/activities/:activityId', ActivityController.findById)
router.post('/org/:orgId/activities', ActivityController.create)
router.put('/org/:orgId/activities/:activityId', ActivityController.update)
router.delete('/org/:orgId/activities/:activityId', ActivityController.delete)

// Routes for members
router.get('/org/:orgId/members', MemberController.findAll)
router.get('/org/:orgId/members/:memberId', MemberController.findById)
router.post('/org/:orgId/members', MemberController.create)
router.put('/org/:orgId/members/:memberId', MemberController.update)
router.delete('/org/:orgId/members/:memberId', MemberController.delete)


module.exports = router;