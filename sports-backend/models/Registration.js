const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema(
    {
        // ── Personal Info ──────────────────────────────────────
        fullName: {
            type: String,
            required: [true, 'Full name is required'],
            trim: true,
            minlength: [3, 'Name must be at least 3 characters'],
            maxlength: [60, 'Name cannot exceed 60 characters'],
        },
        rollNumber: {
            type: String,
            required: [true, 'Roll number is required'],
            trim: true,
            uppercase: true,
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true,
            match: [/^(\+92|0)?3[0-9]{9}$/, 'Please enter a valid Pakistani phone number'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
        },

        // ── Academic Info ──────────────────────────────────────
        department: {
            type: String,
            required: [true, 'Department is required'],
            enum: {
                values: ['CE', 'ME', 'EE', 'CVE', 'AR'],
                message: 'Department must be CE, ME, EE, CVE, or AR',
            },
        },
        semester: {
            type: String,
            required: [true, 'Semester is required'],
            enum: {
                values: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'],
                message: 'Invalid semester',
            },
        },
        session: {
            type: String,
            required: [true, 'Session is required'],
            enum: {
                values: ['2022-2026', '2023-2027', '2024-2028', '2025-2029', '2026-2030'],
                message: 'Invalid session',
            },
        },

        // ── Sport Selection ────────────────────────────────────
        sport: {
            type: String,
            required: [true, 'Sport is required'],
            enum: {
                values: [
                    'Cricket',
                    'Football',
                    'Badminton',
                    'Tug of War',
                    'Dodge Ball',
                    '100m Race',
                    '4x100m Relay',
                    'Bottle Spin Chase',
                ],
                message: 'Invalid sport selected',
            },
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            enum: {
                values: ["Men's", "Women's"],
                message: "Category must be Men's or Women's",
            },
        },

        // ── Status (admin manages this) ────────────────────────
        status: {
            type: String,
            enum: ['Pending', 'Approved', 'Rejected'],
            default: 'Pending',
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
        timestamps: true, // adds createdAt and updatedAt automatically
    }
);

// Prevent same roll number registering for same sport + category twice
registrationSchema.index({ rollNumber: 1, sport: 1, category: 1 }, { unique: true });

module.exports = mongoose.model('Registration', registrationSchema);
