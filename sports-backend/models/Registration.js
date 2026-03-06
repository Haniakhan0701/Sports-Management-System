const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema(
    {
        // ── Personal Info ──────────────────────────────────────
        fullName: {
            type: String,
            trim: true,
            minlength: [3, 'Name must be at least 3 characters'],
            maxlength: [60, 'Name cannot exceed 60 characters'],
        },
        rollNumber: {
            type: String,
            trim: true,
            uppercase: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
        },

        // ── Academic Info ──────────────────────────────────────
        department: {
            type: String,
            enum: {
                values: ['CE', 'ME', 'EE', 'CVE', 'AR'],
                message: 'Department must be CE, ME, EE, CVE, or AR',
            },
        },
        semester: {
            type: String,
            enum: {
                values: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'],
                message: 'Invalid semester',
            },
        },
        session: {
            type: String,
            enum: {
                values: ['2022-2026', '2023-2027', '2024-2028', '2025-2029', '2026-2030'],
                message: 'Invalid session',
            },
        },

        // ── Sport Selection (array — student can pick multiple) ─
        sports: {
            type: [String],
            enum: {
                values: [
                    'Cricket',
                    'Football',
                    'Badminton',
                    'Tug of War',
                    'Dodge Ball',
                    '100m Race',
                    '4×100m Relay',
                    'Bottle Spin Chase',
                ],
                message: 'Invalid sport selected',
            },
            default: [],
        },
        category: {
            type: String,
            enum: {
                values: ["Men's", "Women's"],
                message: "Category must be Men's or Women's",
            },
        },

        // ── Status (admin manages this) ────────────────────────
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],   // ← all lowercase
            default: 'pending',
        },
        adminNote: {
            type: String,
            default: '',
        },

        // ── Email notification tracking ────────────────────────
        confirmationEmailSent: {
            type: Boolean,
            default: false,
        },
        statusEmailSent: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Registration', registrationSchema);
