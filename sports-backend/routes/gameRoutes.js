// sports-backend/routes/gameRoutes.js
const express = require('express');
const router  = express.Router();
const { getAllGames, createGame, updateGame, deleteGame } = require('../controllers/gameController');

// GET    /api/games        → All games
router.get('/',        getAllGames);

// POST   /api/games        → Create game
router.post('/',       createGame);

// PATCH  /api/games/:id    → Edit / change status / update score
router.patch('/:id',  updateGame);

// DELETE /api/games/:id    → Delete game
router.delete('/:id', deleteGame);

module.exports = router;
