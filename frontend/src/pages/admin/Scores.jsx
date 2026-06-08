// src/pages/admin/Scores.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import 'boxicons/css/boxicons.min.css';

const Scores = () => {
    const [matches, setMatches] = useState([
        { id: 1, sport: 'Cricket', icon: '🏏', category: "Men's", team1: 'CE', team2: 'ME', date: 'Feb 8', time: '3:00 PM', venue: 'Oval Ground', status: 'completed', score1: '185/6', score2: '140/9', winner: 'CE', result: 'CE won by 45 runs' },
        { id: 2, sport: 'Football', icon: '⚽', category: "Women's", team1: 'EE', team2: 'CVE', date: 'Feb 7', time: '4:30 PM', venue: 'Football Field', status: 'completed', score1: '2', score2: '1', winner: 'EE', result: 'EE won 2-1' },
        { id: 3, sport: 'Basketball', icon: '🏀', category: "Men's", team1: 'AR', team2: 'CE', date: 'Today', time: '9:00 AM', venue: 'Indoor Court', status: 'upcoming', score1: '', score2: '', winner: '', result: '' },
        { id: 4, sport: 'Volleyball', icon: '🏐', category: "Women's", team1: 'ME', team2: 'EE', date: 'Tomorrow', time: '2:00 PM', venue: 'Court 1', status: 'upcoming', score1: '', score2: '', winner: '', result: '' },
    ]);

    const [editing, setEditing] = useState(null);
    const [editData, setEditData] = useState({});
    const [saved, setSaved] = useState(null);

    const startEdit = (match) => {
        setEditing(match.id);
        setEditData({ score1: match.score1, score2: match.score2, winner: match.winner, result: match.result, status: match.status });
    };

    const saveEdit = (id) => {
        setMatches(matches.map(m => m.id === id ? { ...m, ...editData } : m));
        setEditing(null);
        setSaved(id);
        setTimeout(() => setSaved(null), 2000);
    };

    const setLive = (id) => {
        setMatches(matches.map(m => m.id === id ? { ...m, status: 'live' } : m));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gray-900 text-white py-8">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                        <Link to="/admin/dashboard" className="hover:text-white transition">Dashboard</Link>
                        <i className='bx bx-chevron-right'></i>
                        <span className="text-white">Update Scores</span>
                    </div>
                    <h1 className="text-3xl font-black">Update Scores</h1>
                    <p className="text-gray-400 text-sm mt-1">Manage match results and live scores</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Status summary */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    {[
                        { label: 'Upcoming', count: matches.filter(m => m.status === 'upcoming').length, color: 'bg-orange-100 text-orange-700 border-orange-200' },
                        { label: 'Live Now', count: matches.filter(m => m.status === 'live').length, color: 'bg-red-100 text-red-700 border-red-200' },
                        { label: 'Completed', count: matches.filter(m => m.status === 'completed').length, color: 'bg-green-100 text-green-700 border-green-200' },
                    ].map((s, i) => (
                        <div key={i} className={`rounded-xl border p-4 text-center ${s.color}`}>
                            <div className="text-3xl font-black">{s.count}</div>
                            <div className="text-sm font-semibold">{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* Match Cards */}
                <div className="space-y-4">
                    {matches.map((match, i) => (
                        <motion.div
                            key={match.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                        >
                            {/* Match header */}
                            <div className={`px-5 py-3 flex items-center justify-between ${
                                match.status === 'live' ? 'bg-red-600' :
                                match.status === 'completed' ? 'bg-green-600' :
                                'bg-gray-700'
                            } text-white`}>
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">{match.icon}</span>
                                    <span className="font-bold text-sm">{match.sport} · {match.category}</span>
                                    <span className="text-white/70 text-xs">{match.date} · {match.time} · {match.venue}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    {match.status === 'live' && <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>}
                                    <span className="text-xs font-bold uppercase bg-white/20 px-2 py-0.5 rounded-full">{match.status}</span>
                                </div>
                            </div>

                            {/* Score area */}
                            <div className="p-5">
                                {editing === match.id ? (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 mb-1">{match.team1} SCORE</label>
                                                <input
                                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-center font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={editData.score1}
                                                    onChange={e => setEditData({...editData, score1: e.target.value})}
                                                    placeholder="e.g. 185/6"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 mb-1">{match.team2} SCORE</label>
                                                <input
                                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-center font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={editData.score2}
                                                    onChange={e => setEditData({...editData, score2: e.target.value})}
                                                    placeholder="e.g. 140/9"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 mb-1">WINNER</label>
                                                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={editData.winner} onChange={e => setEditData({...editData, winner: e.target.value})}>
                                                    <option value="">— No winner yet —</option>
                                                    <option value={match.team1}>{match.team1}</option>
                                                    <option value={match.team2}>{match.team2}</option>
                                                    <option value="Draw">Draw</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 mb-1">STATUS</label>
                                                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={editData.status} onChange={e => setEditData({...editData, status: e.target.value})}>
                                                    <option value="upcoming">Upcoming</option>
                                                    <option value="live">Live</option>
                                                    <option value="completed">Completed</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1">RESULT SUMMARY</label>
                                            <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                value={editData.result} onChange={e => setEditData({...editData, result: e.target.value})}
                                                placeholder="e.g. CE won by 45 runs" />
                                        </div>
                                        <div className="flex gap-3">
                                            <button onClick={() => setEditing(null)} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2 rounded-xl hover:bg-gray-50 transition text-sm">
                                                Cancel
                                            </button>
                                            <button onClick={() => saveEdit(match.id)} className="flex-1 bg-blue-600 text-white font-bold py-2 rounded-xl hover:bg-blue-700 transition text-sm flex items-center justify-center gap-2">
                                                <i className='bx bx-save'></i> Save
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-4 flex-wrap">
                                        {/* Score display */}
                                        <div className="flex-1 flex items-center justify-center gap-6">
                                            <div className="text-center">
                                                <div className="text-2xl font-black text-gray-900">{match.team1}</div>
                                                <div className="text-3xl font-black text-blue-600 mt-1">{match.score1 || '—'}</div>
                                            </div>
                                            <div className="text-gray-300 font-black text-xl">VS</div>
                                            <div className="text-center">
                                                <div className="text-2xl font-black text-gray-900">{match.team2}</div>
                                                <div className="text-3xl font-black text-blue-600 mt-1">{match.score2 || '—'}</div>
                                            </div>
                                        </div>

                                        {/* Result & actions */}
                                        <div className="flex flex-col items-end gap-2">
                                            {match.result && (
                                                <span className="text-sm text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full font-semibold">
                                                    🏆 {match.result}
                                                </span>
                                            )}
                                            {saved === match.id && (
                                                <span className="text-xs text-green-600 font-bold flex items-center gap-1">
                                                    <i className='bx bx-check'></i> Saved!
                                                </span>
                                            )}
                                            <div className="flex gap-2">
                                                {match.status === 'upcoming' && (
                                                    <button onClick={() => setLive(match.id)} className="text-xs bg-red-600 text-white font-bold px-3 py-1.5 rounded-lg hover:bg-red-700 transition flex items-center gap-1">
                                                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span> Go Live
                                                    </button>
                                                )}
                                                <button onClick={() => startEdit(match)} className="text-xs bg-blue-600 text-white font-bold px-3 py-1.5 rounded-lg hover:bg-blue-700 transition flex items-center gap-1">
                                                    <i className='bx bx-edit'></i> Update Score
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Scores;
