const TeamModel = require('../Models/teamModel');

exports.getAllTeams = async (req, res) => {
  try {
    const teams = await TeamModel.getAllTeams();
    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTeamById = async (req, res) => {
  try {
    const team = await TeamModel.getTeamById(req.params.id);
    res.status(200).json(team);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.addTeam = async (req, res) => {
  try {
    const { name, members } = req.body;
    const team = await TeamModel.addTeam(name, members);
    res.status(201).json(team);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTeam = async (req, res) => {
  try {
    const team = await TeamModel.deleteTeam(req.params.id);
    res.status(200).json({ message: 'Team deleted', team });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getTeamByName = async (req, res) => {
    try {
      const team = await TeamModel.getTeamByName(req.params.name);
      if (!team) {
        return res.status(404).json({ message: 'Team not found' });
      }
      res.status(200).json(team);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };