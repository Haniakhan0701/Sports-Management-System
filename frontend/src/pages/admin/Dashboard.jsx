// src/pages/admin/Dashboard.jsx
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import 'boxicons/css/boxicons.min.css';

const API = "http://localhost:5000/api";

const SPORT_ICONS = {
  Cricket: "🏏", Football: "⚽", Badminton: "🏸",
  "Tug of War": "🪢", "Dodge Ball": "🎯",
  "100m Race": "🏃", "4×100m Relay": "🏅",
  "Bottle Spin Chase": "🍾",
};

const DEPT_COLORS = {
  CE:  "bg-blue-100 text-blue-700",
  ME:  "bg-amber-100 text-amber-700",
  EE:  "bg-emerald-100 text-emerald-700",
  CVE: "bg-slate-100 text-slate-700",
  AR:  "bg-rose-100 text-rose-700",
};

const DEPT_FULL = {
  CE: "Computer Eng", ME: "Mechanical Eng",
  EE: "Electrical Eng", CVE: "Civil Eng", AR: "Architecture",
};

const calcStandings = (matches) => {
  const pts = { CE: 0, ME: 0, EE: 0, CVE: 0, AR: 0 };
  matches.filter(m => m.status === "completed" && m.winner && m.winner !== "Draw")
    .forEach(m => { if (pts[m.winner] !== undefined) pts[m.winner] += 3; });
  return Object.entries(pts)
    .map(([dept, points]) => ({ dept, points, full: DEPT_FULL[dept] }))
    .sort((a, b) => b.points - a.points)
    .map((d, i) => ({ ...d, rank: i + 1 }));
};

const formatDate = (d) => {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-PK", { day: "numeric", month: "short" });
};

const Dashboard = () => {
  const [matches, setMatches]           = useState([]);
  const [athletes, setAthletes]         = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading]           = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [matchRes, athRes, annRes] = await Promise.all([
          axios.get(`${API}/matches`),
          axios.get(`${API}/athletes`),
          axios.get(`${API}/announcements`),
        ]);
        setMatches(matchRes.data.matches || []);
        setAthletes(athRes.data.athletes || athRes.data || []);
        setAnnouncements((annRes.data.announcements || []).slice(0, 4));
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
    const interval = setInterval(fetchAll, 30000);
    return () => clearInterval(interval);
  }, []);

  // Computed stats
  const totalMatches  = matches.length;
  const liveNow       = matches.filter(m => m.status === "live").length;
  const completed     = matches.filter(m => m.status === "completed").length;
  const upcoming      = matches.filter(m => m.status === "upcoming").length;
  const totalAthletes = Array.isArray(athletes) ? athletes.length : 0;
  const completedPct  = totalMatches > 0 ? Math.round((completed / totalMatches) * 100) : 0;

  // Next upcoming match time
  const nextMatch = matches
    .filter(m => m.status === "upcoming")
    .sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt))[0];
  const nextMatchTime = nextMatch
    ? new Date(nextMatch.scheduledAt).toLocaleTimeString("en-PK", { hour: "2-digit", minute: "2-digit" })
    : "—";

  const stats = [
    { label: "Total Matches",       value: totalMatches,  icon: "bx-football",      color: "bg-blue-500",   change: liveNow > 0 ? `${liveNow} live now` : "No live matches" },
    { label: "Completed",           value: completed,     icon: "bx-check-circle",  color: "bg-green-500",  change: `${completedPct}% done` },
    { label: "Live Now",            value: liveNow,       icon: "bx-radio-circle",  color: "bg-red-500",    change: liveNow > 0 ? "🔴 Matches live!" : "No live matches" },
    { label: "Upcoming",            value: upcoming,      icon: "bx-time",          color: "bg-orange-500", change: nextMatch ? `Next: ${nextMatchTime}` : "None scheduled" },
    { label: "Registered Athletes", value: totalAthletes, icon: "bx-group",         color: "bg-purple-500", change: "Total registered" },
    { label: "Announcements",       value: announcements.length, icon: "bx-bell",   color: "bg-pink-500",   change: "Latest updates" },
  ];

  const standings = calcStandings(matches);

  // Recent matches — last 4 (completed + live + upcoming)
  const recentMatches = [...matches]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 4);

  const quickActions = [
    { label: "Manage Games",      icon: "bx-edit-alt",   path: "/admin/games",   color: "bg-blue-600 hover:bg-blue-700" },
    { label: "New Announcement",  icon: "bx-bell-plus",  path: "/announcements", color: "bg-orange-500 hover:bg-orange-600" },
    { label: "Media Upload",      icon: "bx-image-add",  path: "/media",         color: "bg-purple-600 hover:bg-purple-700" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-gray-400 text-sm font-medium tracking-wide">ADMIN PANEL</p>
              <h1 className="text-3xl font-black mt-1">Dashboard</h1>
              <p className="text-gray-400 text-sm mt-1">BZU Engineering Sports · 2026</p>
            </div>
            <div className="flex gap-3 flex-wrap">
              {quickActions.map((a, i) => (
                <Link key={i} to={a.path}>
                  <button className={`${a.color} text-white text-xs font-bold px-4 py-2 rounded-lg transition flex items-center gap-2`}>
                    <i className={`bx ${a.icon}`}></i>
                    <span className="hidden sm:inline">{a.label}</span>
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {stats.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay: i * 0.08 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className={`w-10 h-10 ${s.color} rounded-lg flex items-center justify-center mb-3`}>
                <i className={`bx ${s.icon} text-white text-xl`}></i>
              </div>
              <div className="text-2xl font-black text-gray-900">
                {loading ? "—" : s.value}
              </div>
              <div className="text-xs font-semibold text-gray-600 mt-0.5">{s.label}</div>
              <div className={`text-xs mt-1 ${s.label === "Live Now" && liveNow > 0 ? "text-red-500 font-semibold" : "text-gray-400"}`}>
                {s.change}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Recent Matches */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-black text-gray-900">Recent & Upcoming Matches</h2>
              <Link to="/admin/games" className="text-blue-600 text-sm font-medium hover:underline">Manage →</Link>
            </div>
            {loading ? (
              <div className="p-8 text-center text-gray-400 text-sm">Loading matches...</div>
            ) : recentMatches.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-sm">
                <i className='bx bx-football text-4xl block mb-2'></i>
                No matches yet — create one from Manage Games.
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {recentMatches.map((m, i) => (
                  <div key={m._id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition">
                    <span className="text-2xl">{SPORT_ICONS[m.sport] || "🏆"}</span>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 text-sm">{m.teamA} vs {m.teamB}</p>
                      <p className="text-xs text-gray-500">{m.category} · {m.sport}</p>
                    </div>
                    <div className="text-right">
                      {m.status === "completed" ? (
                        <p className="text-xs font-semibold text-gray-700">
                          {m.winner === "Draw" ? "Draw" : `${m.winner} Won`} · {m.scoreA}–{m.scoreB}
                        </p>
                      ) : m.status === "live" ? (
                        <p className="text-xs font-semibold text-red-600 animate-pulse">
                          🔴 LIVE · {m.scoreA}–{m.scoreB}
                        </p>
                      ) : (
                        <p className="text-xs font-semibold text-gray-500">Upcoming</p>
                      )}
                      <p className="text-xs text-gray-400">{formatDate(m.scheduledAt)}</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      m.status === "completed" ? "bg-green-100 text-green-700" :
                      m.status === "live"      ? "bg-red-100 text-red-700" :
                      m.status === "cancelled" ? "bg-gray-100 text-gray-500" :
                      "bg-orange-100 text-orange-700"
                    }`}>
                      {m.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
            <div className="p-4 border-t border-gray-100">
              <Link to="/schedule" className="text-blue-600 text-sm font-medium hover:underline">
                View full schedule →
              </Link>
            </div>
          </div>

          {/* Standings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-black text-gray-900">Standings</h2>
              <Link to="/standings" className="text-blue-600 text-sm font-medium hover:underline">View →</Link>
            </div>
            <div className="p-4 space-y-3">
              {loading ? (
                <div className="text-gray-400 text-sm text-center py-4">Loading...</div>
              ) : standings.every(s => s.points === 0) ? (
                <div className="text-gray-400 text-sm text-center py-4">
                  <i className='bx bx-trophy text-3xl block mb-2'></i>
                  No results yet.
                </div>
              ) : (
                standings.map((s, i) => (
                  <div key={s.dept} className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                      i === 0 ? "bg-amber-400 text-white" :
                      i === 1 ? "bg-gray-300 text-gray-700" :
                      i === 2 ? "bg-orange-400 text-white" :
                      "bg-gray-100 text-gray-600"
                    }`}>{s.rank}</span>
                    <span className={`text-sm font-black px-2 py-0.5 rounded ${DEPT_COLORS[s.dept]}`}>{s.dept}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: standings[0]?.points > 0 ? `${(s.points / standings[0].points) * 100}%` : "0%" }} />
                    </div>
                    <span className="text-sm font-bold text-gray-700">{s.points}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Announcements */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-gray-900">Latest Announcements</h2>
            <Link to="/announcements" className="text-blue-600 text-sm font-medium hover:underline">View all →</Link>
          </div>
          {loading ? (
            <div className="text-gray-400 text-sm">Loading...</div>
          ) : announcements.length === 0 ? (
            <div className="text-gray-400 text-sm text-center py-4">
              <i className='bx bx-bell-off text-3xl block mb-2'></i>
              No announcements yet.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-3">
              {announcements.map((a) => (
                <div key={a._id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded shrink-0 mt-0.5 ${
                    a.type === "IMPORTANT" ? "bg-red-100 text-red-700" :
                    a.type === "MATCH"     ? "bg-green-100 text-green-700" :
                    "bg-blue-100 text-blue-700"
                  }`}>{a.type}</span>
                  <p className="text-sm text-gray-700">{a.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
