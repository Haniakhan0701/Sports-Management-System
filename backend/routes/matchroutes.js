// routes/matchRoutes.js

const express = require("express");
const router = express.Router();
const {
  createMatch, getAllMatches, getMatch,
  updateScore, endMatch, cancelMatch, deleteMatch,
} = require("../controllers/matchController");

const { verifyAdmin } = require("../middleware/authMiddleware");

// PUBLIC
router.get("/",        getAllMatches);
router.get("/:id",     getMatch);

// ADMIN ONLY
router.post("/",             verifyAdmin, createMatch);
router.put("/:id/score",     verifyAdmin, updateScore);
router.put("/:id/end",       verifyAdmin, endMatch);
router.put("/:id/cancel",    verifyAdmin, cancelMatch);
router.delete("/:id",        verifyAdmin, deleteMatch);

module.exports = router;