// src/pages/admin/ManageGames.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import 'boxicons/css/boxicons.min.css';

const ManageGames = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [filterSport, setFilterSport] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');

    const [games, setGames] = useState([
        { id: 1, sport: 'Cricket', icon: '🏏', category: "Men's", team1: 'CE', team2: 'ME', date: '2026-02-08', time: '3:00 PM', venue: 'Oval Ground', status: 'completed', score: 'CE won by 45 runs' },
        { id: 2, sport: 'Football', icon: '⚽', category: "Women's", team1: 'EE', team2: 'CVE', date: '2026-02-07', time: '4:30 PM', venue: 'Football Field', status: 'completed', score: 'EE won 2-1' },
        { id: 3, sport: 'Basketball', icon: '🏀', category: "Men's", team1: 'AR', team2: 'CE', date: '2026-02-09', time: '9:00 AM', venue: 'Indoor Court', status: 'upcoming', score: '' },
        { id: 4, sport: 'Volleyball', icon: '🏐', category: "Women's", team1: 'ME', team2: 'EE', date: '2026-02-09', time: '2:00 PM', venue: 'Court 1', status: 'upcoming', score: '' },
        { id: 5, sport: 'Badminton', icon: '🏸', category: "Men's", team1: 'CE', team2: 'CVE', date: '2026-02-10', time: '10:00 AM', venue: 'Sports Hall', status: 'upcoming', score: '' },
        { id: 6, sport: 'Athletics', icon: '🏃', category: "Men's", team1: 'All Depts', team2: '—', date: '2026-02-11', time: '8:00 AM', venue: 'Running Track', status: 'upcoming', score: '' },
    ]);

    const [newGame, setNewGame] = useState({
        sport: 'Cricket', category: "Men's", team1: 'CE', team2: 'ME',
        date: '', time: '', venue: '', status: 'upcoming'
    });

    const departments = ['CE', 'ME', 'EE', 'CVE', 'AR', 'All Depts'];
    const sports = ['Cricket', 'Football', 'Basketball', 'Volleyball', 'Badminton', 'Athletics', 'Tug of War', 'Dodge Ball'];
    const venues = ['Oval Ground', 'Football Field', 'Indoor Court', 'Court 1', 'Court 2', 'Sports Hall', 'Running Track', 'Main Ground'];

    const filtered = games.filter(g => {
        if (filterSport !== 'all' && g.sport !== filterSport) return false;
        if (filterStatus !== 'all' && g.status !== filterStatus) return false;
        return true;
    });

    const deleteGame = (id) => setGames(games.filter(g => g.id !== id));

    const addGame = () => {
        const icons = { Cricket:'🏏', Football:'⚽', Basketball:'🏀', Volleyball:'🏐', Badminton:'🏸', Athletics:'🏃', 'Tug of War':'🪢', 'Dodge Ball':'🎯' };
        setGames([...games, { ...newGame, id: Date.now(), icon: icons[newGame.sport] || '🏆', score: '' }]);
        setShowAddModal(false);
        setNewGame({ sport: 'Cricket', category: "Men's", team1: 'CE', team2: 'ME', date: '', time: '', venue: '', status: 'upcoming' });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gray-900 text-white py-8">
                <div className="container mx-auto px-4 flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                            <Link to="/admin/dashboard" className="hover:text-white transition">Dashboard</Link>
                            <i className='bx bx-chevron-right'></i>
                            <span className="text-white">Manage Games</span>
                        </div>
                        <h1 className="text-3xl font-black">Manage Games</h1>
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl transition flex items-center gap-2"
                    >
                        <i className='bx bx-plus'></i> Add Game
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-wrap gap-4 items-center">
                    <div className="flex items-center gap-2">
                        <i className='bx bx-filter text-gray-400 text-xl'></i>
                        <span className="text-sm font-semibold text-gray-600">Filter:</span>
                    </div>
                    <select
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filterSport}
                        onChange={e => setFilterSport(e.target.value)}
                    >
                        <option value="all">All Sports</option>
                        {sports.map(s => <option key={s}>{s}</option>)}
                    </select>
                    <select
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filterStatus}
                        onChange={e => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="live">Live</option>
                        <option value="completed">Completed</option>
                    </select>
                    <span className="ml-auto text-sm text-gray-400">{filtered.length} matches</span>
                </div>

                {/* Games Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    {['Sport', 'Teams', 'Date & Time', 'Venue', 'Status', 'Result', 'Actions'].map(h => (
                                        <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wide">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filtered.map((game, i) => (
                                    <motion.tr
                                        key={game.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="hover:bg-gray-50 transition"
                                    >
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xl">{game.icon}</span>
                                                <div>
                                                    <p className="font-semibold text-gray-900">{game.sport}</p>
                                                    <p className="text-xs text-gray-400">{game.category}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="font-black text-gray-900">{game.team1}</span>
                                            <span className="text-gray-400 mx-2 text-xs">VS</span>
                                            <span className="font-black text-gray-900">{game.team2}</span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">
                                            <p>{game.date}</p>
                                            <p className="text-xs text-gray-400">{game.time}</p>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">{game.venue}</td>
                                        <td className="px-4 py-3">
                                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                                                game.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                game.status === 'live' ? 'bg-red-100 text-red-700 animate-pulse' :
                                                'bg-orange-100 text-orange-700'
                                            }`}>
                                                {game.status === 'live' && '● '}{game.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-500 text-xs">{game.score || '—'}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2">
                                                <Link to="/admin/scores">
                                                    <button className="text-blue-600 hover:bg-blue-50 p-1.5 rounded transition" title="Update Score">
                                                        <i className='bx bx-bar-chart'></i>
                                                    </button>
                                                </Link>
                                                <button className="text-gray-500 hover:bg-gray-100 p-1.5 rounded transition" title="Edit">
                                                    <i className='bx bx-edit'></i>
                                                </button>
                                                <button onClick={() => deleteGame(game.id)} className="text-red-500 hover:bg-red-50 p-1.5 rounded transition" title="Delete">
                                                    <i className='bx bx-trash'></i>
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                        {filtered.length === 0 && (
                            <div className="text-center py-12 text-gray-400">
                                <i className='bx bx-football text-5xl mb-3'></i>
                                <p>No games found.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add Game Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
                        onClick={() => setShowAddModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="text-xl font-black text-gray-900">Add New Game</h3>
                                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                                    <i className='bx bx-x text-2xl'></i>
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 mb-1">SPORT</label>
                                        <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={newGame.sport} onChange={e => setNewGame({...newGame, sport: e.target.value})}>
                                            {sports.map(s => <option key={s}>{s}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 mb-1">CATEGORY</label>
                                        <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={newGame.category} onChange={e => setNewGame({...newGame, category: e.target.value})}>
                                            <option>Men's</option>
                                            <option>Women's</option>
                                            <option>Mixed</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 mb-1">TEAM 1</label>
                                        <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={newGame.team1} onChange={e => setNewGame({...newGame, team1: e.target.value})}>
                                            {departments.map(d => <option key={d}>{d}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 mb-1">TEAM 2</label>
                                        <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={newGame.team2} onChange={e => setNewGame({...newGame, team2: e.target.value})}>
                                            {departments.map(d => <option key={d}>{d}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 mb-1">DATE</label>
                                        <input type="date" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={newGame.date} onChange={e => setNewGame({...newGame, date: e.target.value})} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 mb-1">TIME</label>
                                        <input type="time" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={newGame.time} onChange={e => setNewGame({...newGame, time: e.target.value})} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 mb-1">VENUE</label>
                                    <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={newGame.venue} onChange={e => setNewGame({...newGame, venue: e.target.value})}>
                                        <option value="">Select venue...</option>
                                        {venues.map(v => <option key={v}>{v}</option>)}
                                    </select>
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button onClick={() => setShowAddModal(false)} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition">
                                        Cancel
                                    </button>
                                    <button onClick={addGame} className="flex-1 bg-blue-600 text-white font-bold py-2.5 rounded-xl hover:bg-blue-700 transition">
                                        Add Game
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageGames;
