const Registration = require('../models/Registration');
const {
    sendConfirmationEmail,
    sendAdminNotification,
} = require('../config/emailService');

// ── POST /api/registrations  →  Submit new registration ──────────────────────
const submitRegistration = async (req, res) => {
    try {
        const {
            fullName, rollNumber, phone, email,
            department, semester, session,
            sport, category,
        } = req.body;

        // Check duplicate: same roll number + sport + category
        const existing = await Registration.findOne({
            rollNumber: rollNumber.toUpperCase(),
            sport,
            category,
        });

        if (existing) {
            return res.status(400).json({
                success: false,
                message: `You have already registered for ${sport} (${category}). Duplicate registrations are not allowed.`,
            });
        }

        // Create registration
        const registration = await Registration.create({
            fullName,
            rollNumber: rollNumber.toUpperCase(),
            phone,
            email,
            department,
            semester,
            session,
            sport,
            category,
            status: 'Pending',
        });

        // Send emails (don't block response if email fails)
        try {
            await sendConfirmationEmail(registration);
            await sendAdminNotification(registration);
            registration.confirmationEmailSent = true;
            await registration.save();
        } catch (emailError) {
            console.error('⚠️  Email sending failed:', emailError.message);
            // Registration still saved — just email failed
        }

        return res.status(201).json({
            success: true,
            message: 'Registration submitted successfully! Check your email for confirmation.',
            data: {
                id: registration._id,
                fullName: registration.fullName,
                rollNumber: registration.rollNumber,
                sport: registration.sport,
                category: registration.category,
                status: registration.status,
            },
        });

    } catch (error) {
        // Mongoose duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'You have already registered for this sport and category.',
            });
        }

        console.error('Registration error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.',
        });
    }
};

// ── GET /api/registrations/check?rollNumber=XX&sport=XX&category=XX ──────────
const checkRegistration = async (req, res) => {
    try {
        const { rollNumber, sport, category } = req.query;

        if (!rollNumber) {
            return res.status(400).json({ success: false, message: 'Roll number is required' });
        }

        const query = { rollNumber: rollNumber.toUpperCase() };
        if (sport) query.sport = sport;
        if (category) query.category = category;

        const registrations = await Registration.find(query).select(
            'sport category status createdAt'
        );

        return res.json({
            success: true,
            count: registrations.length,
            data: registrations,
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = { submitRegistration, checkRegistration };
