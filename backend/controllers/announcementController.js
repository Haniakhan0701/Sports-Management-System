// controllers/announcementController.js
const Announcement = require("../models/Announcement");

// GET ALL — Public
const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement
      .find()
      .sort({ pinned: -1, createdAt: -1 });
    res.json({ success: true, announcements });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET SINGLE — Public
const getAnnouncement = async (req, res) => {
  try {
    const ann = await Announcement.findById(req.params.id);
    if (!ann)
      return res.status(404).json({ success: false, message: "Not found." });
    res.json({ success: true, announcement: ann });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// CREATE — Admin only
const createAnnouncement = async (req, res) => {
  try {
    const { title, body, type, category, departments, pinned } = req.body;
    const ann = await Announcement.create({
      title, body, type, category,
      departments: departments || ["All"],
      pinned: pinned || false,
    });
    res.status(201).json({ success: true, announcement: ann });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE — Admin only
const updateAnnouncement = async (req, res) => {
  try {
    const ann = await Announcement.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );
    if (!ann)
      return res.status(404).json({ success: false, message: "Not found." });
    res.json({ success: true, announcement: ann });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE — Admin only
const deleteAnnouncement = async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getAllAnnouncements, getAnnouncement,
  createAnnouncement, updateAnnouncement, deleteAnnouncement,
};