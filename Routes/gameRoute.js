const express = require('express');
const router = express.Router();
const gameController = require('../Controllers/gameController');

router.get('/', gameController.getAllGames);
router.get('/:id', gameController.getGameById);
router.post('/', gameController.createGame);
router.delete('/:id', gameController.deleteGame);
// Get a game by name
router.get('/name/:name', gameController.getGameByName);

module.exports = router;