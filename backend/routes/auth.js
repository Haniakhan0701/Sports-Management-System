require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const path = require('path');
const User = require(path.join(__dirname, '../models/User'));
const router = express.Router();

router.use(helmet());

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: "Too many attempts, please try again later.",
    skipSuccessfulRequests: true,
});
router.use("/login", authLimiter);

// POST /api/auth/createaccount — Athlete Registration (no password)
router.post("/createaccount", async (req, res) => {
    try {
        const { name, email, phone, rollNumber, department, semester, session, sports, category } = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
        if (existingUser) {
            return res.status(409).json({ message: "Email already in use" });
        }

        const user = new User({
            full_name: name ? name.trim() : "Unknown",
            email: email.toLowerCase().trim(),
            password_hash: "no-password",
            rollNumber,
            phone,
            department,
            semester,
            session,
            sports: sports || [],
            category,
            role: "user"
        });
        await user.save();

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(201).json({
            success: true,
            message: "Account created successfully",
            token,
            user: {
                id: user._id,
                full_name: user.full_name,
                email: user.email,
                department: user.department,
                sports: user.sports,
                role: user.role
            },
        });
    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ message: "Server error during registration" });
    }
});

// POST /api/auth/login — Admin Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        // ✅ Admin login check (from .env)
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (email.toLowerCase().trim() === adminEmail && password === adminPassword) {
            const token = jwt.sign(
                { id: "admin", email: adminEmail, role: "admin" },
                process.env.JWT_SECRET,
                { expiresIn: "24h" }
            );

            return res.status(200).json({
                success: true,
                message: "Admin login successful",
                token,
                user: {
                    id: "admin",
                    full_name: "Administrator",
                    email: adminEmail,
                    role: "admin"
                }
            });
        }

        // ✅ Regular user login (by email only — no password system)
        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user) {
            return res.status(404).json({ message: "No account found with this email" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                full_name: user.full_name,
                email: user.email,
                department: user.department,
                sports: user.sports,
                role: user.role
            }
        });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error during login" });
    }
});

module.exports = router;