// sports-backend/models/Game.js
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    sport:       { type: String, required: true },
    teamA:       { type: String, required: true },
    teamB:       { type: String, required: true },
    category:    { type: String, enum: ["Men's", "Women's"], required: true },
    venue:       { type: String, default: '' },
    date:        { type: Date, required: true },
    status:      { type: String, enum: ['upcoming', 'live', 'completed'], default: 'upcoming' },
    scoreA:      { type: Number, default: null },
    scoreB:      { type: Number, default: null },
    result:      { type: String, default: '' },  // e.g. "CE won by 45 runs"
    notes:       { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Game', gameSchema);
