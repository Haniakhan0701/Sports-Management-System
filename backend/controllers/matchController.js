// controllers/matchController.js

const Match = require("../models/Match");
const { getGround } = require("../utils/getGround");

// ── 1. CREATE MATCH
const createMatch = async (req, res) => {
  try {
    const { sport, category, teamA, teamB, scheduledAt, notes } = req.body;

    if (teamA === teamB)
      return res.status(400).json({ success: false, message: "Teams cannot be the same." });

    const ground = getGround(sport, category);

    const match = await Match.create({
      sport, category, teamA, teamB,
      scheduledAt, notes, ground,
    });

    res.status(201).json({ success: true, match });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── 2. GET ALL MATCHES
const getAllMatches = async (req, res) => {
  try {
    const { status, category, sport } = req.query;
    const filter = {};
    if (status)   filter.status   = status;
    if (category) filter.category = category;
    if (sport)    filter.sport    = sport;

    const matches = await Match.find(filter).sort({ scheduledAt: 1 });
    res.json({ success: true, matches });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── 3. GET SINGLE MATCH
const getMatch = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match)
      return res.status(404).json({ success: false, message: "Match not found." });
    res.json({ success: true, match });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── 4. UPDATE SCORE
const updateScore = async (req, res) => {
  try {
    const { scoreA, scoreB } = req.body;
    const match = await Match.findById(req.params.id);

    if (!match)
      return res.status(404).json({ success: false, message: "Match not found." });
    if (match.status !== "live")
      return res.status(400).json({ success: false, message: "Can only update score of a live match." });

    match.scoreA = scoreA ?? match.scoreA;
    match.scoreB = scoreB ?? match.scoreB;
    await match.save();

    res.json({ success: true, match });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── 5. END MATCH
const endMatch = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);

    if (!match)
      return res.status(404).json({ success: false, message: "Match not found." });
    if (match.status !== "live")
      return res.status(400).json({ success: false, message: "Match is not live." });

    if (match.scoreA > match.scoreB)       match.winner = match.teamA;
    else if (match.scoreB > match.scoreA)  match.winner = match.teamB;
    else                                   match.winner = "Draw";

    match.status = "completed";
    await match.save();

    res.json({ success: true, match });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── 6. CANCEL MATCH
const cancelMatch = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match)
      return res.status(404).json({ success: false, message: "Match not found." });

    match.status = "cancelled";
    await match.save();

    res.json({ success: true, message: "Match cancelled.", match });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── 7. DELETE MATCH
const deleteMatch = async (req, res) => {
  try {
    await Match.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Match deleted." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createMatch, getAllMatches, getMatch,
  updateScore, endMatch, cancelMatch, deleteMatch,
};