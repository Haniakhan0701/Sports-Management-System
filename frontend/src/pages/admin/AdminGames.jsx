import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const API = "http://localhost:5000/api";

const SPORTS = [
  { name: "Cricket", icon: "🏏" },
  { name: "Football", icon: "⚽" },
  { name: "Badminton", icon: "🏸" },
  { name: "Tug of War", icon: "🪢" },
  { name: "Dodge Ball", icon: "🎯" },
  { name: "100m Race", icon: "🏃" },
  { name: "4×100m Relay", icon: "🏅" },
  { name: "Bottle Spin Chase", icon: "🍾" },
];

const TEAMS = ["CE", "ME", "EE", "CVE", "AR"];

const TEAM_COLORS = {
  CE: "#3b82f6", ME: "#f59e0b", EE: "#10b981", CVE: "#ef4444", AR: "#8b5cf6",
};

const STATUS_CONFIG = {
  upcoming:  { label: "Upcoming",  color: "#f59e0b", bg: "rgba(245,158,11,0.12)",  dot: "#f59e0b" },
  live:      { label: "LIVE",      color: "#22c55e", bg: "rgba(34,197,94,0.12)",   dot: "#22c55e" },
  completed: { label: "Completed", color: "#64748b", bg: "rgba(100,116,139,0.12)", dot: "#64748b" },
  cancelled: { label: "Cancelled", color: "#ef4444", bg: "rgba(239,68,68,0.12)",   dot: "#ef4444" },
};

const getToken = () => localStorage.getItem("bzu_token");

export default function AdminGames() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("all"); // all | upcoming | live | completed
  const [showForm, setShowForm] = useState(false);
  const [scoreModal, setScoreModal] = useState(null); // match object
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const [form, setForm] = useState({
    sport: "", category: "", teamA: "", teamB: "", scheduledAt: "", notes: "",
  });

  const [scores, setScores] = useState({ scoreA: 0, scoreB: 0 });

  // ── Fetch Matches
  const fetchMatches = async () => {
    try {
      const res = await axios.get(`${API}/matches`);
      setMatches(res.data.matches || []);
    } catch {
      showToast("Failed to load matches", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMatches(); }, []);

  // ── Toast
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Create Match
  const handleCreate = async (e) => {
    e.preventDefault();
    if (form.teamA === form.teamB) return showToast("Teams cannot be the same!", "error");
    setSubmitting(true);
    try {
      await axios.post(`${API}/matches`, form, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      showToast("Match created successfully! ✅");
      setShowForm(false);
      setForm({ sport: "", category: "", teamA: "", teamB: "", scheduledAt: "", notes: "" });
      fetchMatches();
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to create match", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Update Score
  const handleUpdateScore = async () => {
    setSubmitting(true);
    try {
      await axios.put(`${API}/matches/${scoreModal._id}/score`, scores, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      showToast("Score updated! 🏆");
      setScoreModal(null);
      fetchMatches();
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to update score", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // ── End Match
  const handleEnd = async (id) => {
    if (!window.confirm("End this match? Winner will be determined by score.")) return;
    try {
      await axios.put(`${API}/matches/${id}/end`, {}, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      showToast("Match ended! Result saved. ✅");
      fetchMatches();
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to end match", "error");
    }
  };

  // ── Cancel Match
  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this match?")) return;
    try {
      await axios.put(`${API}/matches/${id}/cancel`, {}, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      showToast("Match cancelled.");
      fetchMatches();
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to cancel", "error");
    }
  };

  // ── Delete Match
  const handleDelete = async (id) => {
    if (!window.confirm("Permanently delete this match?")) return;
    try {
      await axios.delete(`${API}/matches/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      showToast("Match deleted.");
      fetchMatches();
    } catch (err) {
      showToast("Failed to delete match", "error");
    }
  };

  // ── Filter
  const filtered = tab === "all" ? matches : matches.filter(m => m.status === tab);

  // ── Stats
  const stats = {
    total:     matches.length,
    live:      matches.filter(m => m.status === "live").length,
    upcoming:  matches.filter(m => m.status === "upcoming").length,
    completed: matches.filter(m => m.status === "completed").length,
  };

  const sportIcon = (name) => SPORTS.find(s => s.name === name)?.icon || "🏆";

  const formatDate = (d) => {
    if (!d) return "";
    const dt = new Date(d);
    return dt.toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" }) +
      " · " + dt.toLocaleTimeString("en-PK", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .ag-page {
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          background: #f8fafc;
        }

        /* ── HERO ── */
        .ag-hero {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
          padding: 48px 24px 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .ag-hero::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(37,99,235,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.07) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }
        .ag-hero::after {
          content: '';
          position: absolute; bottom: -1px; left: 0; right: 0;
          height: 60px;
          background: #f8fafc;
          clip-path: ellipse(55% 100% at 50% 100%);
        }
        .ag-orb-1 {
          position: absolute; width: 400px; height: 400px;
          background: rgba(29,78,216,0.15); border-radius: 50%;
          filter: blur(80px); top: -100px; left: -80px;
          pointer-events: none;
          animation: orbFloat 9s ease-in-out infinite alternate;
        }
        .ag-orb-2 {
          position: absolute; width: 300px; height: 300px;
          background: rgba(16,185,129,0.08); border-radius: 50%;
          filter: blur(70px); bottom: -60px; right: -60px;
          pointer-events: none;
          animation: orbFloat 12s ease-in-out infinite alternate-reverse;
        }
        @keyframes orbFloat {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(20px,15px) scale(1.06); }
        }

        .ag-badge {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.25);
          color: #f87171; font-size: 10px; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 5px 14px; border-radius: 20px;
          margin-bottom: 20px; position: relative; z-index: 1;
        }
        .ag-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #f87171;
          animation: blink 1.5s ease-in-out infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.15} }

        .ag-hero h1 {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(28px, 5vw, 48px);
          font-weight: 700; color: #f1f5f9;
          margin: 0 0 10px; letter-spacing: 0.04em;
          position: relative; z-index: 1;
          text-shadow: 0 0 40px rgba(59,130,246,0.3);
        }
        .ag-hero h1 span { color: #38bdf8; }
        .ag-hero p {
          font-size: 13px; color: #64748b;
          position: relative; z-index: 1;
        }

        /* ── BODY ── */
        .ag-body {
          padding: 0 20px 60px;
          display: flex; flex-direction: column; align-items: center;
        }
        .ag-container {
          width: 100%; max-width: 1000px;
          margin-top: -40px;
          position: relative; z-index: 2;
        }

        /* ── STATS ROW ── */
        .ag-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px; margin-bottom: 24px;
        }
        @media(max-width:640px){ .ag-stats { grid-template-columns: repeat(2,1fr); } }

        .ag-stat {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-bottom: 3px solid #cbd5e1;
          border-radius: 14px;
          padding: 18px 16px;
          box-shadow: 0 4px 0 rgba(0,0,0,0.06);
          text-align: center;
        }
        .ag-stat-num {
          font-family: 'Rajdhani', sans-serif;
          font-size: 36px; font-weight: 700;
          line-height: 1;
        }
        .ag-stat-label {
          font-size: 10px; font-weight: 600; color: #94a3b8;
          letter-spacing: 0.1em; text-transform: uppercase;
          margin-top: 4px;
        }

        /* ── TOOLBAR ── */
        .ag-toolbar {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 16px 20px;
          display: flex; align-items: center;
          justify-content: space-between;
          flex-wrap: wrap; gap: 12px;
          margin-bottom: 20px;
          box-shadow: 0 4px 0 rgba(0,0,0,0.04);
        }

        .ag-tabs {
          display: flex; gap: 6px; flex-wrap: wrap;
        }
        .ag-tab {
          padding: 7px 16px;
          border-radius: 20px;
          font-size: 12px; font-weight: 600;
          cursor: pointer; border: none;
          background: #f1f5f9; color: #64748b;
          transition: all 0.15s;
          font-family: 'Inter', sans-serif;
        }
        .ag-tab.active {
          background: linear-gradient(to bottom, #2563eb, #1d4ed8);
          color: #fff;
          box-shadow: 0 3px 0 #1e3a8a;
        }
        .ag-tab:hover:not(.active) { background: #e2e8f0; }

        .ag-create-btn {
          background: linear-gradient(to bottom, #22c55e, #16a34a);
          color: #fff; font-weight: 700; font-size: 13px;
          font-family: 'Rajdhani', sans-serif;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 10px 22px; border-radius: 10px; border: none;
          border-bottom: 3px solid #15803d; cursor: pointer;
          box-shadow: 0 4px 0 #15803d;
          transition: all 0.15s;
        }
        .ag-create-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 0 #15803d;
        }
        .ag-create-btn:active {
          transform: translateY(2px);
          border-bottom-width: 1px;
          box-shadow: 0 1px 0 #15803d;
        }

        /* ── MATCH CARD ── */
        .ag-match-list { display: flex; flex-direction: column; gap: 12px; }

        .ag-match-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 0 rgba(0,0,0,0.04);
          transition: all 0.2s;
        }
        .ag-match-card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.08); }
        .ag-match-card.live-card {
          border-color: rgba(34,197,94,0.3);
          box-shadow: 0 0 0 2px rgba(34,197,94,0.15), 0 4px 0 rgba(0,0,0,0.04);
        }

        .ag-card-top {
          height: 4px;
        }
        .ag-card-body {
          padding: 18px 20px;
          display: flex; align-items: center;
          gap: 16px; flex-wrap: wrap;
        }

        .ag-sport-icon {
          font-size: 32px;
          flex-shrink: 0;
        }

        .ag-match-info { flex: 1; min-width: 160px; }
        .ag-match-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 20px; font-weight: 700; color: #0f172a;
          line-height: 1;
        }
        .ag-match-sub {
          font-size: 11px; color: #64748b; margin-top: 4px;
        }
        .ag-match-ground {
          font-size: 11px; color: #94a3b8; margin-top: 2px;
        }

        .ag-score-display {
          display: flex; align-items: center; gap: 12px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 10px 18px;
        }
        .ag-score-team { text-align: center; }
        .ag-score-dept {
          font-size: 10px; font-weight: 700; color: #64748b;
          letter-spacing: 0.08em;
        }
        .ag-score-num {
          font-family: 'Rajdhani', sans-serif;
          font-size: 28px; font-weight: 700; color: #0f172a;
          line-height: 1;
        }
        .ag-score-sep { font-size: 18px; color: #cbd5e1; font-weight: 700; }

        .ag-status-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 12px; border-radius: 20px;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          flex-shrink: 0;
        }
        .ag-status-dot {
          width: 6px; height: 6px; border-radius: 50%;
        }
        .ag-status-dot.pulse {
          animation: blink 1s ease-in-out infinite;
        }

        /* ACTIONS */
        .ag-actions {
          display: flex; gap: 8px; flex-wrap: wrap;
          padding: 0 20px 16px;
        }
        .ag-btn {
          padding: 7px 16px;
          border-radius: 8px;
          font-size: 12px; font-weight: 600;
          cursor: pointer; border: none;
          font-family: 'Inter', sans-serif;
          transition: all 0.15s;
        }
        .ag-btn-score {
          background: linear-gradient(to bottom, #2563eb, #1d4ed8);
          color: #fff; border-bottom: 2px solid #1e3a8a;
          box-shadow: 0 3px 0 #1e3a8a;
        }
        .ag-btn-score:hover { transform: translateY(-1px); }
        .ag-btn-end {
          background: linear-gradient(to bottom, #22c55e, #16a34a);
          color: #fff; border-bottom: 2px solid #15803d;
          box-shadow: 0 3px 0 #15803d;
        }
        .ag-btn-end:hover { transform: translateY(-1px); }
        .ag-btn-cancel {
          background: #fff; color: #f59e0b;
          border: 1px solid #fde68a;
        }
        .ag-btn-cancel:hover { background: #fffbeb; }
        .ag-btn-delete {
          background: #fff; color: #ef4444;
          border: 1px solid #fecaca;
        }
        .ag-btn-delete:hover { background: #fef2f2; }

        /* ── EMPTY ── */
        .ag-empty {
          text-align: center; padding: 60px 20px;
          background: #fff; border-radius: 16px;
          border: 1px solid #e2e8f0;
        }
        .ag-empty-icon { font-size: 48px; display: block; margin-bottom: 12px; }
        .ag-empty h3 {
          font-family: 'Rajdhani', sans-serif;
          font-size: 22px; color: #0f172a; margin-bottom: 6px;
        }
        .ag-empty p { font-size: 13px; color: #94a3b8; }

        /* ── MODAL OVERLAY ── */
        .ag-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          z-index: 100;
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
        }

        /* ── CREATE FORM MODAL ── */
        .ag-modal {
          background: #fff;
          border-radius: 20px;
          width: 100%; max-width: 600px;
          max-height: 90vh; overflow-y: auto;
          box-shadow: 0 30px 80px rgba(0,0,0,0.3);
        }
        .ag-modal-accent {
          height: 4px;
          background: linear-gradient(90deg, #1d4ed8, #38bdf8, #1d4ed8);
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
          border-radius: 20px 20px 0 0;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .ag-modal-header {
          background: linear-gradient(to right, #0f172a, #1e293b);
          padding: 20px 24px;
          display: flex; align-items: center;
          justify-content: space-between;
        }
        .ag-modal-header h2 {
          font-family: 'Rajdhani', sans-serif;
          font-size: 22px; font-weight: 700; color: #f1f5f9;
          letter-spacing: 0.04em;
        }
        .ag-modal-header p { font-size: 11px; color: #64748b; margin-top: 2px; }
        .ag-modal-close {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.1);
          color: #94a3b8; font-size: 18px;
          width: 32px; height: 32px; border-radius: 8px;
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; transition: all 0.15s;
          flex-shrink: 0;
        }
        .ag-modal-close:hover { background: rgba(255,255,255,0.15); color: #fff; }

        .ag-modal-body { padding: 24px; display: flex; flex-direction: column; gap: 20px; }

        /* FORM ELEMENTS */
        .ag-label {
          display: block; font-size: 11px; font-weight: 600;
          color: #374151; letter-spacing: 0.08em;
          text-transform: uppercase; margin-bottom: 8px;
        }
        .ag-label span { color: #ef4444; }

        .ag-input, .ag-select {
          width: 100%; padding: 12px 16px;
          font-size: 14px; font-family: 'Inter', sans-serif;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-bottom: 3px solid #cbd5e1;
          border-radius: 10px; color: #0f172a;
          outline: none; transition: all 0.2s;
          box-shadow: 0 3px 0 rgba(0,0,0,0.06);
          -webkit-appearance: none; appearance: none;
        }
        .ag-input:focus, .ag-select:focus {
          background: #fff;
          border-color: #3b82f6;
          border-bottom-color: #1d4ed8;
          box-shadow: 0 3px 0 rgba(29,78,216,0.2), 0 0 0 3px rgba(59,130,246,0.1);
          transform: translateY(-1px);
        }
        .ag-select { cursor: pointer; }
        .ag-select option { background: #fff; color: #0f172a; }

        .ag-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media(max-width:500px){ .ag-grid-2 { grid-template-columns: 1fr; } }

        /* SPORT GRID IN FORM */
        .ag-sport-grid {
          display: grid; grid-template-columns: repeat(4,1fr); gap: 8px;
        }
        @media(max-width:500px){ .ag-sport-grid { grid-template-columns: repeat(2,1fr); } }

        .ag-sport-pick {
          border: 1px solid #e2e8f0; border-bottom: 3px solid #cbd5e1;
          border-radius: 10px; padding: 10px 6px;
          text-align: center; cursor: pointer;
          background: #f8fafc;
          box-shadow: 0 3px 0 rgba(0,0,0,0.06);
          transition: all 0.15s; user-select: none;
          font-size: 12px; color: #64748b; font-weight: 600;
        }
        .ag-sport-pick:hover { background: #eff6ff; border-color: #bfdbfe; transform: translateY(-1px); }
        .ag-sport-pick.active {
          background: linear-gradient(to bottom, #1d4ed8, #1e40af);
          border-color: #3b82f6; border-bottom-color: #1e3a8a;
          color: #fff;
          box-shadow: 0 3px 0 #1e3a8a, 0 6px 16px rgba(29,78,216,0.25);
          transform: translateY(-1px);
        }
        .ag-sport-pick-icon { font-size: 22px; display: block; margin-bottom: 4px; }

        /* TEAM GRID */
        .ag-team-grid {
          display: grid; grid-template-columns: repeat(5,1fr); gap: 8px;
        }
        .ag-team-pick {
          border: 1px solid #e2e8f0; border-bottom: 3px solid #cbd5e1;
          border-radius: 10px; padding: 10px 4px;
          text-align: center; cursor: pointer;
          background: #f8fafc; box-shadow: 0 3px 0 rgba(0,0,0,0.06);
          transition: all 0.15s; user-select: none;
          font-family: 'Rajdhani', sans-serif;
          font-size: 16px; font-weight: 700; color: #64748b;
        }
        .ag-team-pick:hover { background: #eff6ff; border-color: #bfdbfe; transform: translateY(-1px); }
        .ag-team-pick.active {
          background: linear-gradient(to bottom, #1d4ed8, #1e40af);
          color: #fff; border-color: #3b82f6; border-bottom-color: #1e3a8a;
          box-shadow: 0 3px 0 #1e3a8a;
          transform: translateY(-1px);
        }

        /* CAT GRID */
        .ag-cat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .ag-cat-pick {
          border: 1px solid #e2e8f0; border-bottom: 3px solid #cbd5e1;
          border-radius: 10px; padding: 14px 10px;
          text-align: center; cursor: pointer;
          background: #f8fafc; box-shadow: 0 3px 0 rgba(0,0,0,0.06);
          transition: all 0.15s; user-select: none;
          font-size: 13px; font-weight: 700; color: #64748b;
        }
        .ag-cat-pick:hover { background: #eff6ff; border-color: #bfdbfe; transform: translateY(-1px); }
        .ag-cat-pick.active {
          background: linear-gradient(to bottom, #1d4ed8, #1e40af);
          color: #fff; border-color: #3b82f6; border-bottom-color: #1e3a8a;
          box-shadow: 0 3px 0 #1e3a8a; transform: translateY(-1px);
        }

        /* SUBMIT */
        .ag-submit {
          width: 100%; padding: 14px;
          background: linear-gradient(to bottom, #2563eb, #1d4ed8);
          color: #fff; font-weight: 700; font-size: 15px;
          font-family: 'Rajdhani', sans-serif;
          letter-spacing: 0.14em; text-transform: uppercase;
          border: none; border-radius: 12px; cursor: pointer;
          border-bottom: 4px solid #1e3a8a;
          box-shadow: 0 6px 0 #1e3a8a;
          transition: all 0.15s;
        }
        .ag-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 0 #1e3a8a; }
        .ag-submit:active:not(:disabled) { transform: translateY(3px); border-bottom-width: 1px; box-shadow: 0 1px 0 #1e3a8a; }
        .ag-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        /* ── SCORE MODAL ── */
        .ag-score-modal {
          background: #fff; border-radius: 20px;
          width: 100%; max-width: 420px;
          box-shadow: 0 30px 80px rgba(0,0,0,0.3);
          overflow: hidden;
        }
        .ag-score-modal-header {
          background: linear-gradient(to right, #0f172a, #1e293b);
          padding: 20px 24px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .ag-score-modal-header h2 {
          font-family: 'Rajdhani', sans-serif;
          font-size: 20px; font-weight: 700; color: #f1f5f9;
        }
        .ag-score-inputs {
          display: flex; align-items: center; justify-content: center;
          gap: 16px; padding: 28px 24px;
        }
        .ag-score-inp-wrap { text-align: center; }
        .ag-score-inp-label {
          font-size: 11px; font-weight: 700; color: #64748b;
          letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px;
        }
        .ag-score-inp {
          width: 90px; text-align: center;
          font-family: 'Rajdhani', sans-serif;
          font-size: 36px; font-weight: 700; color: #0f172a;
          background: #f8fafc; border: 1px solid #e2e8f0;
          border-bottom: 3px solid #cbd5e1; border-radius: 12px;
          padding: 12px 8px; outline: none;
          box-shadow: 0 3px 0 rgba(0,0,0,0.06);
        }
        .ag-score-inp:focus {
          border-color: #3b82f6; border-bottom-color: #1d4ed8;
          box-shadow: 0 3px 0 rgba(29,78,216,0.2), 0 0 0 3px rgba(59,130,246,0.1);
        }
        .ag-score-vs { font-family: 'Rajdhani', sans-serif; font-size: 24px; color: #cbd5e1; font-weight: 700; }
        .ag-score-modal-actions { padding: 0 24px 24px; display: flex; gap: 10px; }

        /* ── TOAST ── */
        .ag-toast {
          position: fixed; bottom: 24px; right: 24px;
          padding: 14px 20px; border-radius: 12px;
          font-size: 13px; font-weight: 600;
          box-shadow: 0 8px 30px rgba(0,0,0,0.2);
          z-index: 999;
          display: flex; align-items: center; gap: 8px;
        }
        .ag-toast.success { background: #0f172a; color: #22c55e; border: 1px solid rgba(34,197,94,0.2); }
        .ag-toast.error   { background: #0f172a; color: #ef4444; border: 1px solid rgba(239,68,68,0.2); }

        /* SECTION TITLE */
        .ag-section-title {
          display: flex; align-items: center; gap: 8px;
          font-size: 10px; font-weight: 600; color: #64748b;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding-bottom: 10px;
          border-bottom: 2px solid #f1f5f9;
          margin-bottom: 14px;
        }
      `}</style>

      <div className="ag-page">

        {/* HERO */}
        <div className="ag-hero">
          <div className="ag-orb-1" />
          <div className="ag-orb-2" />
          <div className="ag-badge">
            <span className="ag-badge-dot" />
            Admin Panel · Match Management
          </div>
          <motion.h1 initial={{ opacity:0, y:-16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>
            Manage <span>Games</span>
          </motion.h1>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }}>
            Create matches, update live scores, and manage results for BZU Engineering Sports 2026
          </motion.p>
        </div>

        {/* BODY */}
        <div className="ag-body">
          <div className="ag-container">

            {/* STATS */}
            <motion.div className="ag-stats" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}>
              {[
                { num: stats.total,     label: "Total Matches", color: "#3b82f6" },
                { num: stats.live,      label: "Live Now",      color: "#22c55e" },
                { num: stats.upcoming,  label: "Upcoming",      color: "#f59e0b" },
                { num: stats.completed, label: "Completed",     color: "#64748b" },
              ].map((s, i) => (
                <motion.div key={i} className="ag-stat" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay: 0.1 + i * 0.07 }}>
                  <div className="ag-stat-num" style={{ color: s.color }}>{s.num}</div>
                  <div className="ag-stat-label">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* TOOLBAR */}
            <motion.div className="ag-toolbar" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }}>
              <div className="ag-tabs">
                {["all","live","upcoming","completed","cancelled"].map(t => (
                  <button key={t} className={`ag-tab${tab === t ? " active" : ""}`} onClick={() => setTab(t)}>
                    {t === "all" ? "All Matches" : t.charAt(0).toUpperCase() + t.slice(1)}
                    {t === "live" && stats.live > 0 && (
                      <span style={{ marginLeft:6, background:"#22c55e", color:"#fff", borderRadius:"10px", padding:"1px 7px", fontSize:10 }}>{stats.live}</span>
                    )}
                  </button>
                ))}
              </div>
              <button className="ag-create-btn" onClick={() => setShowForm(true)}>
                + Create Match
              </button>
            </motion.div>

            {/* MATCH LIST */}
            {loading ? (
              <div style={{ textAlign:"center", padding:"60px", color:"#94a3b8", fontSize:14 }}>
                Loading matches...
              </div>
            ) : filtered.length === 0 ? (
              <div className="ag-empty">
                <span className="ag-empty-icon">🏟️</span>
                <h3>No Matches Found</h3>
                <p>Create a new match using the button above</p>
              </div>
            ) : (
              <div className="ag-match-list">
                <AnimatePresence>
                  {filtered.map((match, i) => {
                    const sc = STATUS_CONFIG[match.status] || STATUS_CONFIG.upcoming;
                    return (
                      <motion.div
                        key={match._id}
                        className={`ag-match-card${match.status === "live" ? " live-card" : ""}`}
                        initial={{ opacity:0, y:16 }}
                        animate={{ opacity:1, y:0 }}
                        exit={{ opacity:0, scale:0.97 }}
                        transition={{ delay: i * 0.04 }}
                      >
                        <div className="ag-card-top" style={{ background: sc.color }} />
                        <div className="ag-card-body">
                          <span className="ag-sport-icon">{sportIcon(match.sport)}</span>

                          <div className="ag-match-info">
                            <div className="ag-match-title">
                              <span style={{ color: TEAM_COLORS[match.teamA] }}>{match.teamA}</span>
                              {" vs "}
                              <span style={{ color: TEAM_COLORS[match.teamB] }}>{match.teamB}</span>
                            </div>
                            <div className="ag-match-sub">{match.category} · {match.sport}</div>
                            <div className="ag-match-ground">📍 {match.ground}</div>
                            <div className="ag-match-ground">🕐 {formatDate(match.scheduledAt)}</div>
                          </div>

                          {/* Score */}
                          <div className="ag-score-display">
                            <div className="ag-score-team">
                              <div className="ag-score-dept">{match.teamA}</div>
                              <div className="ag-score-num" style={{ color: TEAM_COLORS[match.teamA] }}>{match.scoreA}</div>
                            </div>
                            <div className="ag-score-sep">—</div>
                            <div className="ag-score-team">
                              <div className="ag-score-dept">{match.teamB}</div>
                              <div className="ag-score-num" style={{ color: TEAM_COLORS[match.teamB] }}>{match.scoreB}</div>
                            </div>
                          </div>

                          {/* Status */}
                          <div className="ag-status-badge" style={{ color: sc.color, background: sc.bg }}>
                            <span className={`ag-status-dot${match.status === "live" ? " pulse" : ""}`} style={{ background: sc.dot }} />
                            {sc.label}
                          </div>

                          {/* Winner badge */}
                          {match.winner && (
                            <div style={{ fontSize:12, fontWeight:700, color:"#22c55e", background:"rgba(34,197,94,0.1)", padding:"4px 12px", borderRadius:20 }}>
                              🏆 {match.winner === "Draw" ? "Draw" : `${match.winner} Won`}
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="ag-actions">
                          {match.status === "live" && (
                            <>
                              <button className="ag-btn ag-btn-score" onClick={() => { setScoreModal(match); setScores({ scoreA: match.scoreA, scoreB: match.scoreB }); }}>
                                📊 Update Score
                              </button>
                              <button className="ag-btn ag-btn-end" onClick={() => handleEnd(match._id)}>
                                🏁 End Match
                              </button>
                            </>
                          )}
                          {match.status === "upcoming" && (
                            <button className="ag-btn ag-btn-cancel" onClick={() => handleCancel(match._id)}>
                              ⛔ Cancel
                            </button>
                          )}
                          {(match.status === "completed" || match.status === "cancelled") && (
                            <button className="ag-btn ag-btn-delete" onClick={() => handleDelete(match._id)}>
                              🗑️ Delete
                            </button>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── CREATE MATCH MODAL ── */}
      <AnimatePresence>
        {showForm && (
          <motion.div className="ag-overlay" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={(e) => { if (e.target.classList.contains("ag-overlay")) setShowForm(false); }}>
            <motion.div className="ag-modal" initial={{ opacity:0, scale:0.92, y:20 }} animate={{ opacity:1, scale:1, y:0 }} exit={{ opacity:0, scale:0.95 }}>
              <div className="ag-modal-accent" />
              <div className="ag-modal-header">
                <div>
                  <h2>Create New Match</h2>
                  <p>Fill in the details — ground will be set automatically</p>
                </div>
                <button className="ag-modal-close" onClick={() => setShowForm(false)}>✕</button>
              </div>

              <form onSubmit={handleCreate} className="ag-modal-body">

                {/* Sport */}
                <div>
                  <div className="ag-section-title">🎮 Sport</div>
                  <div className="ag-sport-grid">
                    {SPORTS.map(s => (
                      <div key={s.name} className={`ag-sport-pick${form.sport === s.name ? " active" : ""}`}
                        onClick={() => setForm(f => ({ ...f, sport: s.name }))}>
                        <span className="ag-sport-pick-icon">{s.icon}</span>
                        {s.name}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <div className="ag-section-title">🏷️ Category</div>
                  <div className="ag-cat-grid">
                    {["Men's","Women's"].map(c => (
                      <div key={c} className={`ag-cat-pick${form.category === c ? " active" : ""}`}
                        onClick={() => setForm(f => ({ ...f, category: c }))}>
                        {c === "Men's" ? "👨 Men's" : "👩 Women's"}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Teams */}
                <div className="ag-grid-2">
                  <div>
                    <div className="ag-section-title">🅰️ Team A</div>
                    <div className="ag-team-grid" style={{ gridTemplateColumns:"repeat(3,1fr)" }}>
                      {TEAMS.map(t => (
                        <div key={t} className={`ag-team-pick${form.teamA === t ? " active" : ""}`}
                          style={form.teamA === t ? {} : { color: TEAM_COLORS[t] }}
                          onClick={() => setForm(f => ({ ...f, teamA: t }))}>
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="ag-section-title">🅱️ Team B</div>
                    <div className="ag-team-grid" style={{ gridTemplateColumns:"repeat(3,1fr)" }}>
                      {TEAMS.map(t => (
                        <div key={t} className={`ag-team-pick${form.teamB === t ? " active" : ""}`}
                          style={form.teamB === t ? {} : { color: TEAM_COLORS[t] }}
                          onClick={() => setForm(f => ({ ...f, teamB: t }))}>
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Date & Time */}
                <div>
                  <label className="ag-label">Scheduled Date & Time <span>*</span></label>
                  <input type="datetime-local" className="ag-input"
                    value={form.scheduledAt}
                    onChange={e => setForm(f => ({ ...f, scheduledAt: e.target.value }))}
                    required
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="ag-label">Notes <span style={{ color:"#94a3b8", fontWeight:400 }}>(optional)</span></label>
                  <input type="text" className="ag-input" placeholder="e.g. Final match, knockout round..."
                    value={form.notes}
                    onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  />
                </div>

                <button type="submit" className="ag-submit" disabled={submitting}>
                  {submitting ? "Creating..." : "Create Match →"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SCORE MODAL ── */}
      <AnimatePresence>
        {scoreModal && (
          <motion.div className="ag-overlay" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={(e) => { if (e.target.classList.contains("ag-overlay")) setScoreModal(null); }}>
            <motion.div className="ag-score-modal" initial={{ opacity:0, scale:0.92 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.95 }}>
              <div className="ag-modal-accent" />
              <div className="ag-score-modal-header">
                <h2>📊 Update Score — {scoreModal.teamA} vs {scoreModal.teamB}</h2>
                <button className="ag-modal-close" onClick={() => setScoreModal(null)}>✕</button>
              </div>
              <div className="ag-score-inputs">
                <div className="ag-score-inp-wrap">
                  <div className="ag-score-inp-label" style={{ color: TEAM_COLORS[scoreModal.teamA] }}>{scoreModal.teamA}</div>
                  <input type="number" min="0" className="ag-score-inp"
                    value={scores.scoreA}
                    onChange={e => setScores(s => ({ ...s, scoreA: Number(e.target.value) }))}
                  />
                </div>
                <div className="ag-score-vs">VS</div>
                <div className="ag-score-inp-wrap">
                  <div className="ag-score-inp-label" style={{ color: TEAM_COLORS[scoreModal.teamB] }}>{scoreModal.teamB}</div>
                  <input type="number" min="0" className="ag-score-inp"
                    value={scores.scoreB}
                    onChange={e => setScores(s => ({ ...s, scoreB: Number(e.target.value) }))}
                  />
                </div>
              </div>
              <div className="ag-score-modal-actions">
                <button className="ag-submit" style={{ flex:1 }} onClick={handleUpdateScore} disabled={submitting}>
                  {submitting ? "Saving..." : "Save Score →"}
                </button>
                <button className="ag-btn ag-btn-delete" style={{ padding:"12px 20px" }} onClick={() => setScoreModal(null)}>
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── TOAST ── */}
      <AnimatePresence>
        {toast && (
          <motion.div className={`ag-toast ${toast.type}`}
            initial={{ opacity:0, y:20, scale:0.95 }}
            animate={{ opacity:1, y:0, scale:1 }}
            exit={{ opacity:0, y:10 }}>
            {toast.type === "success" ? "✅" : "❌"} {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
