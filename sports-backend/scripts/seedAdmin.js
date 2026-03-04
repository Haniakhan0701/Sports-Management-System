// Run this ONCE to create the admin account:
//   node scripts/seedAdmin.js

require('dotenv').config();
const mongoose = require('mongoose');
const Admin    = require('../models/Admin');
const connectDB = require('../config/db');

const seedAdmin = async () => {
    await connectDB();

    const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (existing) {
        console.log('⚠️  Admin already exists:', existing.email);
        process.exit(0);
    }

    const admin = await Admin.create({
        name:     'BZU Sports Admin',
        email:    process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
    });

    console.log('✅ Admin created successfully!');
    console.log('   Email   :', admin.email);
    console.log('   Password: (from your .env ADMIN_PASSWORD)');
    console.log('\n👉 You can now login at: POST /api/admin/login');
    process.exit(0);
};

seedAdmin().catch((err) => {
    console.error('❌ Seed error:', err);
    process.exit(1);
});
