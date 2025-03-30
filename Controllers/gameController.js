const GameModel = require('../Models/gameModel');

exports.getAllGames = async (req, res) => {
  try {
    const games = await GameModel.getAllGames();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getGameById = async (req, res) => {
  try {
    const game = await GameModel.getGameById(req.params.id);
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createGame = async (req, res) => {
    try {
      const newGame = await GameModel.createGame(req.body);
      
      if (!newGame || newGame.length === 0) {
        return res.status(400).json({ error: "Game creation failed" });
      }
  
      res.status(201).json({ message: "Game created successfully!", game: newGame });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

exports.deleteGame = async (req, res) => {
  try {
    await GameModel.deleteGame(req.params.id);
    res.status(200).json({ message: 'Game deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getGameByName = async (req, res) => {
    try {
      const game = await GameModel.getGameByName(req.params.name);
      
      if (!game || game.length === 0) {
        return res.status(404).json({ error: "Game not found" });
      }
  
      res.status(200).json(game);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };