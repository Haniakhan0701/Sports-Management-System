// src/pages/live.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import 'boxicons/css/boxicons.min.css';

const Live = () => {
    // Set to empty = no live matches right now
    const liveMatches = [];

    const mensUpcoming = [
        { id: 1, sport: 'Cricket', dept1: 'CE', dept2: 'ME', time: 'Today 3:00 PM', venue: 'Ali Hall Main Ground' },
        { id: 2, sport: 'Basketball', dept1: 'AR', dept2: 'CE', time: 'Tomorrow 9:00 AM', venue: 'Ali Hall Indoor Court' },
        { id: 3, sport: 'Football', dept1: 'EE', dept2: 'CVE', time: 'Tomorrow 11:00 AM', venue: 'Ali Hall Football Field' },
    ];

    const womensUpcoming = [
        { id: 1, sport: 'Football', dept1: 'EE', dept2: 'CVE', time: 'Today 4:30 PM', venue: 'Women Hostel Main Ground' },
        { id: 2, sport: 'Volleyball', dept1: 'ME', dept2: 'EE', time: 'Tomorrow 2:00 PM', venue: 'Women Hostel Court 1' },
        { id: 3, sport: 'Basketball', dept1: 'CE', dept2: 'AR', time: 'Tomorrow 4:00 PM', venue: 'Women Hostel Indoor Court' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Page Header */}
            <section className="relative bg-gradient-to-r from-slate-900 to-slate-700 text-white pt-16 pb-14 overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-3 h-3 bg-rose-500 rounded-full animate-pulse"></div>
                        <span className="text-rose-400 font-semibold tracking-widest text-sm uppercase">Live Center</span>
                    </div>
                    <h1 className="text-4xl font-bold mb-2">Live Matches</h1>
                    <p className="text-gray-300">Real-time scores and match updates from BZU Engineering Sports.</p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-amber-400 to-emerald-500"></div>
            </section>

            {/* No Live Matches State */}
            {liveMatches.length === 0 && (
                <section className="py-10">
                    <div className="container mx-auto px-4 max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-2xl shadow-md border border-gray-200 p-10 text-center"
                        >
                            <div className="relative w-24 h-24 mx-auto mb-6">
                                <div className="absolute inset-0 bg-gray-100 rounded-full animate-pulse opacity-50"></div>
                                <div className="relative w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                                    <i className='bx bx-signal-5 text-5xl text-gray-400'></i>
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">No Live Matches Right Now</h2>
                            <p className="text-gray-500 mb-2 max-w-md mx-auto">
                                There are currently no games in progress. Matches are held every
                                <strong className="text-gray-700"> Wednesday & Saturday</strong>.
                            </p>
                            <p className="text-gray-400 text-sm mb-8">
                                Check back during match hours or view the upcoming schedule below.
                            </p>
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
                    </div>
                </section>
            )}

            {/* Upcoming Matches - Separated by Men's and Women's */}
            <section className="py-10">
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
                            <div className="space-y-3">
                                {mensUpcoming.map((match) => (
                                    <motion.div
                                        key={match.id}
                                        whileHover={{ x: 4 }}
                                        className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm border-l-4 border-l-blue-600"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                                {match.sport}
                                            </span>
                                            <span className="text-sm text-gray-500 flex items-center gap-1">
                                                <i className='bx bx-time'></i> {match.time}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 text-xl font-bold text-gray-800 mb-2">
                                            <span>{match.dept1}</span>
                                            <span className="text-gray-300 text-sm font-normal">VS</span>
                                            <span>{match.dept2}</span>
                                        </div>
                                        <div className="text-sm text-gray-500 flex items-center gap-1">
                                            <i className='bx bx-map'></i> {match.venue}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* WOMEN'S UPCOMING */}
                        <div>
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-1.5 h-7 bg-rose-500 rounded-full"></div>
                                <h3 className="text-xl font-bold text-gray-800">WOMEN'S UPCOMING</h3>
                                <span className="bg-rose-100 text-rose-600 text-xs font-semibold px-3 py-1 rounded-full">Women Hostel</span>
                                <div className="h-px flex-1 bg-gray-200"></div>
                            </div>
                            <div className="space-y-3">
                                {womensUpcoming.map((match) => (
                                    <motion.div
                                        key={match.id}
                                        whileHover={{ x: 4 }}
                                        className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm border-l-4 border-l-rose-500"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="bg-rose-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                                {match.sport}
                                            </span>
                                            <span className="text-sm text-gray-500 flex items-center gap-1">
                                                <i className='bx bx-time'></i> {match.time}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 text-xl font-bold text-gray-800 mb-2">
                                            <span>{match.dept1}</span>
                                            <span className="text-gray-300 text-sm font-normal">VS</span>
                                            <span>{match.dept2}</span>
                                        </div>
                                        <div className="text-sm text-gray-500 flex items-center gap-1">
                                            <i className='bx bx-map'></i> {match.venue}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
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
