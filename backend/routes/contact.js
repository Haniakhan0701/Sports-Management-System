const express = require("express");
const router = express.Router();
const Contact = require("../models/contactModel");
const nodemailer = require("nodemailer"); // ✅ Import Nodemailer

router.post("/", async (req, res) => {
    const { purpose, name, email, topic, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: "Required fields missing." });
    }

    try {
        // Save to MongoDB
        const newContact = new Contact({
            purpose,
            name,
            email,
            topic: purpose === "submit" ? topic : "",
            message,
        });

        await newContact.save();

        // ✅ Send Email using Nodemailer
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER, // your Gmail from .env
                pass: process.env.GMAIL_PASS, // your app password from .env
            },
        });

        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: process.env.GMAIL_USER,
            subject: `New ${purpose} message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nTopic: ${topic || "N/A"}\nPurpose: ${purpose}\n\nMessage:\n${message}`,
        };

        await transporter.sendMail(mailOptions); // ✅

        res.status(201).json({ message: "Message stored and email sent successfully" });
    } catch (error) {
        console.error("Error saving contact or sending email:", error.message);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
