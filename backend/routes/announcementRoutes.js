// routes/announcementRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllAnnouncements, getAnnouncement,
  createAnnouncement, updateAnnouncement, deleteAnnouncement,
} = require("../controllers/announcementController");
const { verifyAdmin } = require("../middleware/authMiddleware");

// PUBLIC
router.get("/",     getAllAnnouncements);
router.get("/:id",  getAnnouncement);

// ADMIN ONLY
router.post("/",        verifyAdmin, createAnnouncement);
router.put("/:id",      verifyAdmin, updateAnnouncement);
router.delete("/:id",   verifyAdmin, deleteAnnouncement);

module.exports = router;