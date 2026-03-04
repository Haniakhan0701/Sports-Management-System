const express = require('express');
const router  = express.Router();
const { submitRegistration, checkRegistration } = require('../controllers/registrationController');

// POST   /api/registrations        → Submit registration
router.post('/', submitRegistration);

// GET    /api/registrations/check  → Check if already registered
router.get('/check', checkRegistration);

module.exports = router;
