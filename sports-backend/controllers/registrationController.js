const Registration = require('../models/Registration');

// ─── POST /api/registrations ─────────────────────────────────────────────────
const submitRegistration = async (req, res) => {
    try {
        const {
            fullName,
            rollNumber,
            email,
            phone,
            department,
            semester,
            session,
            sports,
            category,
        } = req.body;

        // Basic validation
        if (!fullName || !rollNumber || !email || !phone || !department || !semester || !session || !category) {
            return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
        }

        if (!sports || (Array.isArray(sports) && sports.length === 0)) {
            return res.status(400).json({ success: false, message: 'Please select at least one sport.' });
        }

        // Check for duplicate roll number
        const existing = await Registration.findOne({ rollNumber });
        if (existing) {
            return res.status(409).json({ success: false, message: 'This roll number is already registered.' });
        }

        const registration = await Registration.create({
            fullName,
            rollNumber,
            email,
            phone,
            department,
            semester,
            session,
            sports: Array.isArray(sports) ? sports : [sports],
            category,
            status: 'pending',
        });

        res.status(201).json({ success: true, data: registration });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// ─── GET /api/registrations/check ────────────────────────────────────────────
const checkRegistration = async (req, res) => {
    try {
        const { rollNumber, email } = req.query;

        if (!rollNumber && !email) {
            return res.status(400).json({ success: false, message: 'Provide rollNumber or email to check.' });
        }

        const query = rollNumber ? { rollNumber } : { email };
        const existing = await Registration.findOne(query);

        res.json({ success: true, registered: !!existing, data: existing || null });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// ─── GET /api/registrations ───────────────────────────────────────────────────
const getAllRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find().sort({ createdAt: -1 });
        res.json({ success: true, data: registrations });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// ─── PATCH /api/registrations/:id ────────────────────────────────────────────
const updateRegistrationStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!['approved', 'rejected', 'pending'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status value.' });
        }

        const reg = await Registration.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!reg) {
            return res.status(404).json({ success: false, message: 'Registration not found.' });
        }

        res.json({ success: true, data: reg });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = {
    submitRegistration,
    checkRegistration,
    getAllRegistrations,
    updateRegistrationStatus,
};
