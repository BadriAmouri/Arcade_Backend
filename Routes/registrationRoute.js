// Routes/registrationRoute.js
const express = require('express');
const router = express.Router();
const {
  registerMember,
  getRegistrations,
  checkTeamSize,
  AcceptTeam
} = require('../Controllers/registrationController');  // Make sure this import is correct

// 1. Register a new user
router.post('/register', registerMember);

// 2. Get all registered members (organized by team)
router.get('/members', getRegistrations);

// 3. Check if a team has 8 or more members
router.get('/check-team/:team_name', checkTeamSize);

// 4. Accept a team and move them to the teams table
router.post('/accept-team', AcceptTeam); // Correctly using acceptTeam here

module.exports = router;
