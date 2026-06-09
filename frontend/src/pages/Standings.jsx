// src/pages/Standings.jsx
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import 'boxicons/css/boxicons.min.css';

const API = `${import.meta.env.VITE_API_URL}`;

const deptColors = {
    CE:  { bg: 'bg-blue-50',    text: 'text-blue-600',    border: 'border-blue-200' },
    ME:  { bg: 'bg-amber-50',   text: 'text-amber-600',   border: 'border-amber-200' },
    EE:  { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200' },
    CVE: { bg: 'bg-slate-50',   text: 'text-slate-600',   border: 'border-slate-200' },
    AR:  { bg: 'bg-rose-50',    text: 'text-rose-600',    border: 'border-rose-200' },
};

const deptFullNames = {
    CE: 'Computer Engineering', ME: 'Mechanical Engineering',
    EE: 'Electrical Engineering', CVE: 'Civil Engineering', AR: 'Architecture',
};

const sportIcons = {
    Cricket: "🏏", Football: "⚽", Basketball: "🏀",
    Volleyball: "🏐", Badminton: "🏸",
    "100m Race": "🏃", "4×100m Relay": "🏃",
    "Tug of War": "🪢", "Dodge Ball": "🎯",
    "Bottle Spin Chase": "🍾",
};

const DEPTS = ["CE", "ME", "EE", "CVE", "AR"];

// Calculate standings from completed matches
const calculateStandings = (matches) => {
    const table = {};
    DEPTS.forEach(d => {
        table[d] = { dept: d, played: 0, wins: 0, losses: 0, draws: 0, points: 0, gold: 0, recentResults: [] };
    });

    const completed = matches.filter(m => m.status === "completed");

    completed.forEach(m => {
        const a = m.teamA, b = m.teamB;
        if (!table[a] || !table[b]) return;

        table[a].played++;
        table[b].played++;

        if (m.winner === a) {
            table[a].wins++;   table[a].points += 10; table[a].gold++;
            table[b].losses++; table[b].recentResults.unshift("L");
            table[a].recentResults.unshift("W");
        } else if (m.winner === b) {
            table[b].wins++;   table[b].points += 10; table[b].gold++;
            table[a].losses++; table[a].recentResults.unshift("L");
            table[b].recentResults.unshift("W");
        } else if (m.winner === "Draw") {
            table[a].draws++; table[a].points += 3; table[a].recentResults.unshift("D");
            table[b].draws++; table[b].points += 3; table[b].recentResults.unshift("D");
        }
    });

    return Object.values(table)
        .map(d => ({ ...d, recentResults: d.recentResults.slice(0, 5) }))
        .sort((a, b) => b.points - a.points || b.wins - a.wins);
};

const Standings = () => {
    const [standings, setStandings] = useState([]);
    const [recentMatches, setRecentMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [selectedSport, setSelectedSport] = useState("all");

    const sports = ["Cricket","Football","Basketball","Volleyball","Badminton","Athletics","Tug of War","Dodge Ball"];

    useEffect(() => { fetchData(); }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get(`${API}/api/matches`);
            const all = res.data.matches || res.data || [];
            setStandings(calculateStandings(all));
            setRecentMatches(all.filter(m => m.status === "completed").slice(-4).reverse());
            setLastUpdated(new Date());
        } catch (err) {
            console.error("Standings fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    // Filter by sport
    const filteredStandings = selectedSport === "all"
        ? standings
        : (() => {
            const table = {};
            DEPTS.forEach(d => { table[d] = { dept: d, played: 0, wins: 0, losses: 0, points: 0 }; });
            // re-calc for specific sport only — use recentMatches filter
            return standings; // fallback to overall for now
        })();

    const getFormBadge = (r) =>
        r === "W" ? "bg-green-100 text-green-700" :
        r === "L" ? "bg-red-100 text-red-700" :
        "bg-gray-100 text-gray-600";

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Hero */}
            <section className="relative bg-gradient-to-r from-amber-800 to-yellow-900 text-white pt-20 pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="inline-block border border-white/30 bg-white/10 px-4 py-1.5 rounded-full text-sm font-medium tracking-wide mb-5">
                            🏆 SEASON 2025-26
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">Championship<br />Standings</h1>
                        <p className="text-gray-200 max-w-xl mx-auto">
                            Points calculated automatically from completed matches. Updated in real-time.
                        </p>
                        {lastUpdated && (
                            <p className="text-xs text-amber-200 mt-3">
                                Last updated: {lastUpdated.toLocaleTimeString("en-PK", { hour: "2-digit", minute: "2-digit" })}
                            </p>
                        )}
                    </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400"></div>
            </section>

            {/* Filter Bar */}
            <section className="py-3 bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
                <div className="container mx-auto px-4 flex flex-wrap gap-3 items-center">
                    <span className="text-sm font-semibold text-gray-600 flex items-center gap-1">
                        <i className='bx bx-filter-alt'></i> Filter:
                    </span>
                    <select
                        value={selectedSport}
                        onChange={e => setSelectedSport(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                        <option value="all">All Sports (Overall)</option>
                        {sports.map(s => (
                            <option key={s} value={s}>{sportIcons[s]} {s}</option>
                        ))}
                    </select>
                    <button
                        onClick={fetchData}
                        className="ml-auto text-xs text-amber-600 border border-amber-200 px-3 py-2 rounded-lg hover:bg-amber-50 flex items-center gap-1"
                    >
                        <i className='bx bx-refresh'></i> Refresh
                    </button>
                </div>
            </section>

            {/* Main Table */}
            <section className="py-8">
                <div className="container mx-auto px-4">
                    {loading ? (
                        <div className="text-center py-16">
                            <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                            <p className="text-gray-500">Calculating standings from match results...</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            {/* Table Header */}
                            <div className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white p-6 flex items-center justify-between">
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <i className='bx bx-trophy'></i>
                                    Overall Championship Standings
                                </h2>
                                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                                    {standings.reduce((s, d) => s + d.played, 0) / 2 | 0} Matches Played
                                </span>
                            </div>

                            {standings.length === 0 ? (
                                <div className="text-center py-16">
                                    <span className="text-5xl">🏟️</span>
                                    <p className="text-gray-500 mt-4 font-medium">No completed matches yet</p>
                                    <p className="text-gray-400 text-sm mt-1">Standings will appear after matches are completed</p>
                                    <Link to="/admin/games">
                                        <button className="mt-4 bg-amber-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-amber-700">
                                            Go to Admin → Complete a Match
                                        </button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 border-b">
                                            <tr>
                                                <th className="px-5 py-4 text-left text-xs font-bold text-gray-500 uppercase">Rank</th>
                                                <th className="px-5 py-4 text-left text-xs font-bold text-gray-500 uppercase">Department</th>
                                                <th className="px-5 py-4 text-center text-xs font-bold text-gray-500 uppercase">P</th>
                                                <th className="px-5 py-4 text-center text-xs font-bold text-gray-500 uppercase">W</th>
                                                <th className="px-5 py-4 text-center text-xs font-bold text-gray-500 uppercase">L</th>
                                                <th className="px-5 py-4 text-center text-xs font-bold text-gray-500 uppercase">D</th>
                                                <th className="px-5 py-4 text-center text-xs font-bold text-gray-500 uppercase">🥇</th>
                                                <th className="px-5 py-4 text-center text-xs font-bold text-gray-500 uppercase">Pts</th>
                                                <th className="px-5 py-4 text-center text-xs font-bold text-gray-500 uppercase">Form</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {filteredStandings.map((dept, i) => (
                                                <motion.tr
                                                    key={dept.dept}
                                                    initial={{ opacity: 0, x: -16 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.08 }}
                                                    className={`hover:bg-gray-50 transition ${i === 0 ? "bg-amber-50/40" : ""}`}
                                                >
                                                    {/* Rank */}
                                                    <td className="px-5 py-4">
                                                        <span className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-sm ${
                                                            i === 0 ? "bg-amber-400 text-white" :
                                                            i === 1 ? "bg-gray-300 text-gray-700" :
                                                            i === 2 ? "bg-amber-700 text-white" :
                                                            "bg-gray-100 text-gray-600"
                                                        }`}>
                                                            {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
                                                        </span>
                                                    </td>

                                                    {/* Department */}
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-10 h-10 rounded-lg ${deptColors[dept.dept]?.bg} flex items-center justify-center font-black ${deptColors[dept.dept]?.text}`}>
                                                                {dept.dept}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-gray-900 text-sm">{deptFullNames[dept.dept]}</p>
                                                                {i === 0 && dept.played > 0 && (
                                                                    <p className="text-xs text-amber-600 font-medium flex items-center gap-1">
                                                                        <i className='bx bx-crown'></i> Leading
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-5 py-4 text-center font-medium text-gray-700">{dept.played}</td>
                                                    <td className="px-5 py-4 text-center font-bold text-green-600">{dept.wins}</td>
                                                    <td className="px-5 py-4 text-center font-medium text-red-500">{dept.losses}</td>
                                                    <td className="px-5 py-4 text-center font-medium text-gray-500">{dept.draws}</td>
                                                    <td className="px-5 py-4 text-center">
                                                        <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-sm font-bold">{dept.gold}</span>
                                                    </td>
                                                    <td className="px-5 py-4 text-center">
                                                        <span className="text-2xl font-black text-gray-900">{dept.points}</span>
                                                    </td>

                                                    {/* Form */}
                                                    <td className="px-5 py-4">
                                                        <div className="flex justify-center gap-1">
                                                            {dept.recentResults.length === 0 ? (
                                                                <span className="text-xs text-gray-300">—</span>
                                                            ) : (
                                                                dept.recentResults.map((r, j) => (
                                                                    <span key={j} className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold ${getFormBadge(r)}`}>
                                                                        {r}
                                                                    </span>
                                                                ))
                                                            )}
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* Points System */}
                            <div className="bg-gray-50 p-5 border-t flex flex-wrap gap-6 text-sm text-gray-500">
                                <span className="flex items-center gap-2"><span className="w-3 h-3 bg-green-400 rounded-full"></span> Win = 10 pts</span>
                                <span className="flex items-center gap-2"><span className="w-3 h-3 bg-gray-400 rounded-full"></span> Draw = 3 pts</span>
                                <span className="flex items-center gap-2"><span className="w-3 h-3 bg-red-400 rounded-full"></span> Loss = 0 pts</span>
                                <span className="ml-auto flex items-center gap-1"><i className='bx bx-info-circle'></i> Auto-calculated from match results</span>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Recent Results — Real */}
            <section className="py-8 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-3 mb-6">
                        <i className='bx bx-line-chart text-2xl text-gray-600'></i>
                        <h2 className="text-2xl font-bold text-gray-800">Recent Results</h2>
                        <div className="h-px flex-1 bg-gray-200"></div>
                    </div>

                    {recentMatches.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                            <i className='bx bx-calendar-x text-4xl'></i>
                            <p className="mt-2 text-sm">No completed matches yet</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-4">
                            {recentMatches.map((m) => (
                                <motion.div
                                    key={m._id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-gray-50 rounded-lg p-4 border-l-4 border-green-500 hover:shadow-md transition"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-gray-500">
                                            {new Date(m.scheduledAt).toLocaleDateString("en-PK", { day: "numeric", month: "short" })}
                                        </span>
                                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                                            {sportIcons[m.sport]} {m.sport} · {m.category}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <span className={`font-black text-lg ${deptColors[m.teamA]?.text}`}>{m.teamA}</span>
                                            <span className="text-gray-300 text-sm">vs</span>
                                            <span className={`font-black text-lg ${deptColors[m.teamB]?.text}`}>{m.teamB}</span>
                                            <span className="text-sm font-bold text-gray-700 bg-white px-3 py-1 rounded-full border border-gray-200">
                                                {m.scoreA} — {m.scoreB}
                                            </span>
                                        </div>
                                        {m.winner && m.winner !== "Draw" && (
                                            <span className="text-xs text-amber-600 font-bold">+10 → {m.winner}</span>
                                        )}
                                    </div>
                                    {m.notes && <p className="text-xs text-gray-400 mt-2">{m.notes}</p>}
                                </motion.div>
                            ))}
                        </div>
                    )}

                    <Link to="/schedule">
                        <button className="mt-4 text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1 text-sm">
                            VIEW FULL SCHEDULE <i className='bx bx-right-arrow-alt'></i>
                        </button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <section className="py-4 bg-slate-900 text-white text-center text-sm">
                <p>🏆 STANDINGS AUTO-CALCULATED FROM MATCH RESULTS · SEASON 2025-26 · 5 DEPARTMENTS</p>
            </section>
        </div>
    );
};

export default Standings;
