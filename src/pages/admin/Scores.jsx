// src/pages/admin/Scores.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import 'boxicons/css/boxicons.min.css';

const API = 'http://localhost:5000/api/games';

const SPORT_ICONS = {
    'Cricket': '🏏', 'Football': '⚽', 'Tug of War': '🪢',
    'Dodge Ball': '🎯', '100m Race': '🏃', 'Badminton': '🏸',
    'Bottle Spin Chase': '🍾', '4×100m Relay': '🔁',
};

const Scores = () => {
    const [matches,  setMatches]  = useState([]);
    const [loading,  setLoading]  = useState(true);
    const [editing,  setEditing]  = useState(null);   // match._id being edited
    const [editData, setEditData] = useState({});
    const [saving,   setSaving]   = useState(false);
    const [saved,    setSaved]    = useState(null);
    const [error,    setError]    = useState('');

    // ── Fetch all matches from backend ──
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(API);
                setMatches(res.data.data || []);
            } catch (err) {
                setError('Failed to load matches.');
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    // ── Start editing a match ──
    const startEdit = (match) => {
        setEditing(match._id);
        setEditData({
            scoreA: match.scoreA ?? '',
            scoreB: match.scoreB ?? '',
            result: match.result || '',
            status: match.status,
        });
        setError('');
    };

    // ── Save score update to backend ──
    const saveEdit = async (id) => {
        setSaving(true);
        try {
            const res = await axios.patch(`${API}/${id}`, {
                scoreA: editData.scoreA !== '' ? Number(editData.scoreA) : null,
                scoreB: editData.scoreB !== '' ? Number(editData.scoreB) : null,
                result: editData.result,
                status: editData.status,
            });
            setMatches(prev => prev.map(m => m._id === id ? res.data.data : m));
            setEditing(null);
            setSaved(id);
            setTimeout(() => setSaved(null), 2500);
        } catch (err) {
            setError('Failed to save. Try again.');
        } finally {
            setSaving(false);
        }
    };

    // ── Quick Go Live ──
    const goLive = async (match) => {
        try {
            const res = await axios.patch(`${API}/${match._id}`, { status: 'live' });
            setMatches(prev => prev.map(m => m._id === match._id ? res.data.data : m));
        } catch (err) {
            setError('Failed to go live.');
        }
    };

    // ── Quick Mark Completed ──
    const markCompleted = async (match) => {
        try {
            const res = await axios.patch(`${API}/${match._id}`, { status: 'completed' });
            setMatches(prev => prev.map(m => m._id === match._id ? res.data.data : m));
        } catch (err) {
            setError('Failed to update.');
        }
    };

    const counts = {
        upcoming:  matches.filter(m => m.status === 'upcoming').length,
        live:      matches.filter(m => m.status === 'live').length,
        completed: matches.filter(m => m.status === 'completed').length,
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

                {/* Error */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-6 flex items-center gap-2">
                        <i className='bx bx-error-circle'></i> {error}
                        <button onClick={() => setError('')} className="ml-auto text-red-400 hover:text-red-600">✕</button>
                    </div>
                )}

                {/* Summary Cards */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    {[
                        { label: 'Upcoming',  count: counts.upcoming,  color: 'bg-orange-100 text-orange-700 border-orange-200' },
                        { label: 'Live Now',  count: counts.live,      color: 'bg-red-100 text-red-700 border-red-200'           },
                        { label: 'Completed', count: counts.completed, color: 'bg-green-100 text-green-700 border-green-200'     },
                    ].map((s, i) => (
                        <div key={i} className={`rounded-xl border p-4 text-center ${s.color}`}>
                            <div className="text-3xl font-black">{s.count}</div>
                            <div className="text-sm font-semibold">{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* Loading */}
                {loading ? (
                    <div className="flex items-center justify-center py-20 text-gray-400">
                        <i className='bx bx-loader-alt animate-spin text-3xl mr-3'></i> Loading matches...
                    </div>
                ) : matches.length === 0 ? (
                    <div className="text-center py-20 text-gray-400">
                        <i className='bx bx-football text-5xl mb-3 block'></i>
                        <p className="font-semibold">No matches found</p>
                        <Link to="/admin/games" className="mt-4 inline-block bg-blue-600 text-white text-sm font-bold px-5 py-2 rounded-xl hover:bg-blue-700 transition">
                            + Add Matches First
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {matches.map((match, i) => (
                            <motion.div
                                key={match._id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.06 }}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                            >
                                {/* Match header bar */}
                                <div className={`px-5 py-3 flex items-center justify-between ${
                                    match.status === 'live'      ? 'bg-red-600' :
                                    match.status === 'completed' ? 'bg-green-600' :
                                    'bg-gray-700'
                                } text-white`}>
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <span className="text-xl">{SPORT_ICONS[match.sport] || '🏅'}</span>
                                        <span className="font-bold text-sm">{match.sport} · {match.category}</span>
                                        <span className="text-white/70 text-xs">
                                            {new Date(match.date).toLocaleString('en-PK', { dateStyle: 'medium', timeStyle: 'short' })} · {match.venue || 'TBD'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {match.status === 'live' && (
                                            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                        )}
                                        <span className="text-xs font-bold uppercase bg-white/20 px-2 py-0.5 rounded-full">
                                            {match.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Score body */}
                                <div className="p-5">
                                    {editing === match._id ? (
                                        /* ── Edit Form ── */
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-500 mb-1">{match.teamA} SCORE</label>
                                                    <input
                                                        type="number"
                                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-center font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        value={editData.scoreA}
                                                        onChange={e => setEditData({...editData, scoreA: e.target.value})}
                                                        placeholder="0"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-500 mb-1">{match.teamB} SCORE</label>
                                                    <input
                                                        type="number"
                                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-center font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        value={editData.scoreB}
                                                        onChange={e => setEditData({...editData, scoreB: e.target.value})}
                                                        placeholder="0"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-500 mb-1">STATUS</label>
                                                    <select
                                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        value={editData.status}
                                                        onChange={e => setEditData({...editData, status: e.target.value})}
                                                    >
                                                        <option value="upcoming">Upcoming</option>
                                                        <option value="live">Live</option>
                                                        <option value="completed">Completed</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-500 mb-1">RESULT SUMMARY</label>
                                                    <input
                                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        value={editData.result}
                                                        onChange={e => setEditData({...editData, result: e.target.value})}
                                                        placeholder="e.g. CE won by 45 runs"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => setEditing(null)}
                                                    className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2 rounded-xl hover:bg-gray-50 transition text-sm"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={() => saveEdit(match._id)}
                                                    disabled={saving}
                                                    className="flex-1 bg-blue-600 text-white font-bold py-2 rounded-xl hover:bg-blue-700 disabled:bg-blue-400 transition text-sm flex items-center justify-center gap-2"
                                                >
                                                    {saving
                                                        ? <><i className='bx bx-loader-alt animate-spin'></i> Saving...</>
                                                        : <><i className='bx bx-save'></i> Save to Database</>
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        /* ── Score Display ── */
                                        <div className="flex items-center gap-4 flex-wrap">
                                            <div className="flex-1 flex items-center justify-center gap-8">
                                                <div className="text-center">
                                                    <div className="text-2xl font-black text-gray-900">{match.teamA}</div>
                                                    <div className="text-3xl font-black text-blue-600 mt-1">
                                                        {match.scoreA !== null && match.scoreA !== undefined ? match.scoreA : '—'}
                                                    </div>
                                                </div>
                                                <div className="text-gray-300 font-black text-xl">VS</div>
                                                <div className="text-center">
                                                    <div className="text-2xl font-black text-gray-900">{match.teamB}</div>
                                                    <div className="text-3xl font-black text-blue-600 mt-1">
                                                        {match.scoreB !== null && match.scoreB !== undefined ? match.scoreB : '—'}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end gap-2">
                                                {match.result && (
                                                    <span className="text-sm text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full font-semibold">
                                                        🏆 {match.result}
                                                    </span>
                                                )}
                                                {saved === match._id && (
                                                    <span className="text-xs text-green-600 font-bold flex items-center gap-1">
                                                        <i className='bx bx-check'></i> Saved!
                                                    </span>
                                                )}
                                                <div className="flex gap-2 flex-wrap justify-end">
                                                    {match.status === 'upcoming' && (
                                                        <button
                                                            onClick={() => goLive(match)}
                                                            className="text-xs bg-red-600 text-white font-bold px-3 py-1.5 rounded-lg hover:bg-red-700 transition flex items-center gap-1"
                                                        >
                                                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span> Go Live
                                                        </button>
                                                    )}
                                                    {match.status === 'live' && (
                                                        <button
                                                            onClick={() => markCompleted(match)}
                                                            className="text-xs bg-green-600 text-white font-bold px-3 py-1.5 rounded-lg hover:bg-green-700 transition flex items-center gap-1"
                                                        >
                                                            <i className='bx bx-check'></i> Mark Completed
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => startEdit(match)}
                                                        className="text-xs bg-blue-600 text-white font-bold px-3 py-1.5 rounded-lg hover:bg-blue-700 transition flex items-center gap-1"
                                                    >
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
                )}
            </div>
        </div>
    );
};

export default Scores;
