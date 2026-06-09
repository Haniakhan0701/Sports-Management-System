// src/pages/Announcements.jsx
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import 'boxicons/css/boxicons.min.css';

const API = `${import.meta.env.VITE_API_URL}/api`;

const Announcements = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDept, setSelectedDept] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const departments = ['All', 'CE', 'ME', 'EE', 'CVE', 'AR'];

    const categories = [
        { id: 'all', name: 'All Announcements', icon: 'bx-message-dots', color: 'gray' },
        { id: 'general', name: 'General', icon: 'bx-megaphone', color: 'blue' },
        { id: 'mens', name: "Men's Sports", icon: 'bx-male', color: 'blue' },
        { id: 'womens', name: "Women's Sports", icon: 'bx-female', color: 'rose' },
        { id: 'matches', name: 'Matches', icon: 'bx-trophy', color: 'orange' },
        { id: 'registration', name: 'Registrations', icon: 'bx-user-plus', color: 'purple' },
        { id: 'results', name: 'Results', icon: 'bx-bar-chart-alt-2', color: 'green' },
        { id: 'emergency', name: 'Emergency', icon: 'bx-error-circle', color: 'red' }
    ];

    const priorityLevels = {
        high:   { label: 'IMPORTANT', bg: 'bg-red-100',    text: 'text-red-700',    icon: 'bx-bell',        circleBg: 'bg-red-500' },
        medium: { label: 'MEDIUM',    bg: 'bg-yellow-100', text: 'text-yellow-700', icon: 'bx-time-five',   circleBg: 'bg-yellow-500' },
        low:    { label: 'LOW',       bg: 'bg-gray-100',   text: 'text-gray-600',   icon: 'bx-info-circle', circleBg: 'bg-gray-500' }
    };

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${API}/announcements`);
                setAnnouncements(res.data.announcements || res.data || []);
            } catch (err) {
                console.error("Failed to fetch announcements:", err);
                setError("Failed to load announcements. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchAnnouncements();
        const interval = setInterval(fetchAnnouncements, 60000);
        return () => clearInterval(interval);
    }, []);

    const filteredAnnouncements = announcements.filter(a => {
        if (selectedCategory !== 'all') {
            if (selectedCategory === 'mens' && a.category !== 'mens') return false;
            if (selectedCategory === 'womens' && a.category !== 'womens') return false;
            if (!['mens', 'womens'].includes(selectedCategory) && a.category !== selectedCategory) return false;
        }
        if (selectedDept !== 'all' && a.dept !== 'All' && !String(a.dept || '').includes(selectedDept)) return false;
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            if (!String(a.title || '').toLowerCase().includes(q) &&
                !String(a.content || '').toLowerCase().includes(q)) return false;
        }
        return true;
    });

    const pinnedAnnouncements = filteredAnnouncements.filter(a => a.isPinned);
    const regularAnnouncements = filteredAnnouncements.filter(a => !a.isPinned);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const isNew = (dateString) => {
        if (!dateString) return false;
        return (new Date() - new Date(dateString)) / (1000 * 60 * 60) < 24;
    };

    const getCategoryCount = (catId) => {
        return announcements.filter(a => {
            if (catId === 'all') return true;
            if (catId === 'mens') return a.category === 'mens';
            if (catId === 'womens') return a.category === 'womens';
            return a.category === catId;
        }).length;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-blue-800 to-indigo-900 text-white pt-20 pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }} className="text-center">
                        <span className="inline-block border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium tracking-wide mb-5">
                            ALL ANNOUNCEMENTS
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                            Announcements & <br />Notifications
                        </h1>
                        <p className="text-lg text-gray-200 max-w-2xl mx-auto">
                            Browse all announcements from the Sports Committee. Important updates appear as popups on every page.
                        </p>
                    </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400"></div>
            </section>

            {/* Info Banner */}
            <div className="bg-blue-50 border-b border-blue-200 py-3">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center gap-2 text-blue-700 text-sm">
                        <i className='bx bx-info-circle text-lg'></i>
                        <span>💡 New announcements will automatically appear as popup notifications on your screen</span>
                    </div>
                </div>
            </div>

            {/* Search & Filter Bar */}
            <section className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex-1 min-w-[200px] relative">
                            <i className='bx bx-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'></i>
                            <input
                                type="text"
                                placeholder="Search announcements..."
                                className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 font-medium"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="md:hidden px-4 py-2.5 bg-gray-100 rounded-lg text-gray-700 flex items-center gap-2 font-medium"
                        >
                            <i className='bx bx-filter'></i>
                            Filters
                            {(selectedCategory !== 'all' || selectedDept !== 'all') && (
                                <span className="bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                    {(selectedCategory !== 'all' ? 1 : 0) + (selectedDept !== 'all' ? 1 : 0)}
                                </span>
                            )}
                        </button>

                        <div className="hidden md:flex items-center gap-3">
                            <select className="border-2 border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium bg-white"
                                value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                                <option value="all">All Categories</option>
                                {categories.slice(1).map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                            </select>
                            <select className="border-2 border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium bg-white"
                                value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
                                <option value="all">All Departments</option>
                                {departments.slice(1).map(dept => <option key={dept} value={dept}>{dept}</option>)}
                            </select>
                            {(selectedCategory !== 'all' || selectedDept !== 'all' || searchQuery) && (
                                <button onClick={() => { setSelectedCategory('all'); setSelectedDept('all'); setSearchQuery(''); }}
                                    className="text-red-600 text-sm hover:text-red-700 flex items-center gap-1 font-medium bg-red-50 px-3 py-2 rounded-lg">
                                    <i className='bx bx-reset'></i> Clear
                                </button>
                            )}
                        </div>
                    </div>

                    <AnimatePresence>
                        {showFilters && (
                            <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }} className="md:hidden overflow-hidden">
                                <div className="pt-4 pb-2 space-y-3">
                                    <select className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 font-medium bg-white"
                                        value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                                        <option value="all">All Categories</option>
                                        {categories.slice(1).map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                                    </select>
                                    <select className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 font-medium bg-white"
                                        value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
                                        <option value="all">All Departments</option>
                                        {departments.slice(1).map(dept => <option key={dept} value={dept}>{dept}</option>)}
                                    </select>
                                    <button onClick={() => { setSelectedCategory('all'); setSelectedDept('all'); setSearchQuery(''); setShowFilters(false); }}
                                        className="w-full bg-red-50 text-red-600 py-2.5 rounded-lg text-sm font-medium border border-red-200">
                                        Clear All Filters
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-8">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-4 gap-6">
                        {/* Sidebar */}
                        <div className="hidden lg:block space-y-4">
                            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                                    <i className='bx bx-category'></i> Categories
                                </h3>
                                <div className="space-y-1">
                                    {categories.map(cat => (
                                        <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition ${
                                                selectedCategory === cat.id ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-600'
                                            }`}>
                                            <span className="flex items-center gap-2">
                                                <i className={`bx ${cat.icon}`}></i>{cat.name}
                                            </span>
                                            <span className={`text-xs px-2 py-1 rounded-full ${selectedCategory === cat.id ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                                {getCategoryCount(cat.id)}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
                                <i className='bx bx-bell text-3xl text-blue-600 mb-2 block'></i>
                                <h4 className="font-bold text-gray-800 mb-1">Stay Updated</h4>
                                <p className="text-sm text-gray-600">Important announcements appear as popups automatically. No need to refresh!</p>
                            </div>
                        </div>

                        {/* Feed */}
                        <div className="lg:col-span-3">
                            <div className="flex items-center justify-between mb-6">
                                <div className="text-sm text-gray-600">
                                    Showing <span className="font-semibold">{filteredAnnouncements.length}</span> announcements
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <i className='bx bx-time'></i>
                                    <span>Updates every minute</span>
                                </div>
                            </div>

                            {loading ? (
                                <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
                                    <i className='bx bx-loader-alt bx-spin text-4xl text-blue-500 block mb-3'></i>
                                    <p className="text-gray-500">Loading announcements...</p>
                                </div>
                            ) : error ? (
                                <div className="bg-white rounded-xl p-12 text-center border border-red-200">
                                    <i className='bx bx-error-circle text-4xl text-red-400 block mb-3'></i>
                                    <p className="text-red-600">{error}</p>
                                </div>
                            ) : (
                                <>
                                    {pinnedAnnouncements.length > 0 && (
                                        <div className="mb-6">
                                            <div className="flex items-center gap-2 mb-3 text-amber-600">
                                                <i className='bx bx-pin'></i>
                                                <span className="font-semibold text-sm">PINNED</span>
                                            </div>
                                            <div className="space-y-4">
                                                {pinnedAnnouncements.map(a => (
                                                    <AnnouncementCard key={a._id || a.id} announcement={a}
                                                        isNew={isNew(a.date || a.createdAt)} formatDate={formatDate} priorityLevels={priorityLevels} />
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-4">
                                        {regularAnnouncements.length > 0 ? (
                                            regularAnnouncements.map(a => (
                                                <AnnouncementCard key={a._id || a.id} announcement={a}
                                                    isNew={isNew(a.date || a.createdAt)} formatDate={formatDate} priorityLevels={priorityLevels} />
                                            ))
                                        ) : pinnedAnnouncements.length === 0 ? (
                                            <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
                                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <i className='bx bx-message-square-x text-4xl text-gray-400'></i>
                                                </div>
                                                <h3 className="text-xl font-semibold text-gray-700 mb-2">No announcements found</h3>
                                                <p className="text-gray-500 mb-6">Try adjusting your filters or check back later.</p>
                                                <button onClick={() => { setSelectedCategory('all'); setSelectedDept('all'); setSearchQuery(''); }}
                                                    className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition">
                                                    Clear filters
                                                </button>
                                            </div>
                                        ) : null}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const AnnouncementCard = ({ announcement, isNew, formatDate, priorityLevels }) => {
    const [expanded, setExpanded] = useState(false);
    const priority = priorityLevels[announcement.priority] || priorityLevels.low;
    const dateStr = announcement.date || announcement.createdAt;

    return (
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} whileHover={{ scale:1.01 }}
            className={`bg-white rounded-xl p-5 shadow-sm border ${
                announcement.isPinned ? 'border-amber-300 bg-amber-50/30' : 'border-gray-200 hover:shadow-md'
            } transition`}>
            <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full ${priority.circleBg} flex items-center justify-center flex-shrink-0`}>
                    <i className={`bx ${priority.icon} text-xl text-white`}></i>
                </div>
                <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        {isNew && <span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-bold animate-pulse">NEW</span>}
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${priority.bg} ${priority.text}`}>{priority.label}</span>
                        {dateStr && (
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                <i className='bx bx-calendar'></i>
                                {formatDate(dateStr)}
                            </span>
                        )}
                        {announcement.isPinned && (
                            <span className="text-amber-600 text-xs flex items-center gap-1 ml-auto">
                                <i className='bx bxs-pin'></i> Pinned
                            </span>
                        )}
                    </div>
                    <h3 className="font-bold text-gray-800 text-lg mb-2">{announcement.title}</h3>
                    <p className={`text-gray-600 mb-3 ${!expanded ? 'line-clamp-2' : ''}`}>{announcement.content}</p>
                    {announcement.content && announcement.content.length > 150 && (
                        <button onClick={() => setExpanded(!expanded)} className="text-blue-600 text-sm hover:underline mb-3 flex items-center gap-1">
                            {expanded ? 'Show less' : 'Read more'}
                            <i className={`bx bx-chevron-${expanded ? 'up' : 'down'}`}></i>
                        </button>
                    )}
                    <div className="flex flex-wrap gap-2">
                        {announcement.dept && announcement.dept !== 'All' && (
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                                <i className='bx bx-building'></i>{announcement.dept}
                            </span>
                        )}
                        {announcement.category && (
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                                <i className='bx bx-category'></i>{announcement.category}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Announcements;