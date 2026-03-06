// src/pages/admin/Dashboard.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import 'boxicons/css/boxicons.min.css';

const Dashboard = () => {
    const stats = [
        { label: 'Total Matches',        value: '34',  icon: 'bx-football',      color: 'bg-blue-500',   change: '+2 today',       path: null },
        { label: 'Completed',            value: '21',  icon: 'bx-check-circle',  color: 'bg-green-500',  change: '62% done',       path: null },
        { label: 'Live Now',             value: '0',   icon: 'bx-radio-circle',  color: 'bg-red-500',    change: 'No live matches', path: null },
        { label: 'Upcoming',             value: '13',  icon: 'bx-time',          color: 'bg-orange-500', change: 'Next: 3:00 PM',  path: null },
        { label: 'Registered Athletes',  value: '200', icon: 'bx-group',         color: 'bg-purple-500', change: '+12 this week',  path: '/admin/registrations' },
        { label: 'Announcements',        value: '8',   icon: 'bx-bell',          color: 'bg-pink-500',   change: '2 unread',       path: '/announcements' },
    ];

    const recentMatches = [
        { sport: '🏏', name: 'CE vs ME',   type: "Men's Cricket",      result: 'CE won by 45 runs', status: 'completed', date: 'Feb 8' },
        { sport: '⚽', name: 'EE vs CVE',  type: "Women's Football",   result: 'EE won 2-1',        status: 'completed', date: 'Feb 7' },
        { sport: '🏀', name: 'AR vs CE',   type: "Men's Basketball",   result: 'Upcoming',          status: 'upcoming',  date: 'Today 3PM' },
        { sport: '🏐', name: 'ME vs EE',   type: "Women's Volleyball", result: 'Upcoming',          status: 'upcoming',  date: 'Tomorrow' },
    ];

    const standings = [
        { rank: 1, dept: 'CE',  points: 245, color: 'bg-blue-100 text-blue-700' },
        { rank: 2, dept: 'ME',  points: 210, color: 'bg-orange-100 text-orange-700' },
        { rank: 3, dept: 'EE',  points: 185, color: 'bg-yellow-100 text-yellow-700' },
        { rank: 4, dept: 'CVE', points: 150, color: 'bg-green-100 text-green-700' },
        { rank: 5, dept: 'AR',  points: 120, color: 'bg-purple-100 text-purple-700' },
    ];

    const quickActions = [
        { label: 'Registrations', icon: 'bx-user-check',  path: '/admin/registrations', color: 'bg-purple-600 hover:bg-purple-700' },
        { label: 'Manage Games',  icon: 'bx-edit-alt',    path: '/admin/games',          color: 'bg-blue-600 hover:bg-blue-700' },
        { label: 'Update Scores', icon: 'bx-bar-chart',   path: '/admin/scores',         color: 'bg-green-600 hover:bg-green-700' },
        { label: 'Announcement',  icon: 'bx-bell-plus',   path: '/announcements',        color: 'bg-orange-500 hover:bg-orange-600' },
        { label: 'Media Upload',  icon: 'bx-image-add',   path: '/media',                color: 'bg-pink-600 hover:bg-pink-700' },
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
                            <p className="text-gray-400 text-sm mt-1">BZU Engineering Sports · 2027</p>
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
                    {stats.map((s, i) => {
                        const card = (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 transition ${
                                    s.path ? 'cursor-pointer hover:shadow-md hover:border-purple-200 ring-0 hover:ring-2 hover:ring-purple-200' : ''
                                }`}
                            >
                                <div className={`w-10 h-10 ${s.color} rounded-lg flex items-center justify-center mb-3`}>
                                    <i className={`bx ${s.icon} text-white text-xl`}></i>
                                </div>
                                <div className="text-2xl font-black text-gray-900">{s.value}</div>
                                <div className="text-xs font-semibold text-gray-600 mt-0.5">{s.label}</div>
                                <div className="text-xs text-gray-400 mt-1">{s.change}</div>
                                {s.path && (
                                    <div className="text-xs text-purple-600 font-bold mt-2 flex items-center gap-1">
                                        View all <i className='bx bx-right-arrow-alt'></i>
                                    </div>
                                )}
                            </motion.div>
                        );
                        return s.path ? <Link key={i} to={s.path}>{card}</Link> : card;
                    })}
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Recent Matches */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="flex items-center justify-between p-5 border-b border-gray-100">
                            <h2 className="font-black text-gray-900">Recent & Upcoming Matches</h2>
                            <Link to="/admin/games" className="text-blue-600 text-sm font-medium hover:underline">Manage →</Link>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {recentMatches.map((m, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition">
                                    <span className="text-2xl">{m.sport}</span>
                                    <div className="flex-1">
                                        <p className="font-bold text-gray-900 text-sm">{m.name}</p>
                                        <p className="text-xs text-gray-500">{m.type}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-semibold text-gray-700">{m.result}</p>
                                        <p className="text-xs text-gray-400">{m.date}</p>
                                    </div>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                                        m.status === 'completed' ? 'bg-green-100 text-green-700' :
                                        m.status === 'live'      ? 'bg-red-100 text-red-700' :
                                                                   'bg-orange-100 text-orange-700'
                                    }`}>
                                        {m.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border-t border-gray-100">
                            <Link to="/schedule" className="text-blue-600 text-sm font-medium hover:underline">View full schedule →</Link>
                        </div>
                    </div>

                    {/* Standings */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="flex items-center justify-between p-5 border-b border-gray-100">
                            <h2 className="font-black text-gray-900">Standings</h2>
                            <Link to="/standings" className="text-blue-600 text-sm font-medium hover:underline">View →</Link>
                        </div>
                        <div className="p-4 space-y-3">
                            {standings.map((s, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                                        i === 0 ? 'bg-amber-400 text-white' :
                                        i === 1 ? 'bg-gray-300 text-gray-700' :
                                        i === 2 ? 'bg-orange-400 text-white' :
                                                  'bg-gray-100 text-gray-600'
                                    }`}>{s.rank}</span>
                                    <span className={`text-sm font-black px-2 py-0.5 rounded ${s.color}`}>{s.dept}</span>
                                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(s.points / 245) * 100}%` }} />
                                    </div>
                                    <span className="text-sm font-bold text-gray-700">{s.points}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Announcements Preview */}
                <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-black text-gray-900">Latest Announcements</h2>
                        <Link to="/announcements" className="text-blue-600 text-sm font-medium hover:underline">View all →</Link>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                        {[
                            { text: 'Cricket Final: CE vs ME scheduled for 3:00 PM',        tag: 'IMPORTANT', color: 'red' },
                            { text: "Women's Football Team Registrations Now Open",           tag: 'INFO',      color: 'blue' },
                            { text: 'Volleyball: EE vs CVE at 4:00 PM on Court 1',           tag: 'MATCH',     color: 'green' },
                            { text: 'Opening Ceremony: Tomorrow 10:00 AM at Main Ground',    tag: 'IMPORTANT', color: 'red' },
                        ].map((a, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                <span className={`text-xs font-bold px-2 py-0.5 rounded shrink-0 mt-0.5 ${
                                    a.color === 'red'  ? 'bg-red-100 text-red-700' :
                                    a.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                                                         'bg-green-100 text-green-700'
                                }`}>{a.tag}</span>
                                <p className="text-sm text-gray-700">{a.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
