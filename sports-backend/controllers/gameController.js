// sports-backend/controllers/gameController.js
const Game = require('../models/Game');

// GET all games
const getAllGames = async (req, res) => {
    try {
        const games = await Game.find().sort({ date: 1 });
        res.json({ success: true, data: games });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// POST create a new game
const createGame = async (req, res) => {
    try {
        const { sport, teamA, teamB, category, venue, date, notes } = req.body;
        if (!sport || !teamA || !teamB || !category || !date) {
            return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
        }
        const game = await Game.create({ sport, teamA, teamB, category, venue, date, notes });
        res.status(201).json({ success: true, data: game });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// PATCH update a game (edit, status change, scores)
const updateGame = async (req, res) => {
    try {
        const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!game) return res.status(404).json({ success: false, message: 'Game not found.' });
        res.json({ success: true, data: game });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// DELETE a game
const deleteGame = async (req, res) => {
    try {
        const game = await Game.findByIdAndDelete(req.params.id);
        if (!game) return res.status(404).json({ success: false, message: 'Game not found.' });
        res.json({ success: true, message: 'Game deleted.' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = { getAllGames, createGame, updateGame, deleteGame };
