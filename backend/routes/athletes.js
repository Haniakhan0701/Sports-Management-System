const express = require("express");
const User = require("../models/User");
const router = express.Router();

// GET /api/athletes — sab registered athletes
router.get("/", async (req, res) => {
    try {
        const { department, sport, category } = req.query;
        
        let filter = { role: "user" };
        if (department) filter.department = department;
        if (category) filter.category = category;
        if (sport) filter.sports = { $in: [sport] };

        const athletes = await User.find(filter)
            .select("-password_hash")
            .sort({ createdAt: -1 });

        res.json({ success: true, count: athletes.length, athletes });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;