const express = require('express');
const router  = express.Router();
const {
    submitRegistration,
    checkRegistration,
    getAllRegistrations,
    updateRegistrationStatus,
} = require('../controllers/registrationController');

// POST   /api/registrations        → Submit registration
router.post('/', submitRegistration);

// GET    /api/registrations/check  → Check if already registered
router.get('/check', checkRegistration);

// GET    /api/registrations        → Get all registrations (admin)
router.get('/', getAllRegistrations);

// PATCH  /api/registrations/:id    → Approve / Reject (admin)
router.patch('/:id', updateRegistrationStatus);

module.exports = router;
