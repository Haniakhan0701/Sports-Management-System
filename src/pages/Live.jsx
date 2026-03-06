import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import 'boxicons/css/boxicons.min.css';

const SPORT_ICONS = {
    'Cricket': '🏏', 'Football': '⚽', 'Tug of War': '🪢',
    'Dodge Ball': '🎯', '100m Race': '🏃', 'Badminton': '🏸',
    'Bottle Spin Chase': '🍾', '4×100m Relay': '🔁',
};

const Live = () => {
    const [liveMatches,    setLiveMatches]    = useState([]);
    const [upcomingToday,  setUpcomingToday]  = useState([]);
    const [loading,        setLoading]        = useState(true);
    const [lastUpdated,    setLastUpdated]    = useState(null);

    const fetchMatches = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/games');
            const all = res.data.data || [];

            const live = all.filter(g => g.status === 'live');

            // Upcoming matches scheduled for today
            const today = new Date();
            const upcoming = all.filter(g => {
                if (g.status !== 'upcoming') return false;
                const matchDate = new Date(g.date);
                return matchDate.toDateString() === today.toDateString();
            });

            setLiveMatches(live);
            setUpcomingToday(upcoming);
            setLastUpdated(new Date());
        } catch (err) {
            console.error('Failed to fetch live matches:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMatches();
        // Auto-refresh every 10 seconds
        const interval = setInterval(fetchMatches, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gray-950 text-white">

            {/* Hero */}
            <section className="relative bg-gradient-to-br from-gray-950 via-red-950 to-gray-950 pt-20 pb-16 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-red-500 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-64 h-64 bg-rose-500 rounded-full blur-3xl"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                            <span className="text-red-400 font-bold tracking-widest text-sm uppercase">Live Coverage</span>
                            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-4">
                            🔴 LIVE MATCHES
                        </h1>
                        <p className="text-gray-400 max-w-xl mx-auto">
                            Real-time scores and match updates for BZU Engineering Sports Week
                        </p>
                        {lastUpdated && (
                            <p className="text-xs text-gray-600 mt-3">
                                Last updated: {lastUpdated.toLocaleTimeString()} · Auto-refreshes every 10s
                            </p>
                        )}
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-10">

                {/* Loading */}
                {loading ? (
                    <div className="flex items-center justify-center py-20 text-gray-500">
                        <i className='bx bx-loader-alt animate-spin text-4xl mr-3'></i>
                        <span>Loading live matches...</span>
                    </div>
                ) : (
                    <>
                        {/* ── LIVE MATCHES ── */}
                        {liveMatches.length > 0 ? (
                            <div className="mb-12">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                    <h2 className="text-xl font-black text-white uppercase tracking-wide">
                                        {liveMatches.length} Match{liveMatches.length > 1 ? 'es' : ''} Live Right Now
                                    </h2>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {liveMatches.map((match, i) => (
                                        <motion.div
                                            key={match._id}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="bg-gradient-to-br from-red-950 to-gray-900 border border-red-800/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
                                        >
                                            {/* Pulsing background glow */}
                                            <div className="absolute inset-0 bg-red-500/5 animate-pulse rounded-2xl"></div>

                                            <div className="relative z-10">
                                                {/* Top row */}
                                                <div className="flex items-center justify-between mb-5">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-2xl">{SPORT_ICONS[match.sport] || '🏅'}</span>
                                                        <span className="text-gray-300 font-semibold text-sm">{match.sport}</span>
                                                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                                                            match.category === "Men's" ? 'bg-blue-900 text-blue-300' : 'bg-rose-900 text-rose-300'
                                                        }`}>
                                                            {match.category}
                                                        </span>
                                                    </div>
                                                    <span className="flex items-center gap-1.5 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full animate-pulse">
                                                        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                                        LIVE
                                                    </span>
                                                </div>

                                                {/* Scoreboard */}
                                                <div className="flex items-center justify-between gap-4 mb-5">
                                                    {/* Team A */}
                                                    <div className="flex-1 text-center">
                                                        <div className="text-3xl md:text-4xl font-black text-white mb-1">{match.teamA}</div>
                                                        <div className="text-xs text-gray-500 uppercase tracking-wide">Dept</div>
                                                    </div>

                                                    {/* Score */}
                                                    <div className="text-center px-4">
                                                        {(match.scoreA !== null && match.scoreB !== null) ? (
                                                            <div className="text-4xl md:text-5xl font-black text-red-400">
                                                                {match.scoreA} <span className="text-gray-600">–</span> {match.scoreB}
                                                            </div>
                                                        ) : (
                                                            <div className="text-2xl font-black text-gray-600">VS</div>
                                                        )}
                                                        <div className="text-xs text-red-500 font-bold mt-1 animate-pulse">● LIVE</div>
                                                    </div>

                                                    {/* Team B */}
                                                    <div className="flex-1 text-center">
                                                        <div className="text-3xl md:text-4xl font-black text-white mb-1">{match.teamB}</div>
                                                        <div className="text-xs text-gray-500 uppercase tracking-wide">Dept</div>
                                                    </div>
                                                </div>

                                                {/* Venue & time */}
                                                <div className="border-t border-gray-800 pt-4 flex items-center justify-between text-xs text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <i className='bx bx-map'></i>
                                                        {match.venue || 'TBD'}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <i className='bx bx-time'></i>
                                                        {new Date(match.date).toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            /* No live matches */
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-20 mb-10"
                            >
                                <div className="text-6xl mb-4">📺</div>
                                <h2 className="text-2xl font-black text-gray-400 mb-2">No Live Matches Right Now</h2>
                                <p className="text-gray-600 mb-6">Check the schedule for upcoming matches</p>
                                <Link to="/schedule">
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition">
                                        View Full Schedule
                                    </button>
                                </Link>
                            </motion.div>
                        )}

                        {/* ── UPCOMING TODAY ── */}
                        {upcomingToday.length > 0 && (
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <i className='bx bx-time text-orange-400 text-xl'></i>
                                    <h2 className="text-xl font-black text-white uppercase tracking-wide">
                                        Up Next Today
                                    </h2>
                                </div>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {upcomingToday.map((match, i) => (
                                        <motion.div
                                            key={match._id}
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.07 }}
                                            className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-orange-800 transition"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <span>{SPORT_ICONS[match.sport] || '🏅'}</span>
                                                    <span className="text-gray-400 text-sm">{match.sport}</span>
                                                </div>
                                                <span className="text-xs bg-orange-900/50 text-orange-400 px-2 py-0.5 rounded-full font-semibold">
                                                    🕐 Upcoming
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-xl font-black text-white">{match.teamA}</span>
                                                <span className="text-gray-600 font-bold">VS</span>
                                                <span className="text-xl font-black text-white">{match.teamB}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-xs text-gray-600">
                                                <span className="flex items-center gap-1">
                                                    <i className='bx bx-map'></i> {match.venue || 'TBD'}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <i className='bx bx-time'></i>
                                                    {new Date(match.date).toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* If nothing at all */}
                        {liveMatches.length === 0 && upcomingToday.length === 0 && (
                            <div className="text-center py-8 text-gray-700">
                                <p className="text-sm">No matches scheduled for today.</p>
                                <Link to="/schedule" className="text-blue-500 hover:text-blue-400 text-sm underline mt-2 inline-block">
                                    Check full schedule →
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Live;
