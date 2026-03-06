// src/pages/admin/ManageGames.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import 'boxicons/css/boxicons.min.css';

const API = 'http://localhost:5000/api/games';

const SPORTS = ['Cricket', 'Football', 'Tug of War', 'Dodge Ball', '100m Race', 'Badminton', 'Bottle Spin Chase', '4×100m Relay'];
const DEPTS  = ['CE', 'ME', 'EE', 'CVE', 'AR'];

const STATUS_STYLES = {
    upcoming:  { bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-400', label: 'Upcoming' },
    live:      { bg: 'bg-red-100',    text: 'text-red-700',    dot: 'bg-red-500',    label: '🔴 Live' },
    completed: { bg: 'bg-green-100',  text: 'text-green-700',  dot: 'bg-green-500',  label: 'Completed' },
};

const SPORT_ICONS = {
    'Cricket': '🏏', 'Football': '⚽', 'Tug of War': '🪢',
    'Dodge Ball': '🎯', '100m Race': '🏃', 'Badminton': '🏸',
    'Bottle Spin Chase': '🍾', '4×100m Relay': '🔁',
};

const emptyForm = {
    sport: '', teamA: '', teamB: '', category: "Men's",
    venue: '', date: '', notes: '', status: 'upcoming',
    scoreA: '', scoreB: '', result: '',
};

export default function ManageGames() {
    const [games,        setGames]        = useState([]);
    const [loading,      setLoading]      = useState(true);
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterSport,  setFilterSport]  = useState('all');

    const [modal,    setModal]    = useState(null);
    const [selected, setSelected] = useState(null);
    const [form,     setForm]     = useState(emptyForm);
    const [saving,   setSaving]   = useState(false);
    const [error,    setError]    = useState('');

    const fetchGames = async () => {
        try {
            const res = await axios.get(API);
            setGames(res.data.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchGames(); }, []);

    // ── Filter: values are all lowercase matching MongoDB ──
    const filtered = games.filter(g => {
        const statusMatch = filterStatus === 'all' || g.status === filterStatus;
        const sportMatch  = filterSport  === 'all' || g.sport  === filterSport;
        return statusMatch && sportMatch;
    });

    const counts = {
        total:     games.length,
        upcoming:  games.filter(g => g.status === 'upcoming').length,
        live:      games.filter(g => g.status === 'live').length,
        completed: games.filter(g => g.status === 'completed').length,
    };

    const openAdd    = ()     => { setForm(emptyForm); setError(''); setModal('add'); };
    const openEdit   = (game) => {
        setSelected(game);
        setForm({
            sport:    game.sport,
            teamA:    game.teamA,
            teamB:    game.teamB,
            category: game.category,
            venue:    game.venue   || '',
            date:     game.date    ? game.date.slice(0, 16) : '',
            notes:    game.notes   || '',
            status:   game.status,
            scoreA:   game.scoreA  ?? '',
            scoreB:   game.scoreB  ?? '',
            result:   game.result  || '',
        });
        setError('');
        setModal('edit');
    };
    const openDelete = (game) => { setSelected(game); setModal('delete'); };
    const openStatus = (game) => { setSelected(game); setModal('status'); };
    const closeModal = ()     => { setModal(null); setSelected(null); setError(''); };

    const handleSave = async () => {
        if (!form.sport || !form.teamA || !form.teamB || !form.date) {
            setError('Sport, Team A, Team B and Date are required.');
            return;
        }
        setSaving(true);
        try {
            if (modal === 'add') {
                const res = await axios.post(API, form);
                setGames(prev => [...prev, res.data.data]);
            } else {
                const res = await axios.patch(`${API}/${selected._id}`, form);
                setGames(prev => prev.map(g => g._id === selected._id ? res.data.data : g));
            }
            closeModal();
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        setSaving(true);
        try {
            await axios.delete(`${API}/${selected._id}`);
            setGames(prev => prev.filter(g => g._id !== selected._id));
            closeModal();
        } catch (err) {
            setError('Failed to delete.');
        } finally {
            setSaving(false);
        }
    };

    const handleStatusChange = async (newStatus) => {
        setSaving(true);
        try {
            const res = await axios.patch(`${API}/${selected._id}`, { status: newStatus });
            setGames(prev => prev.map(g => g._id === selected._id ? res.data.data : g));
            closeModal();
        } catch (err) {
            setError('Failed to update status.');
        } finally {
            setSaving(false);
        }
    };

    const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white";

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Header */}
            <div className="bg-gray-900 text-white py-8">
                <div className="container mx-auto px-4 flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                            <Link to="/admin/dashboard" className="hover:text-white transition">Dashboard</Link>
                            <span>/</span>
                            <span className="text-white">Manage Games</span>
                        </div>
                        <h1 className="text-3xl font-black">Manage Games</h1>
                        <p className="text-gray-400 text-sm mt-1">BZU Engineering Sports Week · 2027</p>
                    </div>
                    <button onClick={openAdd}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl transition flex items-center gap-2">
                        <i className='bx bx-plus text-lg'></i> Add Match
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">

                {/* Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Total',     value: counts.total,     icon: 'bx-football',     color: 'bg-blue-500',   key: 'all'       },
                        { label: 'Upcoming',  value: counts.upcoming,  icon: 'bx-time',         color: 'bg-orange-500', key: 'upcoming'  },
                        { label: 'Live',      value: counts.live,      icon: 'bx-radio-circle', color: 'bg-red-500',    key: 'live'      },
                        { label: 'Completed', value: counts.completed, icon: 'bx-check-circle', color: 'bg-green-500',  key: 'completed' },
                    ].map((s, i) => (
                        <motion.div key={i}
                            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                            onClick={() => setFilterStatus(s.key)}
                            className={`bg-white rounded-xl p-4 shadow-sm border cursor-pointer hover:shadow-md transition ${
                                filterStatus === s.key ? 'border-blue-400 ring-2 ring-blue-200' : 'border-gray-100'
                            }`}
                        >
                            <div className={`w-10 h-10 ${s.color} rounded-lg flex items-center justify-center mb-3`}>
                                <i className={`bx ${s.icon} text-white text-xl`}></i>
                            </div>
                            <div className="text-2xl font-black text-gray-900">{s.value}</div>
                            <div className="text-xs font-semibold text-gray-500 mt-0.5">{s.label} Matches</div>
                        </motion.div>
                    ))}
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-wrap gap-3 items-center justify-between">
                    <div className="flex gap-3 flex-wrap">
                        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                            className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="all">All Status</option>
                            <option value="upcoming">Upcoming</option>
                            <option value="live">Live</option>
                            <option value="completed">Completed</option>
                        </select>
                        <select value={filterSport} onChange={e => setFilterSport(e.target.value)}
                            className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="all">All Sports</option>
                            {SPORTS.map(v => <option key={v} value={v}>{v}</option>)}
                        </select>
                    </div>
                    <div className="flex items-center gap-3">
                        <p className="text-xs text-gray-400">
                            Showing <span className="font-bold text-gray-700">{filtered.length}</span> of {games.length} matches
                        </p>
                        {(filterStatus !== 'all' || filterSport !== 'all') && (
                            <button onClick={() => { setFilterStatus('all'); setFilterSport('all'); }}
                                className="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1">
                                <i className='bx bx-x'></i> Clear
                            </button>
                        )}
                    </div>
                </div>

                {/* Games Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center py-20 text-gray-400">
                            <i className='bx bx-loader-alt animate-spin text-3xl mr-3'></i> Loading matches...
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-20 text-gray-400">
                            <i className='bx bx-football text-5xl mb-3 block'></i>
                            <p className="font-semibold">No matches found</p>
                            <button onClick={openAdd} className="mt-4 bg-blue-600 text-white text-sm font-bold px-5 py-2 rounded-xl hover:bg-blue-700 transition">
                                + Add First Match
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100 text-left">
                                        <th className="px-5 py-3 text-xs font-black text-gray-500 uppercase tracking-wide">#</th>
                                        <th className="px-5 py-3 text-xs font-black text-gray-500 uppercase tracking-wide">Match</th>
                                        <th className="px-5 py-3 text-xs font-black text-gray-500 uppercase tracking-wide">Sport</th>
                                        <th className="px-5 py-3 text-xs font-black text-gray-500 uppercase tracking-wide">Date & Venue</th>
                                        <th className="px-5 py-3 text-xs font-black text-gray-500 uppercase tracking-wide">Score / Result</th>
                                        <th className="px-5 py-3 text-xs font-black text-gray-500 uppercase tracking-wide">Status</th>
                                        <th className="px-5 py-3 text-xs font-black text-gray-500 uppercase tracking-wide">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filtered.map((g, i) => {
                                        const ss = STATUS_STYLES[g.status] || STATUS_STYLES.upcoming;
                                        return (
                                            <motion.tr key={g._id}
                                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                                                className="hover:bg-gray-50 transition"
                                            >
                                                <td className="px-5 py-4 text-gray-400 font-mono text-xs">{i + 1}</td>
                                                <td className="px-5 py-4">
                                                    <p className="font-black text-gray-900">{g.teamA} <span className="text-gray-400 font-normal">vs</span> {g.teamB}</p>
                                                    <p className="text-xs text-gray-400">{g.category}</p>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className="flex items-center gap-1.5">
                                                        <span>{SPORT_ICONS[g.sport] || '🏅'}</span>
                                                        <span className="font-semibold text-gray-700">{g.sport}</span>
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <p className="font-semibold text-gray-800 text-xs">
                                                        {g.date ? new Date(g.date).toLocaleString('en-PK', { dateStyle: 'medium', timeStyle: 'short' }) : '—'}
                                                    </p>
                                                    <p className="text-xs text-gray-400">{g.venue || 'TBD'}</p>
                                                </td>
                                                <td className="px-5 py-4">
                                                    {g.result ? (
                                                        <p className="text-xs font-semibold text-green-700">{g.result}</p>
                                                    ) : (g.scoreA !== null && g.scoreB !== null && g.scoreA !== '' && g.scoreB !== '') ? (
                                                        <p className="text-sm font-black text-gray-900">{g.scoreA} – {g.scoreB}</p>
                                                    ) : (
                                                        <p className="text-xs text-gray-400">—</p>
                                                    )}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${ss.bg} ${ss.text}`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${ss.dot} ${g.status === 'live' ? 'animate-pulse' : ''}`}></span>
                                                        {ss.label}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <button onClick={() => openStatus(g)}
                                                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-2.5 py-1.5 rounded-lg transition flex items-center gap-1">
                                                            <i className='bx bx-transfer'></i> Status
                                                        </button>
                                                        <button onClick={() => openEdit(g)}
                                                            className="bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs font-bold px-2.5 py-1.5 rounded-lg transition flex items-center gap-1">
                                                            <i className='bx bx-edit'></i>
                                                        </button>
                                                        <button onClick={() => openDelete(g)}
                                                            className="bg-red-100 hover:bg-red-200 text-red-700 text-xs font-bold px-2.5 py-1.5 rounded-lg transition flex items-center gap-1">
                                                            <i className='bx bx-trash'></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Modals ── */}
            <AnimatePresence>
                {(modal === 'add' || modal === 'edit') && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
                        onClick={closeModal}
                    >
                        <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg my-8"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="bg-gray-900 text-white px-6 py-5 flex items-center justify-between rounded-t-2xl">
                                <h3 className="font-black text-lg">{modal === 'add' ? '➕ Add New Match' : '✏️ Edit Match'}</h3>
                                <button onClick={closeModal} className="text-gray-400 hover:text-white text-2xl">×</button>
                            </div>
                            <div className="p-6 space-y-4">
                                {error && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                                        <i className='bx bx-error-circle'></i> {error}
                                    </div>
                                )}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Sport <span className="text-red-500">*</span></label>
                                    <select value={form.sport} onChange={e => setForm({...form, sport: e.target.value})} className={inputCls}>
                                        <option value="">Select Sport</option>
                                        {SPORTS.map(s => <option key={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Team A <span className="text-red-500">*</span></label>
                                        <select value={form.teamA} onChange={e => setForm({...form, teamA: e.target.value})} className={inputCls}>
                                            <option value="">Select Dept</option>
                                            {DEPTS.map(d => <option key={d}>{d}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Team B <span className="text-red-500">*</span></label>
                                        <select value={form.teamB} onChange={e => setForm({...form, teamB: e.target.value})} className={inputCls}>
                                            <option value="">Select Dept</option>
                                            {DEPTS.map(d => <option key={d}>{d}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category <span className="text-red-500">*</span></label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {["Men's", "Women's"].map(c => (
                                            <label key={c} className={`border rounded-xl py-2.5 text-center cursor-pointer transition font-bold text-sm ${
                                                form.category === c ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-200 text-gray-600 hover:border-blue-300'
                                            }`}>
                                                <input type="radio" className="hidden" value={c} checked={form.category === c} onChange={() => setForm({...form, category: c})} />
                                                {c === "Men's" ? '👨 ' : '👩 '}{c}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date & Time <span className="text-red-500">*</span></label>
                                        <input type="datetime-local" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className={inputCls} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Venue</label>
                                        <input placeholder="e.g. Main Ground" value={form.venue} onChange={e => setForm({...form, venue: e.target.value})} className={inputCls} />
                                    </div>
                                </div>
                                {modal === 'edit' && (
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Score — {form.teamA || 'Team A'}</label>
                                            <input type="number" placeholder="0" value={form.scoreA} onChange={e => setForm({...form, scoreA: e.target.value})} className={inputCls} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Score — {form.teamB || 'Team B'}</label>
                                            <input type="number" placeholder="0" value={form.scoreB} onChange={e => setForm({...form, scoreB: e.target.value})} className={inputCls} />
                                        </div>
                                    </div>
                                )}
                                {modal === 'edit' && (
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Result Summary</label>
                                        <input placeholder="e.g. CE won by 45 runs" value={form.result} onChange={e => setForm({...form, result: e.target.value})} className={inputCls} />
                                    </div>
                                )}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Notes</label>
                                    <textarea rows={2} placeholder="Any extra info..." value={form.notes} onChange={e => setForm({...form, notes: e.target.value})}
                                        className={inputCls + ' resize-none'} />
                                </div>
                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    <button onClick={closeModal} className="border border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition">Cancel</button>
                                    <button onClick={handleSave} disabled={saving}
                                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-black py-3 rounded-xl transition flex items-center justify-center gap-2">
                                        {saving ? <><i className='bx bx-loader-alt animate-spin'></i> Saving...</> : <><i className='bx bx-check'></i> {modal === 'add' ? 'Add Match' : 'Save Changes'}</>}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {modal === 'status' && selected && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                        onClick={closeModal}
                    >
                        <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="bg-gray-900 text-white px-6 py-5 rounded-t-2xl flex items-center justify-between">
                                <h3 className="font-black">Change Match Status</h3>
                                <button onClick={closeModal} className="text-gray-400 hover:text-white text-2xl">×</button>
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-gray-500 mb-4">
                                    <span className="font-bold text-gray-900">{selected.teamA} vs {selected.teamB}</span> · {selected.sport}
                                </p>
                                <div className="space-y-3">
                                    {[
                                        { key: 'upcoming',  label: '🕐 Mark as Upcoming', cls: 'bg-orange-100 hover:bg-orange-200 text-orange-700' },
                                        { key: 'live',      label: '🔴 Mark as Live',      cls: 'bg-red-100 hover:bg-red-200 text-red-700' },
                                        { key: 'completed', label: '✅ Mark as Completed', cls: 'bg-green-100 hover:bg-green-200 text-green-700' },
                                    ].map(s => (
                                        <button key={s.key}
                                            onClick={() => handleStatusChange(s.key)}
                                            disabled={selected.status === s.key || saving}
                                            className={`w-full font-bold py-3 rounded-xl transition ${s.cls} disabled:opacity-40 disabled:cursor-not-allowed`}
                                        >
                                            {s.label} {selected.status === s.key && '(current)'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {modal === 'delete' && selected && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                        onClick={closeModal}
                    >
                        <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-6 text-center">
                                <div className="text-5xl mb-4">🗑️</div>
                                <h3 className="font-black text-gray-900 text-lg mb-2">Delete Match?</h3>
                                <p className="text-gray-500 text-sm mb-6">
                                    <span className="font-bold text-gray-800">{selected.teamA} vs {selected.teamB}</span> · {selected.sport}<br />
                                    This action cannot be undone.
                                </p>
                                <div className="grid grid-cols-2 gap-3">
                                    <button onClick={closeModal} className="border border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition">Cancel</button>
                                    <button onClick={handleDelete} disabled={saving}
                                        className="bg-red-600 hover:bg-red-700 text-white font-black py-3 rounded-xl transition flex items-center justify-center gap-2">
                                        {saving ? <><i className='bx bx-loader-alt animate-spin'></i> Deleting...</> : <><i className='bx bx-trash'></i> Delete</>}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
