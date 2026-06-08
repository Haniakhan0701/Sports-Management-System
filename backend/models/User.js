const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        full_name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password_hash: { type: String },
        rollNumber: { type: String, trim: true },
        phone: { type: String },
        department: { type: String },
        semester: { type: String },
        session: { type: String },
        sports: [{ type: String }],
        category: { type: String },
        role: { type: String, enum: ['user', 'admin'], default: 'user' }
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);