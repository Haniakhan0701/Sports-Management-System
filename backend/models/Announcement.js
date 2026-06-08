// models/Announcement.js
const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body:  { type: String, required: true },
  type: {
    type: String,
    enum: ["IMPORTANT", "INFO", "MATCH", "GENERAL"],
    default: "INFO"
  },
  category: {
    type: String,
    enum: ["Men's", "Women's", "General"],
    default: "General"
  },
  departments: [{
    type: String,
    enum: ["CE", "ME", "EE", "CVE", "AR", "All"]
  }],
  pinned: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Announcement", announcementSchema);