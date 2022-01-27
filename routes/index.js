const express = require('express');
const router = express.Router();
const OrganizationController = require('./OrganizationController');
const TaskController = require('./TaskController');
const TeamController = require('./TeamController');
const ThreadController = require('./ThreadController');
const ActivityController = require('./ActivityController');
const MemberController = require('./MemberController');

router.get('/', (req, res) => {
    res.send("Hey y'all.");
});

// Routes for organization
router.get('/org', OrganizationController.findAll)
router.get('/org/:orgId', OrganizationController.find)
router.post('/org', OrganizationController.create);
router.put('/org/:orgId', OrganizationController.update);


// Routes for teams
router.get('/teams', TeamController.findAll)
router.post('/teams', TeamController.create);
router.put('/teams/:teamId', TeamController.update)

router.get('/teams/:teamId', TeamController.find)
router.get('/teams/:teamId/tasks', TeamController.findTasks)
router.get('/teams/:teamId/members', TeamController.findMembers)

router.get('/teams/:teamId/threads', ThreadController.findAll)
router.get('/teams/:teamId/threads/:threadId', ThreadController.findById)
router.post('/teams/:teamId/threads', ThreadController.create)
router.put('/teams/:teamId/threads/:threadId', ThreadController.update)
router.delete('/teams/:teamId/threads/:threadId', ThreadController.delete)

// Routes for interacting with members on a Team
router.get("/teams/:teamId/members", TeamController.findMembers)
router.post('/teams/:teamId/members', TeamController.addMember)
router.put('/teams/:teamId/members/:memberId', TeamController.updateMember)
router.delete('/teams/:teamId/:memberId', TeamController.removeMember)

// Routes for task
router.get('/org/:orgId/tasks', TaskController.findAll)
router.get('/org/:orgId/tasks/:taskId', TaskController.find)
router.get('/org/:orgId/tasks/:teamId', TaskController.findAllByTeamId) // Make sure these two don't conflict
router.post('/org/:orgId/tasks', TaskController.create)
router.put('/org/:orgId/tasks/:taskId', TaskController.update)
router.delete('/org/:orgId/tasks/:taskId', TaskController.delete)

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