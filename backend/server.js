require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

const app = express();

// ✅ CORS setup (allow Vercel + Namecheap + local testing)
app.use(cors({
    origin: [
        "http://localhost:5173",                     // Vite local dev
        "http://127.0.0.1:5173",                     // optional
        "https://my-portfolio-roan-ten-19.vercel.app", // Vercel frontend (example)
        "https://www.haniakhan-ai.com"               // your live Namecheap domain
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
}));

app.use(express.json());

// ✅ Health check endpoint - ADD THIS
app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Backend is running successfully!',
        timestamp: new Date().toISOString(),
        database: 'Connected' // You can add DB status check if needed
    });
});

// ✅ Routes
app.use("/api/contact", require("./routes/contact"));
app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));