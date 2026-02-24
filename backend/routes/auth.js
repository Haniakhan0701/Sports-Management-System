require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const Mailchimp = require("@mailchimp/mailchimp_marketing");

// Security: Load User model
const path = require('path');
const User = require(path.join(__dirname, '../models/User'));

const router = express.Router();

// Security: Apply helmet for security headers
router.use(helmet());

// Security: Rate limiting for auth endpoints
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: "Too many authentication attempts, please try again later.",
    skipSuccessfulRequests: true,
});

// Apply rate limiting to auth endpoints
router.use("/login", authLimiter);
router.use("/createaccount", authLimiter);

// Mailchimp configuration
Mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_API_KEY.split("-")[1],
});

// Security: Input validation middleware
const validateAuthInput = (req, res, next) => {
    const { email, password, full_name } = req.body;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    // Password strength validation
    if (password && password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    // Name validation
    if (full_name && full_name.trim().length < 2) {
        return res.status(400).json({ message: "Full name must be at least 2 characters long" });
    }

    next();
};

// POST /api/auth/createaccount
router.post("/createaccount", validateAuthInput, async (req, res) => {
    try {
        const { full_name, email, password } = req.body;

        // Security: Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already in use" });
        }

        // Security: Strong password hashing
        const saltRounds = 12; // Recommended for security
        const password_hash = await bcrypt.hash(password, saltRounds);

        // Security: Save user with hashed password
        const user = new User({
            full_name: full_name.trim(),
            email: email.toLowerCase().trim(),
            password_hash
        });
        await user.save();

        // Optional: Add to Mailchimp (marketing only, not for auth)
        try {
            await Mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
                email_address: email,
                status: "subscribed",
                merge_fields: { FNAME: full_name },
            });
            console.log("✅ User added to Mailchimp:", email);
        } catch (mcErr) {
            console.error("⚠️ Mailchimp error:", mcErr);
        }

        // Security: Generate JWT with appropriate expiration
        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.JWT_SECRET, {
            expiresIn: "24h", // Shorter expiration for better security
            issuer: "your-app-name",
            audience: "your-app-users"
        });

        // Security: Don't send password hash back to client
        res.status(201).json({
            message: "Account created successfully",
            token,
            user: {
                id: user._id,
                full_name: user.full_name,
                email: user.email
            },
        });
    } catch (err) {
        console.error("❌ Server error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// POST /api/auth/login
router.post("/login", validateAuthInput, async (req, res) => {
    try {
        const { email, password } = req.body;

        // Security: Prevent timing attacks by using constant time comparison
        // Find user without revealing whether email exists
        const user = await User.findOne({ email: email.toLowerCase().trim() });

        // Security: Use dummy comparison to prevent timing attacks
        const dummyHash = "$2a$12$DummyHashForTimingAttackPrevention";
        const providedHash = user ? user.password_hash : dummyHash;
        const validPassword = await bcrypt.compare(password, providedHash);

        if (!user || !validPassword) {
            // Security: Generic error message to prevent user enumeration
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Security: Generate JWT with appropriate claims
        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.JWT_SECRET, {
            expiresIn: "24h",
            issuer: "your-app-name",
            audience: "your-app-users"
        });

        // Security: Set secure HTTP-only cookie alternative (optional)
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                full_name: user.full_name,
                email: user.email
            },
        });
    } catch (err) {
        console.error("❌ Login error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// POST /api/auth/logout
router.post("/logout", (req, res) => {
    // Security: Clear HTTP-only cookie if using cookies
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
});

// Security: Token refresh endpoint
router.post("/refresh-token", async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(401).json({ message: "Token required" });
        }

        // Verify the existing token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if user still exists
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Issue new token
        const newToken = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.JWT_SECRET, {
            expiresIn: "24h",
            issuer: "your-app-name",
            audience: "your-app-users"
        });

        res.json({ token: newToken });
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
});

// ✅ Check if user is authenticated
router.get("/check-auth", async (req, res) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "") ||
            req.cookies?.token;

        if (!token) {
            return res.status(200).json({
                authenticated: false,
                message: "No token provided"
            });
        }

        // Security: Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Security: Find user by ID from token
        const user = await User.findById(decoded.id).select("-password_hash");

        if (!user) {
            return res.status(200).json({
                authenticated: false,
                message: "User not found"
            });
        }

        res.json({
            authenticated: true,
            user: {
                id: user._id,
                full_name: user.full_name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Auth check error:", error);
        res.status(200).json({
            authenticated: false,
            message: "Invalid or expired token"
        });
    }
});

module.exports = router;