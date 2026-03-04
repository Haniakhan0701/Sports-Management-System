const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Registration = require('../models/Registration');
const { sendStatusUpdateEmail } = require('../config/emailService');

// ── Generate JWT ──────────────────────────────────────────────────────────────
const generateToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// ── POST /api/admin/login ─────────────────────────────────────────────────────
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        const admin = await Admin.findOne({ email: email.toLowerCase() });
        if (!admin || !(await admin.matchPassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        return res.json({
            success: true,
            message: 'Login successful',
            token: generateToken(admin._id),
            admin: { id: admin._id, name: admin.name, email: admin.email },
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// ── GET /api/admin/dashboard  →  Stats overview ───────────────────────────────
const getDashboardStats = async (req, res) => {
    try {
        const total      = await Registration.countDocuments();
        const pending    = await Registration.countDocuments({ status: 'Pending' });
        const approved   = await Registration.countDocuments({ status: 'Approved' });
        const rejected   = await Registration.countDocuments({ status: 'Rejected' });

        // Per-department breakdown
        const byDepartment = await Registration.aggregate([
            { $group: { _id: '$department', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]);

        // Per-sport breakdown
        const bySport = await Registration.aggregate([
            { $group: { _id: '$sport', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]);

        // Per-category breakdown
        const byCategory = await Registration.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } },
        ]);

        // Recent 5 registrations
        const recent = await Registration.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('fullName rollNumber department sport category status createdAt');

        return res.json({
            success: true,
            stats: { total, pending, approved, rejected },
            byDepartment,
            bySport,
            byCategory,
            recent,
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// ── GET /api/admin/registrations  →  All registrations with filters ───────────
const getAllRegistrations = async (req, res) => {
    try {
        const {
            status, department, sport, category,
            search, page = 1, limit = 20,
        } = req.query;

        const filter = {};
        if (status)     filter.status     = status;
        if (department) filter.department = department;
        if (sport)      filter.sport      = sport;
        if (category)   filter.category   = category;

        // Search by name or roll number
        if (search) {
            filter.$or = [
                { fullName:   { $regex: search, $options: 'i' } },
                { rollNumber: { $regex: search, $options: 'i' } },
            ];
        }

        const skip  = (Number(page) - 1) * Number(limit);
        const total = await Registration.countDocuments(filter);

        const registrations = await Registration.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        return res.json({
            success: true,
            total,
            page: Number(page),
            pages: Math.ceil(total / Number(limit)),
            data: registrations,
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// ── PATCH /api/admin/registrations/:id/status  →  Approve or Reject ──────────
const updateRegistrationStatus = async (req, res) => {
    try {
        const { status, adminNote } = req.body;
        const { id } = req.params;

        if (!['Approved', 'Rejected', 'Pending'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status value' });
        }

        const registration = await Registration.findById(id);
        if (!registration) {
            return res.status(404).json({ success: false, message: 'Registration not found' });
        }

        registration.status    = status;
        registration.adminNote = adminNote || '';
        await registration.save();

        // Send status email to student
        try {
            await sendStatusUpdateEmail(registration);
            registration.statusEmailSent = true;
            await registration.save();
        } catch (emailError) {
            console.error('⚠️  Status email failed:', emailError.message);
        }

        return res.json({
            success: true,
            message: `Registration ${status} successfully. Student notified by email.`,
            data: registration,
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// ── DELETE /api/admin/registrations/:id ──────────────────────────────────────
const deleteRegistration = async (req, res) => {
    try {
        const registration = await Registration.findByIdAndDelete(req.params.id);
        if (!registration) {
            return res.status(404).json({ success: false, message: 'Registration not found' });
        }
        return res.json({ success: true, message: 'Registration deleted successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// ── GET /api/admin/registrations/:id ─────────────────────────────────────────
const getRegistrationById = async (req, res) => {
    try {
        const registration = await Registration.findById(req.params.id);
        if (!registration) {
            return res.status(404).json({ success: false, message: 'Registration not found' });
        }
        return res.json({ success: true, data: registration });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = {
    adminLogin,
    getDashboardStats,
    getAllRegistrations,
    updateRegistrationStatus,
    deleteRegistration,
    getRegistrationById,
};
