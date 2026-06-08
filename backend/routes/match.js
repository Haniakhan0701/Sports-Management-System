// models/Match.js

const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  sport: {
    type: String, required: true,
    enum: ["Cricket","Football","Badminton","Tug of War",
           "Dodge Ball","100m Race","4×100m Relay","Bottle Spin Chase"],
  },
  category: {
    type: String, required: true,
    enum: ["Men's", "Women's"],
  },
  teamA:  { type: String, required: true, enum: ["CE","ME","EE","CVE","AR"] },
  teamB:  { type: String, required: true, enum: ["CE","ME","EE","CVE","AR"] },
  scoreA: { type: Number, default: 0 },
  scoreB: { type: Number, default: 0 },
  winner: { type: String, enum: ["CE","ME","EE","CVE","AR","Draw",null], default: null },
  ground: { type: String, required: true },
  scheduledAt: { type: Date, required: true },
  status: {
    type: String,
    enum: ["upcoming","live","completed","cancelled"],
    default: "upcoming",
  },
  notes: { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("Match", matchSchema);