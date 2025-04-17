const ScoreModel = require('../Models/scoreModel');

exports.getAllScores = async (req, res) => {
  try {
    const scores = await ScoreModel.getAllScores();
    res.status(200).json(scores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get scores by game name
exports.getScoresByGameName = async (req, res) => {
  try {
    const scores = await ScoreModel.getScoresByGameName(req.params.gameName);
    if (scores.length === 0) {
      return res.status(404).json({ message: 'No scores found for this game' });
    }
    res.status(200).json(scores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a score using game name and team name
exports.addScore = async (req, res) => {
  try {
    const newScore = await ScoreModel.addScoreByGameAndTeam(req.body);
    res.status(201).json({
      message: 'Score added successfully',
      data: newScore
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteScore = async (req, res) => {
  try {
    await ScoreModel.deleteScore(req.params.id);
    res.status(200).json({ message: 'Score deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getTotalPointsByTeam = async (req, res) => {
  try {
    const teamName = req.params.name;
    const totalPoints = await ScoreModel.getTotalPointsByTeamName(teamName);
    res.status(200).json({ teamName, totalPoints });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
