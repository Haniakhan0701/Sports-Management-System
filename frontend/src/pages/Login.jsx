import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const role = await login(email, password);
      role === "admin" ? navigate("/admin/dashboard") : navigate("/");
    } catch (err) {
      setError("Invalid credentials. Access denied.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=Inter:wght@400;500;600&display=swap');

        * { box-sizing: border-box; }

        .login-page {
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          background: #f8fafc;
          display: flex;
          flex-direction: column;
        }

        /* ── HERO TOP SECTION (matches home page) ── */
        .login-hero {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
          padding: 56px 24px 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .login-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(37,99,235,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.08) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }
        .login-hero::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0; right: 0;
          height: 60px;
          background: #f8fafc;
          clip-path: ellipse(55% 100% at 50% 100%);
        }
        .hero-orb-1 {
          position: absolute;
          width: 400px; height: 400px;
          background: rgba(29,78,216,0.15);
          border-radius: 50%;
          filter: blur(80px);
          top: -100px; left: -80px;
          pointer-events: none;
          animation: orbFloat 8s ease-in-out infinite alternate;
        }
        .hero-orb-2 {
          position: absolute;
          width: 300px; height: 300px;
          background: rgba(16,185,129,0.08);
          border-radius: 50%;
          filter: blur(70px);
          bottom: -60px; right: -60px;
          pointer-events: none;
          animation: orbFloat 11s ease-in-out infinite alternate-reverse;
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

        .hero-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 700;
          color: #f1f5f9;
          margin: 0 0 8px;
          letter-spacing: 0.04em;
          position: relative; z-index: 1;
          text-shadow: 0 0 40px rgba(59,130,246,0.3);
        }
        .hero-title span { color: #38bdf8; }
        .hero-sub {
          font-size: 13px; color: #64748b;
          letter-spacing: 0.2em; text-transform: uppercase;
          margin: 0 0 20px; position: relative; z-index: 1;
        }

        .hero-stats {
          display: flex; gap: 14px; justify-content: center;
          position: relative; z-index: 1; margin-top: 8px;
        }
        .hero-stat {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(59,130,246,0.18);
          border-radius: 12px; padding: 12px 18px; text-align: center;
          box-shadow: 0 6px 0 rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .hero-stat-num {
          font-family: 'Rajdhani', sans-serif; font-size: 24px;
          font-weight: 700; color: #fbbf24; display: block;
        }
        .hero-stat-label {
          font-size: 9px; color: #475569;
          text-transform: uppercase; letter-spacing: 0.1em;
        }

        /* ── WHITE MID SECTION — FORM CARD ── */
        .login-body {
          flex: 1;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 0 24px 60px;
          background: #f8fafc;
        }

        .login-card {
          width: 100%;
          max-width: 440px;
          margin-top: -40px;
          background: #ffffff;
          border-radius: 20px;
          box-shadow:
            0 4px 6px rgba(0,0,0,0.05),
            0 20px 60px rgba(0,0,0,0.12),
            0 0 0 1px rgba(0,0,0,0.05);
          overflow: hidden;
          position: relative;
          z-index: 2;
        }

        /* Card top accent bar */
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

        .card-inner { padding: 36px 36px 40px; }

        .card-header { margin-bottom: 28px; }
        .card-header-top {
          display: flex; align-items: center; gap: 12px; margin-bottom: 6px;
        }
        .card-shield {
          width: 44px; height: 44px;
          background: linear-gradient(135deg, #1d4ed8, #3b82f6);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px;
          box-shadow: 0 4px 12px rgba(29,78,216,0.35), 0 3px 0 #1e3a8a;
          flex-shrink: 0;
        }
        .card-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 28px; font-weight: 700;
          color: #0f172a; margin: 0; letter-spacing: 0.02em;
        }
        .card-subtitle { font-size: 13px; color: #64748b; margin: 0; }

        /* RBAC role pills */
        .roles-row {
          display: flex; gap: 6px; margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #f1f5f9;
        }
        .role-pill {
          font-size: 10px; font-weight: 600;
          padding: 3px 10px; border-radius: 20px;
          letter-spacing: 0.07em; text-transform: uppercase;
        }
        .role-admin { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }
        .role-player { background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }
        .role-viewer { background: #eff6ff; color: #2563eb; border: 1px solid #bfdbfe; }

        /* ERROR */
        .error-box {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          border-radius: 10px;
          padding: 11px 14px;
          font-size: 13px;
          margin-bottom: 20px;
          display: flex; align-items: center; gap: 8px;
          border-left: 3px solid #dc2626;
        }

        /* FORM */
        .login-form { display: flex; flex-direction: column; gap: 20px; }

        .field-label {
          display: block;
          font-size: 11px; font-weight: 600;
          color: #374151;
          letter-spacing: 0.08em; text-transform: uppercase;
          margin-bottom: 7px;
        }

        /* 3D INPUT — keeping the 3D touch */
        .input-wrap { position: relative; }
        .input-icon {
          position: absolute; left: 14px; top: 50%;
          transform: translateY(-50%);
          font-size: 15px; pointer-events: none;
          color: #94a3b8;
        }
        .input-3d {
          width: 100%;
          padding: 13px 16px 13px 42px;
          font-size: 14px; font-family: 'Inter', sans-serif;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-bottom: 3px solid #cbd5e1;
          border-radius: 10px;
          color: #0f172a;
          outline: none;
          transition: all 0.2s;
          box-shadow: 0 3px 0 rgba(0,0,0,0.06), inset 0 1px 2px rgba(0,0,0,0.04);
        }
        .input-3d::placeholder { color: #94a3b8; }
        .input-3d:focus {
          background: #fff;
          border-color: #3b82f6;
          border-bottom-color: #1d4ed8;
          color: #0f172a;
          box-shadow: 0 3px 0 rgba(29,78,216,0.2), 0 0 0 3px rgba(59,130,246,0.1);
          transform: translateY(-1px);
        }

        /* SUBMIT BTN — 3D blue */
        .submit-btn {
          width: 100%; padding: 15px;
          background: linear-gradient(to bottom, #2563eb, #1d4ed8);
          color: #ffffff;
          font-weight: 700; font-size: 14px;
          font-family: 'Rajdhani', sans-serif;
          letter-spacing: 0.14em; text-transform: uppercase;
          border: none; border-radius: 10px; cursor: pointer;
          border-bottom: 4px solid #1e3a8a;
          transition: all 0.15s;
          box-shadow: 0 6px 0 #1e3a8a, 0 8px 20px rgba(29,78,216,0.35);
          margin-top: 4px;
        }
        .submit-btn:hover:not(:disabled) {
          background: linear-gradient(to bottom, #3b82f6, #2563eb);
          transform: translateY(-2px);
          box-shadow: 0 8px 0 #1e3a8a, 0 12px 28px rgba(29,78,216,0.45);
        }
        .submit-btn:active:not(:disabled) {
          transform: translateY(3px);
          border-bottom-width: 1px;
          box-shadow: 0 2px 0 #1e3a8a;
        }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .register-prompt {
          text-align: center; font-size: 13px;
          color: #64748b; margin-top: 20px;
        }
        .register-link {
          color: #2563eb; font-weight: 600; text-decoration: none;
        }
        .register-link:hover { color: #1d4ed8; text-decoration: underline; }

        .divider {
          display: flex; align-items: center; gap: 12px; margin-top: 24px;
        }
        .divider-line { flex: 1; height: 1px; background: #f1f5f9; }
        .divider-text {
          font-size: 10px; color: #cbd5e1;
          letter-spacing: 0.1em; text-transform: uppercase; white-space: nowrap;
        }

        @media (max-width: 500px) {
          .card-inner { padding: 28px 20px 32px; }
          .hero-stats { gap: 8px; }
          .hero-stat { padding: 10px 12px; }
        }
      `}</style>

      <div className="login-page">

        {/* ── HERO TOP ── */}
        <div className="login-hero">
          <div className="hero-orb-1" />
          <div className="hero-orb-2" />

          <div className="hero-badge">
            <span className="hero-dot" />
            Secure Portal
          </div>

          <h1 className="hero-title">
            BZU <span>ENGINEERING</span>
          </h1>
          <p className="hero-sub">Sports Championship · 2026</p>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-num">5</span>
              <span className="hero-stat-label">Departments</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">12+</span>
              <span className="hero-stat-label">Sports</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">2026</span>
              <span className="hero-stat-label">Season</span>
            </div>
          </div>
        </div>

        {/* ── WHITE BODY WITH FORM CARD ── */}
        <div className="login-body">
          <div className="login-card">
            <div className="card-accent" />
            <div className="card-inner">

              <div className="card-header">
                <div className="card-header-top">
                  <div className="card-shield">🏆</div>
                  <div>
                    <h2 className="card-title">Sign In</h2>
                    <p className="card-subtitle">Enter your credentials to access your role</p>
                  </div>
                </div>
                <div className="roles-row">
                  <span className="role-pill role-admin">Admin</span>
                
                </div>
              </div>

              {error && (
                <div className="error-box">
                  <span>⚠</span> {error}
                </div>
              )}

              <form className="login-form" onSubmit={handleSubmit}>
                <div>
                  <label className="field-label">Email Address</label>
                  <div className="input-wrap">
                    <span className="input-icon">✉️</span>
                    <input
                      type="email"
                      className="input-3d"
                      placeholder="you@bzu.edu.pk"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="field-label">Password</label>
                  <div className="input-wrap">
                    <span className="input-icon">🔒</span>
                    <input
                      type="password"
                      className="input-3d"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "Authenticating..." : "Access Portal →"}
                </button>
              </form>

              <p className="register-prompt">
                New member?{" "}
                <Link to="/register" className="register-link">Create an account</Link>
              </p>

              <div className="divider">
                <span className="divider-line" />
                <span className="divider-text">BZU Engineering Sports · RBAC</span>
                <span className="divider-line" />
              </div>

            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Login;
