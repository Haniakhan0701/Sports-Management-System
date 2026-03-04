const express = require('express');
const router  = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    adminLogin,
    getDashboardStats,
    getAllRegistrations,
    updateRegistrationStatus,
    deleteRegistration,
    getRegistrationById,
} = require('../controllers/adminController');

// POST   /api/admin/login                          → Admin login (public)
router.post('/login', adminLogin);

// All routes below are PROTECTED — must send Bearer token
router.use(protect);

// GET    /api/admin/dashboard                      → Stats
router.get('/dashboard', getDashboardStats);

// GET    /api/admin/registrations                  → All registrations (with filters)
router.get('/registrations', getAllRegistrations);

// GET    /api/admin/registrations/:id              → Single registration
router.get('/registrations/:id', getRegistrationById);

// PATCH  /api/admin/registrations/:id/status       → Approve / Reject
router.patch('/registrations/:id/status', updateRegistrationStatus);

// DELETE /api/admin/registrations/:id              → Delete registration
router.delete('/registrations/:id', deleteRegistration);

module.exports = router;
