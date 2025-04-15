const express = require('express');
const router = express.Router();
const teamController = require('../Controllers/teamController');

router.get('/', teamController.getAllTeams);
router.get('/:id', teamController.getTeamById);
router.post('/', teamController.addTeam);
router.delete('/:id', teamController.deleteTeam);

router.get('/name/:name', teamController.getTeamByName);

router.post('/login', teamController.loginTeam);

module.exports = router;