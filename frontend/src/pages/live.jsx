// src/pages/live.jsx
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import 'boxicons/css/boxicons.min.css';

const API = "http://localhost:5000";

const sportIcons = {
    Cricket: "🏏", Football: "⚽", Basketball: "🏀",
    Volleyball: "🏐", Badminton: "🏸",
    "100m Race": "🏃", "4×100m Relay": "🏃",
    "Tug of War": "🪢", "Dodge Ball": "🎯",
    "Bottle Spin Chase": "🍾",
};

const Live = () => {
    const [liveMatches, setLiveMatches] = useState([]);
    const [mensUpcoming, setMensUpcoming] = useState([]);
    const [womensUpcoming, setWomensUpcoming] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(null);

    useEffect(() => {
        fetchMatches();
        const interval = setInterval(fetchMatches, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchMatches = async () => {
        try {
            const res = await axios.get(`${API}/api/matches`);
            const all = res.data.matches || res.data || [];

            setLiveMatches(all.filter(m => m.status === "live"));
            setMensUpcoming(all.filter(m => m.status === "upcoming" && m.category === "Men's"));
            setWomensUpcoming(all.filter(m => m.status === "upcoming" && m.category === "Women's"));
            setLastUpdated(new Date());
        } catch (err) {
            console.error("Live fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (dateStr) => {
        const d = new Date(dateStr);
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

        if (d.toDateString() === today.toDateString())
            return `Today ${d.toLocaleTimeString("en-PK", { hour: "2-digit", minute: "2-digit" })}`;
        if (d.toDateString() === tomorrow.toDateString())
            return `Tomorrow ${d.toLocaleTimeString("en-PK", { hour: "2-digit", minute: "2-digit" })}`;
        return d.toLocaleDateString("en-PK", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Page Header */}
            <section className="relative bg-gradient-to-r from-slate-900 to-slate-700 text-white pt-16 pb-14 overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-3 h-3 bg-rose-500 rounded-full animate-pulse"></div>
                        <span className="text-rose-400 font-semibold tracking-widest text-sm uppercase">Live Center</span>
                        {lastUpdated && (
                            <span className="ml-auto text-xs text-gray-400">
                                Updated {lastUpdated.toLocaleTimeString("en-PK", { hour: "2-digit", minute: "2-digit" })} · Auto-refresh 30s
                            </span>
                        )}
                    </div>
                    <h1 className="text-4xl font-bold mb-2">Live Matches</h1>
                    <p className="text-gray-300">Real-time scores and match updates from BZU Engineering Sports.</p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-amber-400 to-emerald-500"></div>
            </section>

            {/* LIVE MATCHES */}
            <section className="py-10">
                <div className="container mx-auto px-4">

                    {loading ? (
                        <div className="flex items-center justify-center py-16">
                            <div className="text-center">
                                <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                                <p className="text-sm text-gray-500">Loading live matches...</p>
                            </div>
                        </div>
                    ) : liveMatches.length > 0 ? (
                        <>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-3 h-3 bg-rose-500 rounded-full animate-pulse"></div>
                                <h2 className="text-2xl font-bold text-gray-800">LIVE NOW</h2>
                                <span className="bg-rose-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                                    {liveMatches.length} LIVE
                                </span>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                                {liveMatches.map((match) => (
                                    <motion.div
                                        key={match._id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-white rounded-2xl shadow-lg border-2 border-rose-300 overflow-hidden"
                                    >
                                        {/* Live Header */}
                                        <div className="bg-rose-600 text-white px-4 py-3 flex items-center justify-between">
                                            <span className="text-xs font-bold tracking-wider flex items-center gap-2">
                                                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                                LIVE
                                            </span>
                                            <span className="text-xs font-medium">
                                                {sportIcons[match.sport]} {match.sport} · {match.category}
                                            </span>
                                        </div>

                                        {/* Score Board */}
                                        <div className="p-6 text-center">
                                            <div className="flex items-center justify-center gap-8">
                                                <div>
                                                    <p className="text-3xl font-black text-gray-900">{match.teamA}</p>
                                                    <p className="text-5xl font-black text-blue-600 mt-2">{match.scoreA}</p>
                                                </div>
                                                <div className="text-gray-200 text-3xl font-light">—</div>
                                                <div>
                                                    <p className="text-3xl font-black text-gray-900">{match.teamB}</p>
                                                    <p className="text-5xl font-black text-blue-600 mt-2">{match.scoreB}</p>
                                                </div>
                                            </div>
                                            {match.notes && (
                                                <p className="text-xs text-gray-500 mt-3 bg-gray-50 rounded-lg px-3 py-2">{match.notes}</p>
                                            )}
                                            <p className="text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
                                                <i className='bx bx-map'></i> {match.ground}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl shadow-md border border-gray-200 p-10 text-center max-w-2xl mx-auto mb-10"
                        >
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <i className='bx bx-signal-5 text-5xl text-gray-400'></i>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">No Live Matches Right Now</h2>
                            <p className="text-gray-500 mb-2 max-w-md mx-auto">
                                There are currently no games in progress. Matches are held every
                                <strong className="text-gray-700"> Wednesday & Saturday</strong>.
                            </p>
                            <p className="text-gray-400 text-sm mb-8">Check back during match hours or view the upcoming schedule below.</p>
                            <div className="flex flex-wrap gap-4 justify-center">
                                <Link to="/schedule">
                                    <button className="bg-blue-600 text-white px-7 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow flex items-center gap-2">
                                        <i className='bx bx-calendar'></i> VIEW FULL SCHEDULE
                                    </button>
                                </Link>
                                <Link to="/announcements">
                                    <button className="border border-gray-300 text-gray-700 px-7 py-3 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center gap-2">
                                        <i className='bx bx-bell'></i> LATEST UPDATES
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* UPCOMING — Men's & Women's from backend */}
            <section className="py-10 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-8">

                        {/* MEN'S UPCOMING */}
                        <div>
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-1.5 h-7 bg-blue-600 rounded-full"></div>
                                <h3 className="text-xl font-bold text-gray-800">MEN'S UPCOMING</h3>
                                <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">Ali Hall</span>
                                <div className="h-px flex-1 bg-gray-200"></div>
                            </div>

                            {mensUpcoming.length === 0 ? (
                                <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200">
                                    <i className='bx bx-calendar-x text-3xl text-gray-300'></i>
                                    <p className="text-gray-400 text-sm mt-2">No upcoming men's matches</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {mensUpcoming.map((match) => (
                                        <motion.div
                                            key={match._id}
                                            whileHover={{ x: 4 }}
                                            className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm border-l-4 border-l-blue-600"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                                    {sportIcons[match.sport]} {match.sport}
                                                </span>
                                                <span className="text-sm text-gray-500 flex items-center gap-1">
                                                    <i className='bx bx-time'></i> {formatTime(match.scheduledAt)}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 text-xl font-bold text-gray-800 mb-2">
                                                <span>{match.teamA}</span>
                                                <span className="text-gray-300 text-sm font-normal">VS</span>
                                                <span>{match.teamB}</span>
                                            </div>
                                            <div className="text-sm text-gray-500 flex items-center gap-1">
                                                <i className='bx bx-map'></i> {match.ground}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* WOMEN'S UPCOMING */}
                        <div>
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-1.5 h-7 bg-rose-500 rounded-full"></div>
                                <h3 className="text-xl font-bold text-gray-800">WOMEN'S UPCOMING</h3>
                                <span className="bg-rose-100 text-rose-600 text-xs font-semibold px-3 py-1 rounded-full">Women Hostel</span>
                                <div className="h-px flex-1 bg-gray-200"></div>
                            </div>

                            {womensUpcoming.length === 0 ? (
                                <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200">
                                    <i className='bx bx-calendar-x text-3xl text-gray-300'></i>
                                    <p className="text-gray-400 text-sm mt-2">No upcoming women's matches</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {womensUpcoming.map((match) => (
                                        <motion.div
                                            key={match._id}
                                            whileHover={{ x: 4 }}
                                            className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm border-l-4 border-l-rose-500"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="bg-rose-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                                    {sportIcons[match.sport]} {match.sport}
                                                </span>
                                                <span className="text-sm text-gray-500 flex items-center gap-1">
                                                    <i className='bx bx-time'></i> {formatTime(match.scheduledAt)}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 text-xl font-bold text-gray-800 mb-2">
                                                <span>{match.teamA}</span>
                                                <span className="text-gray-300 text-sm font-normal">VS</span>
                                                <span>{match.teamB}</span>
                                            </div>
                                            <div className="text-sm text-gray-500 flex items-center gap-1">
                                                <i className='bx bx-map'></i> {match.ground}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <Link to="/schedule">
                        <button className="mt-8 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 text-sm">
                            VIEW FULL SCHEDULE <i className='bx bx-right-arrow-alt'></i>
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Live;
