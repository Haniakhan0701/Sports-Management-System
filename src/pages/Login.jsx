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

        .bzulogin-page {
          min-height: 100vh;
          display: flex;
          font-family: 'Inter', sans-serif;
          background: #060d1a;
          position: relative;
          overflow: hidden;
        }

        .bzulogin-grid {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(37,99,235,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.07) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
          z-index: 0;
        }

        .orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }
        .orb-1 {
          width: 500px; height: 500px;
          background: rgba(29,78,216,0.18);
          top: -100px; left: -100px;
          animation: orbFloat 8s ease-in-out infinite alternate;
        }
        .orb-2 {
          width: 400px; height: 400px;
          background: rgba(16,185,129,0.1);
          bottom: -80px; right: -80px;
          animation: orbFloat 10s ease-in-out infinite alternate-reverse;
        }
        @keyframes orbFloat {
          from { transform: translate(0,0) scale(1); }
          to { transform: translate(30px,20px) scale(1.08); }
        }

        .bzulogin-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 48px;
          position: relative;
          z-index: 1;
        }

        /* 3D floating shield */
        .shield-wrap {
          position: relative;
          width: 170px;
          height: 190px;
          margin: 0 auto 36px;
          animation: shieldHover 4s ease-in-out infinite;
          transform-style: preserve-3d;
        }
        @keyframes shieldHover {
          0%, 100% { transform: translateY(0) rotateX(3deg) rotateY(-5deg); }
          50% { transform: translateY(-14px) rotateX(-3deg) rotateY(5deg); }
        }
        .shield-shadow {
          position: absolute;
          bottom: -24px;
          left: 50%;
          transform: translateX(-50%);
          width: 120px;
          height: 18px;
          background: rgba(29,78,216,0.35);
          border-radius: 50%;
          filter: blur(10px);
          animation: shadowPulse 4s ease-in-out infinite;
        }
        @keyframes shadowPulse {
          0%, 100% { opacity: 0.6; transform: translateX(-50%) scaleX(1); }
          50% { opacity: 0.25; transform: translateX(-50%) scaleX(0.7); }
        }
        .shield-body {
          width: 170px;
          height: 190px;
          background: linear-gradient(145deg, #1e3a8a 0%, #1d4ed8 45%, #3b82f6 100%);
          clip-path: polygon(50% 0%, 100% 20%, 100% 60%, 50% 100%, 0% 60%, 0% 20%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow:
            inset 0 3px 20px rgba(255,255,255,0.12),
            0 20px 50px rgba(29,78,216,0.5);
        }
        .shield-body::before {
          content: '';
          position: absolute;
          inset: 12px;
          clip-path: polygon(50% 0%, 100% 20%, 100% 60%, 50% 100%, 0% 60%, 0% 20%);
          background: linear-gradient(145deg, #1e3a8a, #1e40af);
          opacity: 0.8;
        }
        .shield-icon {
          position: relative;
          z-index: 2;
          font-size: 54px;
          filter: drop-shadow(0 0 16px rgba(251,191,36,0.9));
          animation: iconPulse 3s ease-in-out infinite;
        }
        @keyframes iconPulse {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(251,191,36,0.6)); }
          50% { filter: drop-shadow(0 0 26px rgba(251,191,36,1)); }
        }
        .shield-ring {
          position: absolute;
          inset: -12px;
          clip-path: polygon(50% 0%, 100% 20%, 100% 60%, 50% 100%, 0% 60%, 0% 20%);
          background: transparent;
          border: 2px solid rgba(59,130,246,0.3);
          animation: ringPulse 3s ease-in-out infinite;
        }
        @keyframes ringPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.06); }
        }

        .brand-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 34px;
          font-weight: 700;
          color: #f1f5f9;
          letter-spacing: 0.07em;
          text-align: center;
          margin: 0 0 4px;
          text-shadow: 0 0 40px rgba(59,130,246,0.4);
        }
        .brand-sub {
          font-size: 11px;
          color: #60a5fa;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          text-align: center;
          margin: 0 0 14px;
        }
        .brand-tagline {
          font-size: 13px;
          color: #334155;
          text-align: center;
          max-width: 300px;
          line-height: 1.7;
          margin: 0 auto 44px;
        }

        /* 3D stat cards */
        .stats-row {
          display: flex;
          gap: 14px;
          justify-content: center;
        }
        .stat-card {
          background: linear-gradient(160deg, #0f1e3d 0%, #0a1225 100%);
          border: 1px solid rgba(59,130,246,0.18);
          border-radius: 14px;
          padding: 18px 20px;
          text-align: center;
          min-width: 86px;
          box-shadow:
            0 8px 0 #020818,
            0 12px 24px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.05);
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: default;
        }
        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow:
            0 13px 0 #020818,
            0 18px 32px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.07);
        }
        .stat-num {
          font-family: 'Rajdhani', sans-serif;
          font-size: 30px;
          font-weight: 700;
          color: #fbbf24;
          line-height: 1;
          display: block;
          text-shadow: 0 0 18px rgba(251,191,36,0.35);
        }
        .stat-label {
          font-size: 10px;
          color: #475569;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          display: block;
          margin-top: 5px;
        }

        /* RBAC badges */
        .roles-row {
          display: flex;
          gap: 8px;
          margin-top: 28px;
          justify-content: center;
        }
        .role-badge {
          font-size: 10px;
          padding: 4px 11px;
          border-radius: 20px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 600;
        }
        .role-admin { background: rgba(220,38,38,0.12); color: #f87171; border: 1px solid rgba(220,38,38,0.25); }
        .role-user  { background: rgba(16,185,129,0.12); color: #34d399; border: 1px solid rgba(16,185,129,0.25); }
        .role-viewer{ background: rgba(59,130,246,0.12); color: #60a5fa; border: 1px solid rgba(59,130,246,0.25); }

        /* RIGHT PANEL */
        .bzulogin-right {
          width: 100%;
          max-width: 460px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 40px;
          background: rgba(255,255,255,0.018);
          border-left: 1px solid rgba(59,130,246,0.1);
          position: relative;
          z-index: 1;
          backdrop-filter: blur(20px);
        }
        .form-card { width: 100%; max-width: 370px; }

        .access-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(16,185,129,0.08);
          border: 1px solid rgba(16,185,129,0.22);
          color: #34d399;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 20px;
          margin-bottom: 22px;
        }
        .access-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #34d399;
          animation: blink 1.5s ease-in-out infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.15; }
        }

        .form-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 36px;
          font-weight: 700;
          color: #f1f5f9;
          margin: 0 0 5px;
          letter-spacing: 0.02em;
        }
        .form-sub {
          font-size: 13px;
          color: #334155;
          margin: 0 0 30px;
        }

        .error-box {
          background: rgba(220,38,38,0.08);
          border: 1px solid rgba(220,38,38,0.25);
          color: #f87171;
          border-radius: 10px;
          padding: 11px 14px;
          font-size: 13px;
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .login-form { display: flex; flex-direction: column; gap: 18px; }

        .field-label {
          font-size: 10px;
          font-weight: 600;
          color: #475569;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 7px;
          display: block;
        }

        .input-3d {
          width: 100%;
          padding: 13px 16px 13px 44px;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(59,130,246,0.18);
          border-bottom: 3px solid rgba(30,64,175,0.5);
          border-radius: 10px;
          color: #cbd5e1;
          outline: none;
          transition: all 0.2s;
          box-sizing: border-box;
          box-shadow: 0 4px 0 rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03);
        }
        .input-3d::placeholder { color: #1e3a5f; }
        .input-3d:focus {
          background: rgba(37,99,235,0.06);
          border-color: rgba(59,130,246,0.45);
          border-bottom-color: #3b82f6;
          color: #e2e8f0;
          box-shadow: 0 4px 0 rgba(29,78,216,0.45), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0 3px rgba(59,130,246,0.08);
          transform: translateY(-1px);
        }

        .input-wrap { position: relative; }
        .input-prefix {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #334155;
          font-size: 14px;
          pointer-events: none;
        }

        .submit-btn {
          width: 100%;
          padding: 15px;
          background: linear-gradient(to bottom, #2563eb, #1d4ed8);
          color: #e0eaff;
          font-weight: 700;
          font-size: 14px;
          font-family: 'Rajdhani', sans-serif;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          border-bottom: 4px solid #1e3a8a;
          transition: all 0.15s;
          box-shadow: 0 6px 0 #0f1e5a, 0 8px 20px rgba(29,78,216,0.4);
          margin-top: 6px;
        }
        .submit-btn:hover:not(:disabled) {
          background: linear-gradient(to bottom, #3b82f6, #2563eb);
          transform: translateY(-2px);
          box-shadow: 0 8px 0 #0f1e5a, 0 12px 28px rgba(29,78,216,0.5);
        }
        .submit-btn:active:not(:disabled) {
          transform: translateY(3px);
          border-bottom-width: 1px;
          box-shadow: 0 2px 0 #0f1e5a, 0 4px 10px rgba(29,78,216,0.3);
        }
        .submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }

        .register-prompt {
          text-align: center;
          font-size: 13px;
          color: #334155;
          margin-top: 22px;
        }
        .register-link { color: #60a5fa; font-weight: 600; text-decoration: none; }
        .register-link:hover { color: #93c5fd; }

        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 28px;
        }
        .divider-line { flex: 1; height: 1px; background: rgba(59,130,246,0.08); }
        .divider-text {
          font-size: 10px;
          color: #1e3a5f;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .bzulogin-left { display: none; }
          .bzulogin-right {
            border-left: none;
            background: transparent;
            max-width: 100%;
            padding: 32px 24px;
          }
        }
      `}</style>

      <div className="bzulogin-page">
        <div className="bzulogin-grid" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        {/* LEFT — branding */}
        <div className="bzulogin-left">
          <div className="shield-wrap">
            <div className="shield-shadow" />
            <div className="shield-ring" />
            <div className="shield-body">
              <span className="shield-icon">🏆</span>
            </div>
          </div>

          <h1 className="brand-title">BZU ENGINEERING</h1>
          <p className="brand-sub">Sports Championship • 2026</p>
          <p className="brand-tagline">
            The premier departmental sports platform — secured with role-based access control.
          </p>

          <div className="stats-row">
            <div className="stat-card">
              <span className="stat-num">5</span>
              <span className="stat-label">Departments</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">12+</span>
              <span className="stat-label">Sports</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">2026</span>
              <span className="stat-label">Season</span>
            </div>
          </div>

          <div className="roles-row">
            <span className="role-badge role-admin">Admin</span>
            <span className="role-badge role-user">Player</span>
            <span className="role-badge role-viewer">Viewer</span>
          </div>
        </div>

        {/* RIGHT — form */}
        <div className="bzulogin-right">
          <div className="form-card">
            <div className="access-badge">
              <span className="access-dot" />
              Secure Portal
            </div>

            <h2 className="form-title">Sign In</h2>
            <p className="form-sub">Enter your credentials to access your role</p>

            {error && (
              <div className="error-box">
                <span>⚠</span> {error}
              </div>
            )}

            <form className="login-form" onSubmit={handleSubmit}>
              <div>
                <label className="field-label">Email Address</label>
                <div className="input-wrap">
                  <span className="input-prefix">✉</span>
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
                  <span className="input-prefix">🔒</span>
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

              <button
                type="submit"
                className="submit-btn"
                disabled={loading}
              >
                {loading ? "Authenticating..." : "Access Portal →"}
              </button>
            </form>

            <p className="register-prompt">
              New member?{" "}
              <Link to="/register" className="register-link">
                Create an account
              </Link>
            </p>

            <div className="divider">
              <span className="divider-line" />
              <span className="divider-text">BZU Engineering Sports · RBAC</span>
              <span className="divider-line" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
