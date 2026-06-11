// src/pages/Schedule.jsx
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import 'boxicons/css/boxicons.min.css';

const API = `${import.meta.env.VITE_API_URL}/api`;

const SPORT_ICONS = {
  Cricket: "🏏", Football: "⚽", Badminton: "🏸",
  "Tug of War": "🪢", "Dodge Ball": "🎯",
  "100m Race": "🏃", "4×100m Relay": "🏅",
  "Bottle Spin Chase": "🍾", Volleyball: "🏐",
  Basketball: "🏀",
};

const DEPT_COLORS = {
  CE:  "bg-blue-100 text-blue-700",
  ME:  "bg-amber-100 text-amber-700",
  EE:  "bg-emerald-100 text-emerald-700",
  CVE: "bg-slate-100 text-slate-700",
  AR:  "bg-rose-100 text-rose-700",
};

// ── Fixed official PDF schedules (static, not from backend) ──
const OFFICIAL_PDFS = [
  {
    id: 1,

    title: "Sports Week 2026 - Complete Schedule",

    month: "February 2026-2027",
    size: "2.4 MB",
    file: "/pdfs/my1.pdf",
    isNew: true,
  },
  {
    id: 2,
    title: "January 2026 -Department of CE Schedule",
    month: "January 2026-2027",
    size: "1.8 MB",
    file: "/pdfs/my2.pdf",
    isNew: false,
  },
  {
    id: 3,
    title: "Department of CE (Girls' Schedule)",
    month: "December 2022-2026",
    size: "2.1 MB",
    file: "/pdfs/my3.pdf",
    isNew: false,
  },
];

const STATUS_STYLES = {
  completed: "bg-green-100 text-green-700",
  live:      "bg-red-100 text-red-700",
  upcoming:  "bg-orange-100 text-orange-700",
  cancelled: "bg-gray-100 text-gray-500",
};

const formatDate = (d) => {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-PK", { weekday: "short", day: "numeric", month: "short" });
};

const formatTime = (d) => {
  if (!d) return "—";
  return new Date(d).toLocaleTimeString("en-PK", { hour: "2-digit", minute: "2-digit" });
};

const Schedule = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSport, setFilterSport] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API}/matches`);
        setMatches(res.data.matches || []);
      } catch (err) {
        console.error("Schedule fetch error:", err);
        setError("Failed to load schedule. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
    const interval = setInterval(fetchMatches, 30000);
    return () => clearInterval(interval);
  }, []);

  const sports     = ["all", ...new Set(matches.map(m => m.sport).filter(Boolean))];
  const categories = ["all", ...new Set(matches.map(m => m.category).filter(Boolean))];

  const filtered = matches.filter(m => {
    if (filterStatus !== "all" && m.status !== filterStatus) return false;
    if (filterSport !== "all" && m.sport !== filterSport) return false;
    if (filterCategory !== "all" && m.category !== filterCategory) return false;
    return true;
  }).sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt));

  const liveMatches     = filtered.filter(m => m.status === "live");
  const upcomingMatches = filtered.filter(m => m.status === "upcoming");
  const completedMatches = filtered.filter(m => m.status === "completed");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }}>
            <span className="inline-block border border-white/30 bg-white/10 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
              CURRENT SEASON 2026-2027
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Match Schedule</h1>
            <p className="text-gray-300 max-w-xl mx-auto">
              Live match schedule — auto-updates every 30 seconds. Official PDFs available below.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">

        {/* ── Official PDF Schedules (FIXED) ── */}
        <div className="mb-10">
          <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
            <i className='bx bx-file-pdf text-red-500 text-2xl'></i>
            OFFICIAL SCHEDULES
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {OFFICIAL_PDFS.map((pdf) => (
              <motion.div key={pdf.id} whileHover={{ y:-2 }}
                className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                    <i className='bx bxs-file-pdf text-red-500 text-2xl'></i>
                  </div>
                  {pdf.isNew && (
                    <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">NEW</span>
                  )}
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{pdf.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{pdf.month}</p>
                  <p className="text-xs text-gray-400">{pdf.size}</p>
                </div>
                <a href={pdf.file} target="_blank" rel="noopener noreferrer"
                  className="mt-auto flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition w-fit">
                  <i className='bx bx-link-external'></i>
                  Open PDF
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Live Match Schedule from Backend ── */}
        <div>
          <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
            <i className='bx bx-calendar text-blue-600 text-2xl'></i>
            LIVE MATCH SCHEDULE
          </h2>

          {/* Filters */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6">
            <div className="flex flex-wrap gap-3">
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:ring-2 focus:ring-blue-500"
                value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                <option value="all">All Status</option>
                <option value="live">Live</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:ring-2 focus:ring-blue-500"
                value={filterSport} onChange={e => setFilterSport(e.target.value)}>
                <option value="all">All Sports</option>
                {sports.filter(s => s !== "all").map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:ring-2 focus:ring-blue-500"
                value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
                <option value="all">All Categories</option>
                {categories.filter(c => c !== "all").map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              {(filterStatus !== "all" || filterSport !== "all" || filterCategory !== "all") && (
                <button onClick={() => { setFilterStatus("all"); setFilterSport("all"); setFilterCategory("all"); }}
                  className="text-red-600 text-sm flex items-center gap-1 bg-red-50 px-3 py-2 rounded-lg font-medium">
                  <i className='bx bx-reset'></i> Clear
                </button>
              )}
              <span className="ml-auto text-sm text-gray-400 flex items-center gap-1">
                <i className='bx bx-refresh'></i> Auto-refreshing
              </span>
            </div>
          </div>

          {loading ? (
            <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
              <i className='bx bx-loader-alt bx-spin text-4xl text-blue-500 block mb-3'></i>
              <p className="text-gray-500">Loading schedule...</p>
            </div>
          ) : error ? (
            <div className="bg-white rounded-xl p-12 text-center border border-red-200">
              <i className='bx bx-error-circle text-4xl text-red-400 block mb-3'></i>
              <p className="text-red-600">{error}</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
              <i className='bx bx-calendar-x text-4xl text-gray-300 block mb-3'></i>
              <p className="text-gray-500">No matches found for selected filters.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Live */}
              {liveMatches.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    <h3 className="font-bold text-red-600 text-sm">LIVE NOW</h3>
                  </div>
                  <div className="space-y-3">
                    {liveMatches.map(m => <MatchCard key={m._id} match={m} />)}
                  </div>
                </div>
              )}

              {/* Upcoming */}
              {upcomingMatches.length > 0 && (
                <div>
                  <h3 className="font-bold text-gray-700 text-sm mb-3 flex items-center gap-2">
                    <i className='bx bx-time text-orange-500'></i> UPCOMING
                  </h3>
                  <div className="space-y-3">
                    {upcomingMatches.map(m => <MatchCard key={m._id} match={m} />)}
                  </div>
                </div>
              )}

              {/* Completed */}
              {completedMatches.length > 0 && (
                <div>
                  <h3 className="font-bold text-gray-700 text-sm mb-3 flex items-center gap-2">
                    <i className='bx bx-check-circle text-green-500'></i> COMPLETED
                  </h3>
                  <div className="space-y-3">
                    {completedMatches.map(m => <MatchCard key={m._id} match={m} />)}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MatchCard = ({ match: m }) => (
  <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
    className={`bg-white rounded-xl border shadow-sm p-4 flex items-center gap-4 ${
      m.status === "live" ? "border-red-300 bg-red-50/30" : "border-gray-200"
    }`}>
    <span className="text-3xl">{SPORT_ICONS[m.sport] || "🏆"}</span>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 flex-wrap">
        <p className="font-bold text-gray-900">{m.teamA} vs {m.teamB}</p>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${STATUS_STYLES[m.status] || "bg-gray-100 text-gray-600"}`}>
          {m.status === "live" ? "🔴 LIVE" : m.status}
        </span>
      </div>
      <p className="text-xs text-gray-500 mt-0.5">{m.sport} · {m.category}</p>
    </div>
    <div className="text-right shrink-0">
      {(m.status === "live" || m.status === "completed") ? (
        <p className={`text-lg font-black ${m.status === "live" ? "text-red-600 animate-pulse" : "text-gray-800"}`}>
          {m.scoreA} — {m.scoreB}
        </p>
      ) : null}
      {m.status === "completed" && m.winner && (
        <p className="text-xs text-green-600 font-semibold">
          {m.winner === "Draw" ? "Draw" : `${m.winner} Won`}
        </p>
      )}
      <p className="text-xs text-gray-400">{formatDate(m.scheduledAt)} · {formatTime(m.scheduledAt)}</p>
    </div>
    {m.dept && (
      <span className={`text-xs font-bold px-2 py-1 rounded ${DEPT_COLORS[m.teamA] || "bg-gray-100 text-gray-600"}`}>
        {m.teamA}
      </span>
    )}
  </motion.div>
);

export default Schedule;
