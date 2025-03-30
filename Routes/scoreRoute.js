const express = require('express');
const router = express.Router();
const ScoreController = require('../Controllers/scoreController');

router.get('/', ScoreController.getAllScores);
router.get('/:gameName', ScoreController.getScoresByGameName); // Fetch by game name
router.post('/', ScoreController.addScore);
router.delete('/:id', ScoreController.deleteScore);

module.exports = router;