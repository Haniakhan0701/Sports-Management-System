// src/pages/admin/Registrations.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import 'boxicons/css/boxicons.min.css';

const STATUS_COLORS = {
    pending:  { bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-400' },
    approved: { bg: 'bg-green-100',  text: 'text-green-700',  dot: 'bg-green-500' },
    rejected: { bg: 'bg-red-100',    text: 'text-red-700',    dot: 'bg-red-500' },
};

const SPORTS = ['All', 'Cricket', 'Football', 'Tug of War', 'Dodge Ball', '100m Race', 'Badminton', 'Bottle Spin Chase', '4×100m Relay'];
const DEPTS  = ['All', 'CE', 'ME', 'EE', 'CVE', 'AR'];

export default function Registrations() {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading]             = useState(true);
    const [actionLoading, setActionLoading] = useState(null); // id being updated

    // Filters
    const [search,         setSearch]         = useState('');
    const [filterStatus,   setFilterStatus]   = useState('All');
    const [filterSport,    setFilterSport]    = useState('All');
    const [filterDept,     setFilterDept]     = useState('All');
    const [filterCategory, setFilterCategory] = useState('All');

    // Detail modal
    const [selected, setSelected] = useState(null);

    // Fetch all registrations
    const fetchRegistrations = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/registrations');
            setRegistrations(res.data.data || res.data || []);
        } catch (err) {
            console.error('Failed to fetch registrations', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchRegistrations(); }, []);

    // Update status
    const updateStatus = async (id, status) => {
        setActionLoading(id + status);
        try {
            await axios.patch(`http://localhost:5000/api/registrations/${id}`, { status });
            setRegistrations(prev =>
                prev.map(r => r._id === id ? { ...r, status } : r)
            );
            if (selected?._id === id) setSelected(prev => ({ ...prev, status }));
        } catch (err) {
            alert('Failed to update status. Please try again.');
        } finally {
            setActionLoading(null);
        }
    };

    // Filtered list
    const filtered = registrations.filter(r => {
        const q = search.toLowerCase();
        const matchSearch = !q ||
            r.fullName?.toLowerCase().includes(q) ||
            r.rollNumber?.toLowerCase().includes(q) ||
            r.email?.toLowerCase().includes(q) ||
            r.phone?.includes(q);
        const matchStatus   = filterStatus   === 'All' || r.status   === filterStatus.toLowerCase();
        const matchSport    = filterSport    === 'All' || (Array.isArray(r.sports) ? r.sports.includes(filterSport) : r.sport === filterSport);
        const matchDept     = filterDept     === 'All' || r.department === filterDept;
        const matchCategory = filterCategory === 'All' || r.category === filterCategory;
        return matchSearch && matchStatus && matchSport && matchDept && matchCategory;
    });

    // Summary counts
    const counts = {
        total:    registrations.length,
        pending:  registrations.filter(r => r.status === 'pending').length,
        approved: registrations.filter(r => r.status === 'approved').length,
        rejected: registrations.filter(r => r.status === 'rejected').length,
    };

    const whatsappLink = (phone, name) =>
        `https://wa.me/${phone.replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(name)}%2C%20your%20BZU%20Sports%20Week%20registration%20has%20been%20approved!`;

    const emailLink = (email, name, status) =>
        `mailto:${email}?subject=BZU%20Sports%20Week%20Registration%20Update&body=Dear%20${encodeURIComponent(name)}%2C%0A%0AYour%20registration%20has%20been%20${status}.%0A%0ABZU%20Sports%20Committee`;

    return (
        <div className="min-h-screen bg-gray-50">

            {/* ── Header ── */}
            <div className="bg-gray-900 text-white py-8">
                <div className="container mx-auto px-4 flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                            <Link to="/admin" className="hover:text-white transition">Dashboard</Link>
                            <span>/</span>
                            <span className="text-white">Registrations</span>
                        </div>
                        <h1 className="text-3xl font-black">Athlete Registrations</h1>
                        <p className="text-gray-400 text-sm mt-1">BZU Engineering Sports Week · 2027</p>
                    </div>
                    <button
                        onClick={fetchRegistrations}
                        className="bg-white/10 hover:bg-white/20 text-white text-sm font-bold px-4 py-2 rounded-lg transition flex items-center gap-2"
                    >
                        <i className='bx bx-refresh'></i> Refresh
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">

                {/* ── Summary Cards ── */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Total',    value: counts.total,    icon: 'bx-group',        color: 'bg-blue-500' },
                        { label: 'Pending',  value: counts.pending,  icon: 'bx-time',         color: 'bg-orange-500' },
                        { label: 'Approved', value: counts.approved, icon: 'bx-check-circle', color: 'bg-green-500' },
                        { label: 'Rejected', value: counts.rejected, icon: 'bx-x-circle',     color: 'bg-red-500' },
                    ].map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.07 }}
                            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition"
                            onClick={() => setFilterStatus(s.label === 'Total' ? 'All' : s.label)}
                        >
                            <div className={`w-10 h-10 ${s.color} rounded-lg flex items-center justify-center mb-3`}>
                                <i className={`bx ${s.icon} text-white text-xl`}></i>
                            </div>
                            <div className="text-2xl font-black text-gray-900">{s.value}</div>
                            <div className="text-xs font-semibold text-gray-500 mt-0.5">{s.label} Registrations</div>
                        </motion.div>
                    ))}
                </div>

                {/* ── Filters ── */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                        {/* Search */}
                        <div className="lg:col-span-2 relative">
                            <i className='bx bx-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'></i>
                            <input
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search name, roll no, email..."
                                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            />
                        </div>

                        {/* Status */}
                        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                            className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            {['All', 'Pending', 'Approved', 'Rejected'].map(v => <option key={v}>{v}</option>)}
                        </select>

                        {/* Department */}
                        <select value={filterDept} onChange={e => setFilterDept(e.target.value)}
                            className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            {DEPTS.map(v => <option key={v}>{v}</option>)}
                        </select>

                        {/* Sport */}
                        <select value={filterSport} onChange={e => setFilterSport(e.target.value)}
                            className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            {SPORTS.map(v => <option key={v}>{v}</option>)}
                        </select>
                    </div>

                    {/* Active filter chips + result count */}
                    <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                        <p className="text-xs text-gray-400">
                            Showing <span className="font-bold text-gray-700">{filtered.length}</span> of {registrations.length} registrations
                        </p>
                        {(filterStatus !== 'All' || filterSport !== 'All' || filterDept !== 'All' || search) && (
                            <button
                                onClick={() => { setSearch(''); setFilterStatus('All'); setFilterSport('All'); setFilterDept('All'); setFilterCategory('All'); }}
                                className="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1"
                            >
                                <i className='bx bx-x'></i> Clear filters
                            </button>
                        )}
                    </div>
                </div>

                {/* ── Table ── */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center py-20 text-gray-400">
                            <i className='bx bx-loader-alt animate-spin text-3xl mr-3'></i>
                            Loading registrations...
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-20 text-gray-400">
                            <i className='bx bx-search-alt text-5xl mb-3 block'></i>
                            <p className="font-semibold">No registrations found</p>
                            <p className="text-sm mt-1">Try adjusting your filters</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100 text-left">
                                        <th className="px-5 py-3 text-xs font-black text-gray-500 uppercase tracking-wide">#</th>
                                        <th className="px-5 py-3 text-xs font-black text-gray-500 uppercase tracking-wide">Athlete</th>
                                        <th className="px-5 py-3 text-xs font-black text-gray-500 uppercase tracking-wide">Dept / Sem</th>
                                        <th className="px-5 py-3 text-xs font-black text-gray-500 uppercase tracking-wide">Sport(s)</th>
                                        <th className="px-5 py-3 text-xs font-black text-gray-500 uppercase tracking-wide">Category</th>
                                        <th className="px-5 py-3 text-xs font-black text-gray-500 uppercase tracking-wide">Status</th>
                                        <th className="px-5 py-3 text-xs font-black text-gray-500 uppercase tracking-wide">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filtered.map((r, i) => {
                                        const sc = STATUS_COLORS[r.status] || STATUS_COLORS.pending;
                                        const sports = Array.isArray(r.sports) ? r.sports : [r.sport].filter(Boolean);
                                        return (
                                            <motion.tr
                                                key={r._id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: i * 0.03 }}
                                                className="hover:bg-gray-50 transition cursor-pointer"
                                                onClick={() => setSelected(r)}
                                            >
                                                <td className="px-5 py-4 text-gray-400 font-mono text-xs">{i + 1}</td>
                                                <td className="px-5 py-4">
                                                    <p className="font-bold text-gray-900">{r.fullName}</p>
                                                    <p className="text-xs text-gray-400">{r.rollNumber}</p>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className="font-bold text-gray-800">{r.department}</span>
                                                    <span className="text-gray-400 text-xs ml-1">· {r.semester}</span>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <div className="flex flex-wrap gap-1">
                                                        {sports.map(s => (
                                                            <span key={s} className="bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">{s}</span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4 text-gray-600 text-xs font-semibold">{r.category}</td>
                                                <td className="px-5 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${sc.bg} ${sc.text}`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`}></span>
                                                        {r.status || 'pending'}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4" onClick={e => e.stopPropagation()}>
                                                    <div className="flex items-center gap-2">
                                                        {r.status !== 'approved' && (
                                                            <button
                                                                onClick={() => updateStatus(r._id, 'approved')}
                                                                disabled={actionLoading === r._id + 'approved'}
                                                                className="bg-green-100 hover:bg-green-200 text-green-700 text-xs font-bold px-3 py-1.5 rounded-lg transition flex items-center gap-1 disabled:opacity-50"
                                                            >
                                                                {actionLoading === r._id + 'approved'
                                                                    ? <i className='bx bx-loader-alt animate-spin'></i>
                                                                    : <i className='bx bx-check'></i>}
                                                                Approve
                                                            </button>
                                                        )}
                                                        {r.status !== 'rejected' && (
                                                            <button
                                                                onClick={() => updateStatus(r._id, 'rejected')}
                                                                disabled={actionLoading === r._id + 'rejected'}
                                                                className="bg-red-100 hover:bg-red-200 text-red-700 text-xs font-bold px-3 py-1.5 rounded-lg transition flex items-center gap-1 disabled:opacity-50"
                                                            >
                                                                {actionLoading === r._id + 'rejected'
                                                                    ? <i className='bx bx-loader-alt animate-spin'></i>
                                                                    : <i className='bx bx-x'></i>}
                                                                Reject
                                                            </button>
                                                        )}
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

            {/* ── Detail Modal ── */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelected(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.92, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.92, opacity: 0 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="bg-gray-900 text-white px-6 py-5 flex items-center justify-between">
                                <div>
                                    <h3 className="font-black text-lg">{selected.fullName}</h3>
                                    <p className="text-gray-400 text-sm">{selected.rollNumber} · {selected.department}</p>
                                </div>
                                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-white text-2xl leading-none">×</button>
                            </div>

                            <div className="p-6 space-y-4">
                                {/* Status badge */}
                                {(() => { const sc = STATUS_COLORS[selected.status] || STATUS_COLORS.pending; return (
                                    <div className="flex items-center gap-2">
                                        <span className={`inline-flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-full ${sc.bg} ${sc.text}`}>
                                            <span className={`w-2 h-2 rounded-full ${sc.dot}`}></span>
                                            {selected.status || 'pending'}
                                        </span>
                                        <span className="text-xs text-gray-400">· {selected.session}</span>
                                    </div>
                                ); })()}

                                {/* Info grid */}
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    {[
                                        { label: 'Semester', value: selected.semester },
                                        { label: 'Category', value: selected.category },
                                        { label: 'Phone', value: selected.phone },
                                        { label: 'Email', value: selected.email, span: 2 },
                                    ].map(f => (
                                        <div key={f.label} className={`bg-gray-50 rounded-xl p-3 ${f.span === 2 ? 'col-span-2' : ''}`}>
                                            <p className="text-xs text-gray-400 font-medium mb-0.5">{f.label}</p>
                                            <p className="font-bold text-gray-900 break-all">{f.value}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Sports */}
                                <div className="bg-gray-50 rounded-xl p-3">
                                    <p className="text-xs text-gray-400 font-medium mb-2">Registered Sport(s)</p>
                                    <div className="flex flex-wrap gap-2">
                                        {(Array.isArray(selected.sports) ? selected.sports : [selected.sport].filter(Boolean)).map(s => (
                                            <span key={s} className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">{s}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Contact buttons */}
                                <div className="grid grid-cols-2 gap-3">
                                    <a
                                        href={whatsappLink(selected.phone, selected.fullName)}
                                        target="_blank" rel="noreferrer"
                                        className="bg-green-500 hover:bg-green-600 text-white font-bold text-sm py-2.5 rounded-xl transition flex items-center justify-center gap-2"
                                    >
                                        <i className='bx bxl-whatsapp text-lg'></i> WhatsApp
                                    </a>
                                    <a
                                        href={emailLink(selected.email, selected.fullName, selected.status)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-2.5 rounded-xl transition flex items-center justify-center gap-2"
                                    >
                                        <i className='bx bx-envelope text-lg'></i> Email
                                    </a>
                                </div>

                                {/* Approve / Reject */}
                                <div className="grid grid-cols-2 gap-3 pt-1">
                                    <button
                                        onClick={() => updateStatus(selected._id, 'approved')}
                                        disabled={selected.status === 'approved' || actionLoading}
                                        className="bg-green-100 hover:bg-green-200 text-green-700 font-black py-2.5 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        <i className='bx bx-check-circle'></i> Approve
                                    </button>
                                    <button
                                        onClick={() => updateStatus(selected._id, 'rejected')}
                                        disabled={selected.status === 'rejected' || actionLoading}
                                        className="bg-red-100 hover:bg-red-200 text-red-700 font-black py-2.5 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        <i className='bx bx-x-circle'></i> Reject
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
