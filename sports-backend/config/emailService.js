const nodemailer = require('nodemailer');

// ── Create Gmail transporter ──────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail App Password (not your real password)
    },
});

// ── Sport icons map ───────────────────────────────────────────────────────────
const sportIcons = {
    Cricket: '🏏',
    Football: '⚽',
    Badminton: '🏸',
    'Tug of War': '🪢',
    'Dodge Ball': '🎯',
    '100m Race': '🏃',
    '4x100m Relay': '🏅',
    'Bottle Spin Chase': '🍾',
};

// ── 1. Confirmation email → sent to student on registration ──────────────────
const sendConfirmationEmail = async (registration) => {
    const { fullName, email, rollNumber, department, sport, category, status } = registration;
    const icon = sportIcons[sport] || '🏆';

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8"/>
      <style>
        body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 30px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #be123c, #1d4ed8); padding: 30px; text-align: center; color: white; }
        .header h1 { margin: 0; font-size: 24px; }
        .header p { margin: 8px 0 0; opacity: 0.9; font-size: 14px; }
        .body { padding: 30px; }
        .greeting { font-size: 18px; font-weight: bold; color: #1e293b; margin-bottom: 10px; }
        .message { color: #475569; line-height: 1.6; margin-bottom: 24px; }
        .details-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 24px; }
        .details-box h3 { margin: 0 0 14px; color: #1e293b; font-size: 15px; }
        .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
        .detail-row:last-child { border-bottom: none; }
        .detail-label { color: #64748b; }
        .detail-value { color: #1e293b; font-weight: bold; }
        .status-badge { display: inline-block; padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: bold; background: #fef3c7; color: #92400e; }
        .note { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 14px; border-radius: 4px; font-size: 13px; color: #1e40af; margin-bottom: 24px; }
        .footer { background: #1e293b; padding: 20px; text-align: center; color: #94a3b8; font-size: 12px; }
        .footer span { color: #e2e8f0; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏆 BZU Engineering Sports Week</h1>
          <p>February 2027 · Bahauddin Zakariya University</p>
        </div>
        <div class="body">
          <div class="greeting">Assalam-o-Alaikum, ${fullName}! 👋</div>
          <div class="message">
            Your registration for <strong>BZU Engineering Sports Week 2027</strong> has been received successfully. 
            Our team will review your application and you will be notified once it is approved.
          </div>

          <div class="details-box">
            <h3>📋 Registration Details</h3>
            <div class="detail-row">
              <span class="detail-label">Roll Number</span>
              <span class="detail-value">${rollNumber}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Department</span>
              <span class="detail-value">${department}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Sport</span>
              <span class="detail-value">${icon} ${sport}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Category</span>
              <span class="detail-value">${category}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Status</span>
              <span class="detail-value"><span class="status-badge">⏳ ${status}</span></span>
            </div>
          </div>

          <div class="note">
            📱 You will be added to the team WhatsApp group once your registration is approved. 
            Keep an eye on your email for updates!
          </div>
        </div>
        <div class="footer">
          <span>BZU Engineering Sports Week 2027</span><br/>
          Department of Engineering · Bahauddin Zakariya University, Multan
        </div>
      </div>
    </body>
    </html>
    `;

    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: `✅ Registration Received — ${sport} (${category}) | BZU Sports Week 2027`,
        html,
    });
};

// ── 2. Status update email → sent when admin approves/rejects ────────────────
const sendStatusUpdateEmail = async (registration) => {
    const { fullName, email, sport, category, status, adminNote } = registration;
    const icon = sportIcons[sport] || '🏆';
    const isApproved = status === 'Approved';

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8"/>
      <style>
        body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 30px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { background: ${isApproved ? 'linear-gradient(135deg, #059669, #0284c7)' : 'linear-gradient(135deg, #dc2626, #7c3aed)'}; padding: 30px; text-align: center; color: white; }
        .header h1 { margin: 0; font-size: 24px; }
        .body { padding: 30px; }
        .greeting { font-size: 18px; font-weight: bold; color: #1e293b; margin-bottom: 10px; }
        .message { color: #475569; line-height: 1.6; margin-bottom: 24px; }
        .status-box { text-align: center; padding: 20px; border-radius: 12px; margin-bottom: 24px; background: ${isApproved ? '#f0fdf4' : '#fef2f2'}; border: 2px solid ${isApproved ? '#86efac' : '#fca5a5'}; }
        .status-icon { font-size: 48px; }
        .status-text { font-size: 22px; font-weight: bold; color: ${isApproved ? '#15803d' : '#dc2626'}; margin-top: 8px; }
        .sport-badge { display: inline-block; background: #eff6ff; color: #1d4ed8; padding: 8px 20px; border-radius: 20px; font-weight: bold; margin-bottom: 24px; }
        .admin-note { background: #fefce8; border-left: 4px solid #eab308; padding: 14px; border-radius: 4px; font-size: 13px; color: #713f12; margin-bottom: 24px; }
        .next-steps { background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 16px; font-size: 14px; color: #166534; }
        .footer { background: #1e293b; padding: 20px; text-align: center; color: #94a3b8; font-size: 12px; }
        .footer span { color: #e2e8f0; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏆 BZU Engineering Sports Week</h1>
          <p>Registration Status Update</p>
        </div>
        <div class="body">
          <div class="greeting">Dear ${fullName},</div>
          <div class="message">
            Your registration status for <strong>${icon} ${sport} (${category})</strong> has been updated.
          </div>

          <div class="status-box">
            <div class="status-icon">${isApproved ? '✅' : '❌'}</div>
            <div class="status-text">${isApproved ? 'Registration APPROVED!' : 'Registration Rejected'}</div>
          </div>

          ${adminNote ? `
          <div class="admin-note">
            <strong>📝 Note from Admin:</strong><br/>${adminNote}
          </div>` : ''}

          ${isApproved ? `
          <div class="next-steps">
            <strong>🎉 What's Next?</strong><br/><br/>
            • You will be added to the <strong>team WhatsApp group</strong> shortly<br/>
            • Check the schedule on the Sports Week website<br/>
            • Report to your venue on time — be ready to play!<br/>
            • Wear your department colors with pride 🏅
          </div>` : `
          <div class="admin-note">
            If you believe this is a mistake, please contact the Sports Committee or re-register with correct information.
          </div>`}
        </div>
        <div class="footer">
          <span>BZU Engineering Sports Week 2027</span><br/>
          Department of Engineering · Bahauddin Zakariya University, Multan
        </div>
      </div>
    </body>
    </html>
    `;

    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: `${isApproved ? '✅ Approved' : '❌ Rejected'} — ${sport} Registration | BZU Sports Week 2027`,
        html,
    });
};

// ── 3. Admin notification → sent to admin when new registration comes in ──────
const sendAdminNotification = async (registration) => {
    const { fullName, rollNumber, department, sport, category, email, phone } = registration;
    const icon = sportIcons[sport] || '🏆';

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background: #f4f4f4; }
        .container { max-width: 500px; margin: 20px auto; background: white; border-radius: 10px; overflow: hidden; }
        .header { background: #1e293b; padding: 20px; color: white; text-align: center; }
        .body { padding: 24px; }
        .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
        .row:last-child { border-bottom: none; }
        .label { color: #64748b; }
        .value { color: #1e293b; font-weight: bold; }
        .cta { text-align: center; margin-top: 20px; }
        .btn { background: #1d4ed8; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header"><h2>🔔 New Registration Received</h2></div>
        <div class="body">
          <div class="row"><span class="label">Name</span><span class="value">${fullName}</span></div>
          <div class="row"><span class="label">Roll No</span><span class="value">${rollNumber}</span></div>
          <div class="row"><span class="label">Department</span><span class="value">${department}</span></div>
          <div class="row"><span class="label">Sport</span><span class="value">${icon} ${sport}</span></div>
          <div class="row"><span class="label">Category</span><span class="value">${category}</span></div>
          <div class="row"><span class="label">Phone</span><span class="value">${phone}</span></div>
          <div class="row"><span class="label">Email</span><span class="value">${email}</span></div>
          <div class="cta">
            <a href="${process.env.CLIENT_URL}/admin/dashboard" class="btn">Go to Dashboard →</a>
          </div>
        </div>
      </div>
    </body>
    </html>
    `;

    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.ADMIN_EMAIL,
        subject: `🔔 New Registration: ${fullName} — ${sport} | BZU Sports Week`,
        html,
    });
};

module.exports = {
    sendConfirmationEmail,
    sendStatusUpdateEmail,
    sendAdminNotification,
};
