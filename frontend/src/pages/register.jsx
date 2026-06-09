import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({
    name: "", rollNumber: "", email: "", phone: "",
    department: "", semester: "", session: "",
    sports: [], category: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const departments = [
    { code: "CE", label: "Computer" },
    { code: "ME", label: "Mechanical" },
    { code: "EE", label: "Electrical" },
    { code: "CVE", label: "Civil" },
    { code: "AR", label: "Architecture" },
  ];

  const semesters = ["1st","2nd","3rd","4th","5th","6th","7th","8th"];
  const currentYear = 2026;
  const sessions = Array.from({ length: 5 }, (_, i) => {
    const start = currentYear - 4 + i;
    return `${start}-${start + 4}`;
  });

  const sports = [
    { name: "Cricket", icon: "🏏" },
    { name: "Football", icon: "⚽" },
    { name: "Basketball", icon: "🏀" },
    { name: "Volleyball", icon: "🏐" },
    { name: "Badminton", icon: "🏸" },
    { name: "Athletics", icon: "🏃" },
    { name: "Tug of War", icon: "🪢" },
    { name: "Dodge Ball", icon: "🎯" },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const toggleSport = (sportName) => {
    setError("");
    setForm((prev) => ({
      ...prev,
      sports: prev.sports.includes(sportName)
        ? prev.sports.filter((s) => s !== sportName)
        : [...prev.sports, sportName],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const required = ["name","rollNumber","email","phone","department","semester","session","category"];
    for (let field of required) {
      if (!form[field]) { setError("Please fill in all required fields."); return; }
    }
    if (form.sports.length === 0) { setError("Please select at least one sport."); return; }

    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/createaccount`, form);
      if (res.data.success) setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSuccess(false);
    setForm({ name:"", rollNumber:"", email:"", phone:"", department:"", semester:"", session:"", sports:[], category:"" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=Inter:wght@400;500;600&display=swap');

        * { box-sizing: border-box; }

        .reg-page {
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          background: #f8fafc;
          display: flex;
          flex-direction: column;
        }

        /* ── HERO TOP (matches home page dark navy) ── */
        .reg-hero {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
          padding: 52px 24px 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .reg-hero::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(37,99,235,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.07) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }
        .reg-hero::after {
          content: '';
          position: absolute; bottom: -1px; left: 0; right: 0;
          height: 60px;
          background: #f8fafc;
          clip-path: ellipse(55% 100% at 50% 100%);
        }
        .reg-orb-1 {
          position: absolute; width: 400px; height: 400px;
          background: rgba(29,78,216,0.15); border-radius: 50%;
          filter: blur(80px); top: -100px; left: -80px;
          pointer-events: none;
          animation: orbFloat 9s ease-in-out infinite alternate;
        }
        .reg-orb-2 {
          position: absolute; width: 300px; height: 300px;
          background: rgba(16,185,129,0.08); border-radius: 50%;
          filter: blur(70px); bottom: -60px; right: -60px;
          pointer-events: none;
          animation: orbFloat 12s ease-in-out infinite alternate-reverse;
        }
        @keyframes orbFloat {
          from { transform: translate(0,0) scale(1); }
          to { transform: translate(20px,15px) scale(1.06); }
        }

        .hero-badge {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(16,185,129,0.1);
          border: 1px solid rgba(16,185,129,0.25);
          color: #34d399; font-size: 10px; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 5px 14px; border-radius: 20px;
          margin-bottom: 20px; position: relative; z-index: 1;
        }
        .hero-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #34d399;
          animation: blink 1.5s ease-in-out infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.15} }

        .reg-hero h1 {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 700; color: #f1f5f9;
          margin: 0 0 10px; letter-spacing: 0.04em;
          position: relative; z-index: 1;
          text-shadow: 0 0 40px rgba(59,130,246,0.3);
        }
        .reg-hero h1 span { color: #38bdf8; }
        .reg-hero p {
          font-size: 13px; color: #64748b;
          max-width: 440px; margin: 0 auto 24px;
          line-height: 1.7; position: relative; z-index: 1;
        }

        .dept-chips {
          display: flex; flex-wrap: wrap; justify-content: center;
          gap: 8px; position: relative; z-index: 1;
        }
        .dept-chip {
          background: rgba(59,130,246,0.1);
          border: 1px solid rgba(59,130,246,0.2);
          color: #60a5fa; font-size: 11px; font-weight: 700;
          padding: 4px 12px; border-radius: 20px; letter-spacing: 0.06em;
        }

        /* ── WHITE BODY ── */
        .reg-body {
          flex: 1;
          background: #f8fafc;
          padding: 0 20px 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .reg-container {
          width: 100%; max-width: 720px;
          margin-top: -40px;
          position: relative; z-index: 2;
        }

        /* FORM CARD — white with 3D elements */
        .reg-card {
          background: #ffffff;
          border-radius: 20px;
          box-shadow:
            0 4px 6px rgba(0,0,0,0.05),
            0 20px 60px rgba(0,0,0,0.12),
            0 0 0 1px rgba(0,0,0,0.05);
          overflow: hidden;
        }

        .card-accent {
          height: 4px;
          background: linear-gradient(90deg, #1d4ed8, #38bdf8, #1d4ed8);
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .reg-card-header {
          background: linear-gradient(to right, #0f172a, #1e293b);
          padding: 22px 28px;
          display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid rgba(59,130,246,0.15);
        }
        .reg-card-header h2 {
          font-family: 'Rajdhani', sans-serif;
          font-size: 22px; font-weight: 700; color: #f1f5f9;
          margin: 0; letter-spacing: 0.04em;
        }
        .reg-card-header p { font-size: 12px; color: #64748b; margin: 3px 0 0; }
        .reg-card-icon { font-size: 36px; }

        .reg-form { padding: 28px; display: flex; flex-direction: column; gap: 32px; }

        /* SECTION TITLE */
        .reg-section-title {
          display: flex; align-items: center; gap: 8px;
          font-size: 10px; font-weight: 600; color: #64748b;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding-bottom: 12px;
          border-bottom: 2px solid #f1f5f9;
          margin-bottom: 16px;
        }

        /* GRID */
        .reg-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .reg-grid-full { grid-column: 1 / -1; }
        @media(max-width:580px) { .reg-grid-2 { grid-template-columns: 1fr; } }

        /* LABELS */
        .reg-label {
          display: block; font-size: 11px; font-weight: 600;
          color: #374151; letter-spacing: 0.08em;
          text-transform: uppercase; margin-bottom: 7px;
        }
        .reg-label span { color: #ef4444; }
        .reg-label small { color: #94a3b8; font-size: 9px; font-weight: 400; text-transform: none; letter-spacing: 0; margin-left: 4px; }

        /* 3D INPUTS on white background */
        .reg-input, .reg-select {
          width: 100%;
          padding: 12px 16px;
          font-size: 14px; font-family: 'Inter', sans-serif;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-bottom: 3px solid #cbd5e1;
          border-radius: 10px;
          color: #0f172a;
          outline: none;
          transition: all 0.2s;
          box-shadow: 0 3px 0 rgba(0,0,0,0.06), inset 0 1px 2px rgba(0,0,0,0.03);
          -webkit-appearance: none; appearance: none;
        }
        .reg-input::placeholder { color: #94a3b8; }
        .reg-input:focus, .reg-select:focus {
          background: #fff;
          border-color: #3b82f6;
          border-bottom-color: #1d4ed8;
          color: #0f172a;
          box-shadow: 0 3px 0 rgba(29,78,216,0.2), 0 0 0 3px rgba(59,130,246,0.1);
          transform: translateY(-1px);
        }
        .reg-select { cursor: pointer; }
        .reg-select option { background: #fff; color: #0f172a; }

        /* DEPT CARDS — 3D style on white */
        .dept-grid { display: grid; grid-template-columns: repeat(5,1fr); gap: 10px; }
        @media(max-width:580px) { .dept-grid { grid-template-columns: repeat(3,1fr); } }

        .dept-card {
          border: 1px solid #e2e8f0;
          border-bottom: 3px solid #cbd5e1;
          border-radius: 12px; padding: 14px 6px;
          text-align: center; cursor: pointer;
          background: #f8fafc;
          box-shadow: 0 4px 0 rgba(0,0,0,0.08);
          transition: all 0.18s; user-select: none;
        }
        .dept-card:hover {
          transform: translateY(-2px);
          background: #eff6ff;
          border-color: #bfdbfe;
          border-bottom-color: #93c5fd;
        }
        .dept-card.active {
          background: linear-gradient(to bottom, #1d4ed8, #1e40af);
          border-color: #3b82f6; border-bottom-color: #1e3a8a;
          box-shadow: 0 4px 0 #1e3a8a, 0 8px 20px rgba(29,78,216,0.3);
          transform: translateY(-2px);
        }
        .dept-card-code {
          font-family: 'Rajdhani', sans-serif; font-size: 18px;
          font-weight: 700; color: #2563eb; line-height: 1;
        }
        .dept-card.active .dept-card-code { color: #fff; }
        .dept-card-name { font-size: 9px; color: #94a3b8; margin-top: 3px; }
        .dept-card.active .dept-card-name { color: rgba(255,255,255,0.7); }

        /* SPORTS CARDS */
        .sports-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 10px; }
        @media(max-width:580px) { .sports-grid { grid-template-columns: repeat(2,1fr); } }

        .sport-card {
          border: 1px solid #e2e8f0;
          border-bottom: 3px solid #cbd5e1;
          border-radius: 12px; padding: 14px 8px;
          text-align: center; cursor: pointer;
          background: #f8fafc;
          box-shadow: 0 4px 0 rgba(0,0,0,0.08);
          position: relative; transition: all 0.18s; user-select: none;
        }
        .sport-card:hover {
          transform: translateY(-2px);
          background: #eff6ff; border-color: #bfdbfe;
        }
        .sport-card.active {
          background: linear-gradient(to bottom, #1d4ed8, #1e40af);
          border-color: #3b82f6; border-bottom-color: #1e3a8a;
          box-shadow: 0 4px 0 #1e3a8a, 0 8px 20px rgba(29,78,216,0.3);
          transform: translateY(-2px);
        }
        .sport-card-emoji { font-size: 28px; display: block; line-height: 1; }
        .sport-card-name { font-size: 11px; font-weight: 600; color: #2563eb; margin-top: 6px; }
        .sport-card.active .sport-card-name { color: #fff; }
        .sport-check {
          position: absolute; top: 6px; right: 6px;
          width: 16px; height: 16px; border-radius: 50%;
          background: #22c55e;
          display: flex; align-items: center; justify-content: center;
          font-size: 9px; color: #fff; font-weight: 700;
          opacity: 0; transform: scale(0.5); transition: all 0.15s;
        }
        .sport-card.active .sport-check { opacity: 1; transform: scale(1); }

        .sport-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
        .sport-tag {
          background: #eff6ff; border: 1px solid #bfdbfe;
          color: #2563eb; font-size: 11px; font-weight: 600;
          padding: 3px 10px; border-radius: 20px;
          display: flex; align-items: center; gap: 5px;
        }
        .sport-tag-x { cursor: pointer; color: #ef4444; font-weight: 700; }
        .no-sports { font-size: 12px; color: #94a3b8; font-style: italic; }

        /* CATEGORY */
        .cat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .cat-card {
          border: 1px solid #e2e8f0;
          border-bottom: 3px solid #cbd5e1;
          border-radius: 12px; padding: 16px 12px;
          text-align: center; cursor: pointer;
          background: #f8fafc;
          box-shadow: 0 4px 0 rgba(0,0,0,0.08);
          transition: all 0.18s; user-select: none;
        }
        .cat-card:hover { transform: translateY(-2px); background: #eff6ff; border-color: #bfdbfe; }
        .cat-card.active {
          background: linear-gradient(to bottom, #1d4ed8, #1e40af);
          border-color: #3b82f6; border-bottom-color: #1e3a8a;
          box-shadow: 0 4px 0 #1e3a8a, 0 8px 20px rgba(29,78,216,0.3);
          transform: translateY(-2px);
        }
        .cat-emoji { font-size: 28px; display: block; }
        .cat-label { font-size: 13px; font-weight: 700; color: #2563eb; margin-top: 6px; }
        .cat-card.active .cat-label { color: #fff; }

        /* ERROR */
        .reg-error {
          background: #fef2f2; border: 1px solid #fecaca;
          color: #dc2626; border-radius: 10px;
          padding: 12px 16px; font-size: 13px;
          display: flex; align-items: center; gap: 8px;
          border-left: 3px solid #dc2626;
        }

        /* SUBMIT */
        .reg-submit {
          width: 100%; padding: 16px;
          background: linear-gradient(to bottom, #2563eb, #1d4ed8);
          color: #fff;
          font-weight: 700; font-size: 15px;
          font-family: 'Rajdhani', sans-serif;
          letter-spacing: 0.14em; text-transform: uppercase;
          border: none; border-radius: 12px; cursor: pointer;
          border-bottom: 4px solid #1e3a8a;
          box-shadow: 0 6px 0 #1e3a8a, 0 8px 24px rgba(29,78,216,0.35);
          transition: all 0.15s;
        }
        .reg-submit:hover:not(:disabled) {
          background: linear-gradient(to bottom, #3b82f6, #2563eb);
          transform: translateY(-2px);
          box-shadow: 0 8px 0 #1e3a8a, 0 14px 30px rgba(29,78,216,0.4);
        }
        .reg-submit:active:not(:disabled) {
          transform: translateY(3px);
          border-bottom-width: 1px;
          box-shadow: 0 2px 0 #1e3a8a;
        }
        .reg-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .reg-footer-note { text-align: center; font-size: 11px; color: #94a3b8; line-height: 1.7; margin-top: 12px; }

        /* SUCCESS CARD */
        .success-card {
          background: #fff;
          border: 1px solid #bbf7d0;
          border-radius: 20px; padding: 48px 32px;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0,0,0,0.1);
        }
        .success-icon { font-size: 64px; display: block; margin-bottom: 20px; }
        .success-card h2 {
          font-family: 'Rajdhani', sans-serif; font-size: 32px;
          font-weight: 700; color: #0f172a; margin: 0 0 10px;
        }
        .success-card p { font-size: 13px; color: #64748b; margin: 0 0 6px; }
        .success-summary {
          background: #f8fafc; border: 1px solid #e2e8f0;
          border-radius: 14px; padding: 18px 22px;
          margin: 24px 0; text-align: left;
        }
        .summary-row {
          display: flex; justify-content: space-between;
          align-items: center; padding: 7px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        .summary-row:last-child { border-bottom: none; }
        .summary-key { font-size: 11px; color: #94a3b8; letter-spacing: 0.06em; text-transform: uppercase; }
        .summary-val { font-size: 13px; font-weight: 600; color: #0f172a; }
        .success-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 24px; }
        .btn-primary {
          background: linear-gradient(to bottom, #2563eb, #1d4ed8);
          color: #fff; font-weight: 700; font-size: 13px;
          font-family: 'Rajdhani', sans-serif; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 12px 24px; border-radius: 10px; border: none;
          border-bottom: 3px solid #1e3a8a; cursor: pointer;
          box-shadow: 0 4px 0 #1e3a8a; transition: all 0.15s;
          text-decoration: none; display: inline-block;
        }
        .btn-primary:hover { transform: translateY(-1px); }
        .btn-ghost {
          background: #f8fafc; border: 1px solid #e2e8f0;
          color: #2563eb; font-weight: 600; font-size: 13px;
          padding: 12px 24px; border-radius: 10px; cursor: pointer;
          text-decoration: none; display: inline-block; transition: all 0.15s;
        }
        .btn-ghost:hover { background: #eff6ff; border-color: #bfdbfe; }
      `}</style>

      <div className="reg-page">

        {/* ── HERO TOP ── */}
        <div className="reg-hero">
          <div className="reg-orb-1" />
          <div className="reg-orb-2" />

          <div className="hero-badge">
            <span className="hero-dot" />
            Athlete Registration · 2027
          </div>

          <motion.h1 initial={{ opacity:0, y:-16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>
            Register for <span>Sports Week 2027</span>
          </motion.h1>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }}>
            Represent your department. Select your sports and fill in your details to officially join the championship.
          </motion.p>

          <div className="dept-chips">
            {departments.map(d => (
              <span key={d.code} className="dept-chip">{d.code}</span>
            ))}
          </div>
        </div>

        {/* ── WHITE BODY ── */}
        <div className="reg-body">
          <div className="reg-container">
            <AnimatePresence mode="wait">

              {/* SUCCESS */}
              {success ? (
                <motion.div key="success" initial={{ opacity:0, scale:0.92 }} animate={{ opacity:1, scale:1 }} className="success-card">
                  <span className="success-icon">🎉</span>
                  <h2>You're Registered!</h2>
                  <p style={{ color:"#2563eb" }}>Welcome to <strong>BZU Engineering Sports Week 2027</strong></p>
                  <p>Your registration is <span style={{ color:"#d97706", fontWeight:600 }}>pending approval</span>. The sports committee will contact you once confirmed.</p>
                  <div className="success-summary">
                    <div className="summary-row"><span className="summary-key">Name</span><span className="summary-val">{form.name}</span></div>
                    <div className="summary-row"><span className="summary-key">Department</span><span className="summary-val">{form.department}</span></div>
                    <div className="summary-row"><span className="summary-key">Sports</span><span className="summary-val">{form.sports.join(", ")}</span></div>
                    <div className="summary-row"><span className="summary-key">Category</span><span className="summary-val">{form.category}</span></div>
                    <div className="summary-row"><span className="summary-key">Contact</span><span className="summary-val">{form.phone}</span></div>
                  </div>
                  <div className="success-btns">
                    <button onClick={resetForm} className="btn-primary">Register Another</button>
                    <Link to="/" className="btn-ghost">Back to Home</Link>
                  </div>
                </motion.div>
              ) : (

              /* FORM */
              <motion.div key="form" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="reg-card">
                <div className="card-accent" />

                <div className="reg-card-header">
                  <div>
                    <h2>Athlete Registration Form</h2>
                    <p>BZU Engineering Sports Week · February 2027</p>
                  </div>
                  <span className="reg-card-icon">🏟️</span>
                </div>

                <form onSubmit={handleSubmit} className="reg-form">
                  {error && (
                    <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} className="reg-error">
                      <span>⚠</span> {error}
                    </motion.div>
                  )}

                  {/* Personal Info */}
                  <div>
                    <div className="reg-section-title">👤 Personal Information</div>
                    <div className="reg-grid-2">
                      <div className="reg-grid-full">
                        <label className="reg-label">Full Name <span>*</span></label>
                        <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Ahmed Khan" className="reg-input" />
                      </div>
                      <div>
                        <label className="reg-label">Roll Number <span>*</span></label>
                        <input name="rollNumber" value={form.rollNumber} onChange={handleChange} placeholder="e.g. 22-CE-01" className="reg-input" />
                      </div>
                      <div>
                        <label className="reg-label">Phone <span>*</span><small>(WhatsApp group)</small></label>
                        <input name="phone" value={form.phone} onChange={handleChange} placeholder="+92 300 1234567" className="reg-input" />
                      </div>
                      <div className="reg-grid-full">
                        <label className="reg-label">Email Address <span>*</span><small>(for approval notifications)</small></label>
                        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="ahmed@bzu.edu.pk" className="reg-input" />
                      </div>
                    </div>
                  </div>

                  {/* Academic Info */}
                  <div>
                    <div className="reg-section-title">🏛️ Academic Information</div>
                    <label className="reg-label" style={{ marginBottom:10 }}>Department <span style={{ color:"#ef4444" }}>*</span></label>
                    <div className="dept-grid" style={{ marginBottom:20 }}>
                      {departments.map(d => (
                        <div key={d.code} className={`dept-card${form.department === d.code ? " active" : ""}`}
                          onClick={() => { setForm(f => ({ ...f, department: d.code })); setError(""); }}>
                          <div className="dept-card-code">{d.code}</div>
                          <div className="dept-card-name">{d.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="reg-grid-2">
                      <div>
                        <label className="reg-label">Semester <span>*</span></label>
                        <select name="semester" value={form.semester} onChange={handleChange} className="reg-select">
                          <option value="">Select Semester</option>
                          {semesters.map(s => <option key={s} value={s}>{s} Semester</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="reg-label">Session <span>*</span></label>
                        <select name="session" value={form.session} onChange={handleChange} className="reg-select">
                          <option value="">Select Session</option>
                          {sessions.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Sports */}
                  <div>
                    <div className="reg-section-title">
                      ⚽ Sport Selection
                      <span style={{ marginLeft:"auto", fontSize:10, color:"#94a3b8", fontWeight:400, textTransform:"none", letterSpacing:0 }}>Select one or more</span>
                    </div>
                    <div className="sports-grid" style={{ marginBottom:14 }}>
                      {sports.map(s => (
                        <div key={s.name} className={`sport-card${form.sports.includes(s.name) ? " active" : ""}`} onClick={() => toggleSport(s.name)}>
                          <span className="sport-check">✓</span>
                          <span className="sport-card-emoji">{s.icon}</span>
                          <div className="sport-card-name">{s.name}</div>
                        </div>
                      ))}
                    </div>
                    {form.sports.length > 0 ? (
                      <div className="sport-tags">
                        {form.sports.map(s => (
                          <span key={s} className="sport-tag">
                            {s} <span className="sport-tag-x" onClick={() => toggleSport(s)}>✕</span>
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="no-sports">No sports selected yet — tap any card above</p>
                    )}
                  </div>

                  {/* Category */}
                  <div>
                    <div className="reg-section-title">🏷️ Category</div>
                    <div className="cat-grid">
                      {["Men's","Women's"].map(c => (
                        <div key={c} className={`cat-card${form.category === c ? " active" : ""}`}
                          onClick={() => { setForm(f => ({ ...f, category: c })); setError(""); }}>
                          <span className="cat-emoji">{c === "Men's" ? "👨" : "👩"}</span>
                          <div className="cat-label">{c}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submit */}
                  <div>
                    <button type="submit" className="reg-submit" disabled={loading}>
                      {loading ? "Registering..." : "Register Now →"}
                    </button>
                    <p className="reg-footer-note">
                      By registering you agree to abide by BZU Sports Week rules and code of conduct.<br />
                      Your number will be used to add you to the team WhatsApp group.
                    </p>
                  </div>
                </form>
              </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
