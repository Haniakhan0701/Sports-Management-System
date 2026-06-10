require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

const app = express();

// Cron jobs start
require("./utils/cronJobs");

// Match routes
const matchRoutes = require("./routes/matchroutes");

// CORS setup - FIXED (removed trailing slash)
app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://willowy-pie-9068f0.netlify.app"  // Removed trailing slash
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
}));

app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Backend is running successfully!',
        timestamp: new Date().toISOString(),
        database: 'Connected'
    });
});

// ✅ ADD THIS - Root route handler
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend API is running",
        endpoints: {
            health: "/api/health",
            contact: "/api/contact",
            auth: "/api/auth",
            athletes: "/api/athletes",
            matches: "/api/matches",
            announcements: "/api/announcements"
        }
    });
});

// Routes
app.use("/api/contact", require("./routes/contact"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/athletes", require("./routes/athletes"));
app.use("/api/matches", matchRoutes);
app.use("/api/announcements", require("./routes/announcementRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
