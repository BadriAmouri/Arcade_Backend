// Controllers/registrationController.js
const supabase = require('../Config/db');

const {
    addRegistration,
    getAllRegistrations,
    countTeamMembers,
    acceptTeam
  } = require('../Models/registrationModel');
  
  const registerMember = async (req, res) => {
    try {
      const { level, motivation } = req.body;
  
      if (!level || !motivation) {
        return res.status(400).json({ error: 'Level and motivation are required' });
      }
  
      const result = await addRegistration(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getRegistrations = async (req, res) => {
    try {
      const result = await getAllRegistrations();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const checkTeamSize = async (req, res) => {
    try {
      const team_name = req.params.team_name;
      const count = await countTeamMembers(team_name);
      const exceeded = count >= 8;
  
      res.status(200).json({
        team_name,
        member_count: count,
        exceeded
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const AcceptTeam = async (req, res) => {
    const { team_name } = req.body;
  
    if (!team_name) {
      return res.status(400).json({ error: 'Team name is required' });
    }
  
    try {
      // Call the model function to accept the team
      const result = await acceptTeam(team_name);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message || 'An error occurred while accepting the team' });
    }
  };

  module.exports = {
    registerMember,
    getRegistrations,
    checkTeamSize,
    AcceptTeam
  };
  