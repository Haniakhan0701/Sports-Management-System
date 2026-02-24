import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import 'boxicons/css/boxicons.min.css';

const Home = () => {
    // --- State for dynamic data ---
    const [liveMatchesCount, setLiveMatchesCount] = useState(0); // Simulate 0 live matches initially
    const [nextMatchTime, setNextMatchTime] = useState("Today, 4:30 PM");

    // --- Configuration Data (Professional & Clean) ---
    const currentYear = 2026;
    const nextSportsWeekYear = currentYear + 1;

    const departments = [
        { name: 'Computer Engineering', short: 'CE', icon: 'bx-laptop', color: 'text-blue-600', bgLight: 'bg-blue-50' },
        { name: 'Mechanical Engineering', short: 'ME', icon: 'bx-cog', color: 'text-amber-600', bgLight: 'bg-amber-50' },
        { name: 'Electrical Engineering', short: 'EE', icon: 'bx-bolt-circle', color: 'text-emerald-600', bgLight: 'bg-emerald-50' },
        { name: 'Civil Engineering', short: 'CVE', icon: 'bx-building-house', color: 'text-slate-600', bgLight: 'bg-slate-50' },
        { name: 'Architecture', short: 'AR', icon: 'bx-paint', color: 'text-rose-600', bgLight: 'bg-rose-50' },
    ];

    // Example: No live matches, so this array is empty.
    const liveMatches = [];

    const upcomingMatches = [
        { id: 1, sport: 'Cricket', category: "Men's", dept1: 'CE', dept2: 'ME', time: 'Today 3:00 PM', venue: 'Oval Ground' },
        { id: 2, sport: 'Football', category: "Women's", dept1: 'EE', dept2: 'CVE', time: 'Today 4:30 PM', venue: 'Football Field' },
        { id: 3, sport: 'Basketball', category: "Men's", dept1: 'AR', dept2: 'CE', time: 'Tomorrow 9:00 AM', venue: 'Indoor Court' },
        { id: 4, sport: 'Volleyball', category: "Women's", dept1: 'ME', dept2: 'EE', time: 'Tomorrow 2:00 PM', venue: 'Court 1' },
    ];

    const standings = [
        { rank: 1, dept: 'CE', full: 'Computer Eng', points: 245, gold: 3, silver: 2, bronze: 1, color: 'text-blue-600' },
        { rank: 2, dept: 'ME', full: 'Mechanical Eng', points: 210, gold: 2, silver: 3, bronze: 2, color: 'text-amber-600' },
        { rank: 3, dept: 'EE', full: 'Electrical Eng', points: 185, gold: 2, silver: 1, bronze: 3, color: 'text-emerald-600' },
        { rank: 4, dept: 'CVE', full: 'Civil Eng', points: 150, gold: 1, silver: 2, bronze: 2, color: 'text-slate-600' },
        { rank: 5, dept: 'AR', full: 'Architecture', points: 120, gold: 1, silver: 1, bronze: 2, color: 'text-rose-600' },
    ];

    const announcements = [
        { id: 1, title: 'Cricket Final: CE vs ME scheduled for 3:00 PM', category: "Men's", dept: 'CE, ME', priority: 'high' },
        { id: 2, title: 'Women\'s Football Team Registrations Now Open', category: "Women's", dept: 'All', priority: 'high' },
        { id: 3, title: 'Volleyball: EE vs CVE at 4:00 PM on Court 1', category: "Women's", dept: 'EE, CVE', priority: 'medium' },
        { id: 4, title: 'Opening Ceremony: Tomorrow 10:00 AM at Main Ground', category: 'General', dept: 'All', priority: 'high' },
    ];

    // --- Effects to simulate data fetching ---
    useEffect(() => {
        // Simulate API call to check for live matches
        // For demo, we set to 0. In a real app, this would be set based on fetched data.
        setLiveMatchesCount(liveMatches.length);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Hero Section - Clean, Professional, Prestige */}
            <section className="relative bg-gradient-to-r from-slate-900 to-slate-700 text-white pt-20 pb-24 md:pt-24 md:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center md:text-left md:max-w-3xl"
                    >
                        <span className="inline-block border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium tracking-wide mb-5">
                            BZU ENGINEERING {currentYear}
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                            Departmental <br />Sports Championship
                        </h1>
                        <p className="text-lg text-gray-200 mb-8 max-w-2xl">
                            Five departments. Twelve sports. One champion. Fostering excellence, teamwork, and school spirit through competitive athletics.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <Link to="/schedule">
                                <button className="bg-white text-slate-900 px-7 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg flex items-center gap-2">
                                    <i className='bx bx-calendar-star'></i> VIEW SCHEDULE
                                </button>
                            </Link>
                            <Link to="/live">
                                <button className="border border-white text-white px-7 py-3 rounded-lg font-semibold hover:bg-white/10 transition flex items-center gap-2">
                                    <i className='bx bx-play-circle'></i> LIVE ACTION
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
                {/* Subtle abstract pattern or gradient line at bottom */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-amber-400 to-emerald-500"></div>
            </section>

            {/* Regular Sports Frequency Notice */}
            <section className="border-b border-gray-200 bg-white">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                        <div className="flex items-center gap-3 text-gray-600">
                            <i className='bx bx-calendar-check text-xl text-emerald-600'></i>
                            <span><strong className="text-gray-800">Regular Play:</strong> Matches held every Wednesday & Saturday, weather permitting.</span>
                        </div>
                        <Link to="/about#regular-sports">
                            <button className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1">
                                Learn More <i className='bx bx-right-arrow-alt'></i>
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Departments - Clean Cards */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-3 mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">DEPARTMENTS</h2>
                        <div className="h-px flex-1 bg-gray-200"></div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
                        {departments.map((dept, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -4 }}
                                className={`${dept.bgLight} p-5 rounded-xl text-center border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer`}
                            >
                                <i className={`bx ${dept.icon} text-3xl ${dept.color} mb-2`}></i>
                                <div className={`font-bold text-xl ${dept.color}`}>{dept.short}</div>
                                <div className="text-xs text-gray-500 mt-1">{dept.name.split(' ')[0]}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Live Matches Section - Handles Empty State */}
            <section className="py-12 bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-2 h-7 bg-rose-600 rounded-full"></div>
                        <h2 className="text-2xl font-bold text-gray-800">LIVE MATCHES</h2>
                        {liveMatchesCount > 0 && (
                            <span className="bg-rose-600 text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wider">
                                {liveMatchesCount} LIVE
                            </span>
                        )}
                    </div>

                    {liveMatchesCount > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Map through live matches here */}
                            <p>Live matches will appear here.</p>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-white rounded-xl shadow p-8 text-center max-w-2xl mx-auto border border-gray-200"
                        >
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className='bx bx-signal-5 text-4xl text-gray-400'></i>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Live Action at the Moment</h3>
                            <p className="text-gray-500 mb-6">Check the schedule for upcoming matches or tune in later for live broadcasts.</p>
                            <div className="flex flex-wrap gap-4 justify-center">
                                <Link to="/schedule">
                                    <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition shadow flex items-center gap-2">
                                        <i className='bx bx-calendar'></i> VIEW SCHEDULE
                                    </button>
                                </Link>
                                <Link to="/announcements">
                                    <button className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition">
                                        LATEST UPDATES
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Upcoming Matches & Standings */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Upcoming Matches - Takes 2/3 width */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">UPCOMING FIXTURES</h2>
                                <div className="h-px flex-1 bg-gray-200"></div>
                            </div>
                            <div className="space-y-4">
                                {upcomingMatches.map((match) => (
                                    <div key={match.id} className="bg-gray-50 rounded-lg p-5 hover:bg-gray-100 transition border-l-4 border-blue-600 shadow-sm">
                                        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                                            <div className="flex items-center gap-3">
                                                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">{match.sport}</span>
                                                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">{match.category}</span>
                                            </div>
                                            <span className="text-sm font-medium text-gray-700">{match.time}</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-lg">
                                            <span className="font-bold text-gray-800">{match.dept1}</span>
                                            <span className="text-gray-400 text-sm">VS</span>
                                            <span className="font-bold text-gray-800">{match.dept2}</span>
                                            <span className="ml-auto text-sm text-gray-500 flex items-center gap-1">
                                                <i className='bx bx-map'></i> {match.venue}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link to="/schedule">
                                <button className="mt-6 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 text-sm">
                                    VIEW FULL SCHEDULE <i className='bx bx-right-arrow-alt'></i>
                                </button>
                            </Link>
                        </div>

                        {/* Standings */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">STANDINGS</h2>
                                <div className="h-px flex-1 bg-gray-200"></div>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                                <div className="space-y-3">
                                    {standings.map((dept) => (
                                        <div key={dept.rank} className="flex items-center justify-between p-2 hover:bg-white rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <span className="w-7 text-center font-semibold text-gray-500 text-lg">
                                                    {dept.rank}
                                                </span>
                                                <div>
                                                    <span className={`font-bold text-lg ${dept.color}`}>{dept.dept}</span>
                                                    <span className="text-xs text-gray-400 ml-2">{dept.full}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="font-bold text-xl text-gray-800">{dept.points}</span>
                                                <div className="flex gap-1 text-xs bg-white px-2 py-1 rounded-full border border-gray-200">
                                                    <span className="text-amber-500 font-semibold">{dept.gold}</span>
                                                    <span className="text-gray-400">/</span>
                                                    <span className="text-gray-500">{dept.silver}</span>
                                                    <span className="text-gray-400">/</span>
                                                    <span className="text-amber-700">{dept.bronze}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Link to="/leaderboard">
                                    <button className="mt-4 w-full text-center text-amber-600 hover:text-amber-700 font-medium text-sm py-2 border-t border-gray-200 pt-4">
                                        VIEW FULL LEADERBOARD <i className='bx bx-right-arrow-alt'></i>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Announcements & Next Sports Week Info */}
            <section className="py-12 bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Announcements - Takes 2/3 */}
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <i className='bx bx-bell text-2xl text-gray-600'></i>
                                <h2 className="text-2xl font-bold text-gray-800">ANNOUNCEMENTS</h2>
                                <div className="h-px flex-1 bg-gray-200"></div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {announcements.map((item) => (
                                    <div key={item.id} className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 hover:shadow transition">
                                        <div className="flex items-start gap-3">
                                            <i className='bx bx-message-rounded-dots text-blue-600 text-xl'></i>
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-800">{item.title}</p>
                                                <div className="flex gap-2 mt-3">
                                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                                                        item.category === "Men's" ? 'bg-blue-100 text-blue-700' :
                                                        item.category === "Women's" ? 'bg-rose-100 text-rose-700' :
                                                        'bg-gray-100 text-gray-700'
                                                    }`}>
                                                        {item.category}
                                                    </span>
                                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                                        {item.dept}
                                                    </span>
                                                </div>
                                            </div>
                                            {item.priority === 'high' && (
                                                <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-semibold">
                                                    IMPORTANT
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Next Sports Week Card */}
                        <div>
                            <div className="bg-white rounded-xl p-6 shadow-md border-t-4 border-blue-600 h-full flex flex-col">
                                <div className="flex items-center gap-2 mb-3">
                                    <i className='bx bx-calendar-star text-2xl text-blue-600'></i>
                                    <h3 className="font-bold text-gray-800 text-lg">NEXT SPORTS WEEK</h3>
                                </div>
                                <p className="text-3xl font-bold text-gray-800 mb-1">{nextSportsWeekYear}</p>
                                <p className="text-gray-500 text-sm mb-4">The premier departmental tournament returns.</p>
                                <div className="mt-auto pt-4">
                                    <Link to="/about#sports-week">
                                        <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2.5 rounded-lg transition text-sm">
                                            LEARN MORE
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Action Grid */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        <Link to="/games">
                            <div className="bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100 transition border border-gray-200">
                                <i className='bx bx-football text-2xl text-gray-600'></i>
                                <div className="font-medium text-gray-700 text-sm mt-1">GAMES</div>
                            </div>
                        </Link>
                        <Link to="/live">
                            <div className="bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100 transition border border-gray-200">
                                <i className='bx bx-video-recording text-2xl text-gray-600'></i>
                                <div className="font-medium text-gray-700 text-sm mt-1">LIVE</div>
                            </div>
                        </Link>
                        <Link to="/leaderboard">
                            <div className="bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100 transition border border-gray-200">
                                <i className='bx bx-trophy text-2xl text-gray-600'></i>
                                <div className="font-medium text-gray-700 text-sm mt-1">RANKINGS</div>
                            </div>
                        </Link>
                        <Link to="/media">
                            <div className="bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100 transition border border-gray-200">
                                <i className='bx bx-images text-2xl text-gray-600'></i>
                                <div className="font-medium text-gray-700 text-sm mt-1">GALLERY</div>
                            </div>
                        </Link>
                        <Link to="/register">
                            <div className="bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100 transition border border-gray-200">
                                <i className='bx bx-user-plus text-2xl text-gray-600'></i>
                                <div className="font-medium text-gray-700 text-sm mt-1">REGISTER</div>
                            </div>
                        </Link>
                        <Link to="/about">
                            <div className="bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100 transition border border-gray-200">
                                <i className='bx bx-info-circle text-2xl text-gray-600'></i>
                                <div className="font-medium text-gray-700 text-sm mt-1">ABOUT</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer Note */}
            <section className="py-3 bg-gray-800 text-gray-300 text-center text-xs">
                <div className="container mx-auto px-4">
                    BZU ENGINEERING SPORTS · {currentYear} · DEPARTMENTAL CHAMPIONSHIPS · MEN'S & WOMEN'S COMPETITIONS
                </div>
            </section>
        </div>
    );
};

export default Home;