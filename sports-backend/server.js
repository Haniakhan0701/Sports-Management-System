require('dotenv').config();
const express     = require('express');
const cors        = require('cors');
const rateLimit   = require('express-rate-limit');
const connectDB   = require('./config/db');

// ── Routes ────────────────────────────────────────────────────────────────────
const registrationRoutes = require('./routes/registrationRoutes');
const adminRoutes        = require('./routes/adminRoutes');
const gameRoutes         = require('./routes/gameRoutes');

// ── Connect to MongoDB ────────────────────────────────────────────────────────
connectDB();

const app = express();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
    origin: [
        process.env.CLIENT_URL || 'http://localhost:5173',
        'http://localhost:3000',
    ],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Rate Limiting (prevent spam registrations) ────────────────────────────────
const registrationLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,                   // max 10 submissions per IP per 15 min
    message: {
        success: false,
        message: 'Too many registration attempts. Please try again after 15 minutes.',
    },
});

// ── API Routes ────────────────────────────────────────────────────────────────
app.use('/api/registrations', registrationLimiter, registrationRoutes);
app.use('/api/admin',         adminRoutes);
app.use('/api/games',         gameRoutes);

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: '🏆 BZU Sports Week API is running!',
        version: '1.0.0',
        endpoints: {
            registration: 'POST /api/registrations',
            checkStatus:  'GET  /api/registrations/check',
            adminLogin:   'POST /api/admin/login',
            dashboard:    'GET  /api/admin/dashboard   (🔒 protected)',
            allRegs:      'GET  /api/admin/registrations (🔒 protected)',
            games:        'GET  /api/games              (get all games)',
        },
    });
});

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err.stack);
    res.status(500).json({ success: false, message: 'Internal server error' });
});

// ── Start server ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🏆 BZU Sports Week Backend Ready!\n`);
});