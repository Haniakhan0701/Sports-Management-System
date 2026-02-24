// src/pages/Announcements.jsx
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import 'boxicons/css/boxicons.min.css';

const Announcements = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDept, setSelectedDept] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    
    const currentYear = 2026;

    // Department list for filtering
    const departments = ['All', 'CE', 'ME', 'EE', 'CVE', 'AR'];
    
    // Categories for announcements
    const categories = [
        { id: 'all', name: 'All Announcements', icon: 'bx-message-dots', color: 'gray' },
        { id: 'general', name: 'General', icon: 'bx-info-circle', color: 'blue' },
        { id: 'mens', name: "Men's Sports", icon: 'bx-male', color: 'blue' },
        { id: 'womens', name: "Women's Sports", icon: 'bx-female', color: 'rose' },
        { id: 'matches', name: 'Matches', icon: 'bx-football', color: 'green' },
        { id: 'registration', name: 'Registrations', icon: 'bx-user-plus', color: 'purple' },
        { id: 'results', name: 'Results', icon: 'bx-trophy', color: 'amber' },
        { id: 'emergency', name: 'Emergency', icon: 'bx-error', color: 'red' }
    ];

    // Priority levels with colors
    const priorityLevels = {
        high: { label: 'IMPORTANT', bg: 'bg-red-100', text: 'text-red-700', icon: 'bxs-error' },
        medium: { label: 'MEDIUM', bg: 'bg-yellow-100', text: 'text-yellow-700', icon: 'bx-time' },
        low: { label: 'LOW', bg: 'bg-gray-100', text: 'text-gray-600', icon: 'bx-info-circle' }
    };

    // Sample announcements data
    const announcementsData = [
        // IMPORTANT/HIGH PRIORITY
        {
            id: 1,
            title: "Sports Week 2026 Schedule Released",
            content: "The complete schedule for Sports Week 2026 (Feb 8-12) is now available. All department heads please confirm participation by Jan 30.",
            category: "general",
            dept: "All",
            priority: "high",
            date: "2026-02-01",
            time: "10:30 AM",
            author: "Sports Committee",
            image: null,
            link: "/schedule",
            linkText: "View Schedule",
            views: 245,
            isPinned: true,
            expiresAt: "2026-02-12"
        },
        {
            id: 2,
            title: "Cricket Final: CE vs ME - Venue Changed",
            content: "Due to weather conditions, the Cricket Final has been moved from Oval Ground to Indoor Stadium. Time remains 3:00 PM.",
            category: "matches",
            dept: "CE, ME",
            priority: "high",
            date: "2026-02-07",
            time: "8:15 AM",
            author: "Sports Committee",
            image: null,
            link: "/live",
            linkText: "Match Updates",
            views: 189,
            isPinned: true
        },
        {
            id: 3,
            title: "Women's Football Team Registrations Now Open",
            content: "Registrations for Women's Football tournament are now open. Last date: Feb 5, 2026. Interested players contact your department CR.",
            category: "registration",
            dept: "All",
            priority: "high",
            date: "2026-02-02",
            time: "2:00 PM",
            author: "Women's Sports Council",
            image: null,
            link: "/register",
            linkText: "Register Now",
            views: 156
        },

        // MEDIUM PRIORITY
        {
            id: 4,
            title: "Volleyball: EE vs CVE Match Update",
            content: "Today's Volleyball match between EE and CVE at 4:00 PM on Court 1. All spectators welcome.",
            category: "matches",
            dept: "EE, CVE",
            priority: "medium",
            date: "2026-02-07",
            time: "9:00 AM",
            author: "Volleyball Committee",
            image: null,
            link: "/schedule",
            linkText: "View Details",
            views: 67
        },
        {
            id: 5,
            title: "Opening Ceremony: Tomorrow 10:00 AM",
            content: "The Sports Week 2026 Opening Ceremony will be held at Main Ground. Chief Guest: Vice Chancellor. All departments must assemble by 9:30 AM.",
            category: "general",
            dept: "All",
            priority: "medium",
            date: "2026-02-06",
            time: "4:30 PM",
            author: "Sports Committee",
            image: null,
            link: "/about",
            linkText: "Event Details",
            views: 203
        },
        {
            id: 6,
            title: "Basketball Quarter Final Results",
            content: "CE defeats AR 65-42. ME defeats EE 58-50. Semi Finals scheduled for Feb 9.",
            category: "results",
            dept: "CE, AR, ME, EE",
            priority: "medium",
            date: "2026-02-05",
            time: "6:00 PM",
            author: "Basketball Committee",
            image: null,
            link: "/standings",
            linkText: "View Standings",
            views: 112
        },

        // LOW PRIORITY
        {
            id: 7,
            title: "Badminton Racket Stringing Service Available",
            content: "Free racket stringing service available at Sports Complex until Feb 10. First come first serve.",
            category: "general",
            dept: "All",
            priority: "low",
            date: "2026-02-04",
            time: "11:00 AM",
            author: "Badminton Club",
            image: null,
            link: null,
            views: 45
        },
        {
            id: 8,
            title: "Media Team Hiring for Sports Week",
            content: "Looking for student photographers and videographers for Sports Week. Stipend provided. Apply by Feb 3.",
            category: "general",
            dept: "All",
            priority: "low",
            date: "2026-02-01",
            time: "1:15 PM",
            author: "Media Cell",
            image: null,
            link: "/contact",
            linkText: "Apply Now",
            views: 78
        },
        {
            id: 9,
            title: "CE Department Practice Session",
            content: "Extra practice session for CE Cricket team today at 4:00 PM. All players must attend.",
            category: "mens",
            dept: "CE",
            priority: "medium",
            date: "2026-02-03",
            time: "10:00 AM",
            author: "CE Sports Wing",
            image: null,
            link: null,
            views: 34
        },
        {
            id: 10,
            title: "ME vs EE Football Match Report",
            content: "Highlights and photos from yesterday's ME vs EE football match are now available in the Media section.",
            category: "results",
            dept: "ME, EE",
            priority: "low",
            date: "2026-02-02",
            time: "9:30 AM",
            author: "Media Cell",
            image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            link: "/media",
            linkText: "View Photos",
            views: 156
        },

        // ARCHIVED (older)
        {
            id: 11,
            title: "Cricket Trial Matches Schedule",
            content: "Trial matches for Cricket team selection will be held on Jan 25-26 at Oval Ground.",
            category: "matches",
            dept: "All",
            priority: "medium",
            date: "2026-01-20",
            time: "2:00 PM",
            author: "Cricket Committee",
            image: null,
            link: null,
            views: 89,
            isArchived: true
        },
        {
            id: 12,
            title: "Department Sports Secretaries Meeting",
            content: "Meeting with all department sports secretaries on Jan 28 at 3:00 PM in Committee Room.",
            category: "general",
            dept: "All",
            priority: "high",
            date: "2026-01-25",
            time: "11:30 AM",
            author: "Sports Committee",
            image: null,
            link: null,
            views: 67,
            isArchived: true
        }
    ];

    // Filter announcements
    const filteredAnnouncements = announcementsData.filter(announcement => {
        // Category filter
        if (selectedCategory !== 'all') {
            if (selectedCategory === 'mens' && announcement.category !== 'mens' && 
                !(announcement.category === 'matches' && announcement.title.includes("Men's"))) return false;
            if (selectedCategory === 'womens' && announcement.category !== 'womens' && 
                !(announcement.category === 'matches' && announcement.title.includes("Women's"))) return false;
            if (selectedCategory !== 'mens' && selectedCategory !== 'womens' && 
                announcement.category !== selectedCategory) return false;
        }
        
        // Department filter
        if (selectedDept !== 'all' && announcement.dept !== 'All' && 
            !announcement.dept.includes(selectedDept)) return false;
        
        // Search query
        if (searchQuery && !announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
            !announcement.content.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        
        // Don't show archived by default
        if (announcement.isArchived) return false;
        
        return true;
    });

    // Separate pinned and regular announcements
    const pinnedAnnouncements = filteredAnnouncements.filter(a => a.isPinned);
    const regularAnnouncements = filteredAnnouncements.filter(a => !a.isPinned);

    // Format date
    const formatDate = (dateString) => {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // Check if announcement is new (within 24 hours)
    const isNew = (dateString) => {
        const announcementDate = new Date(dateString);
        const now = new Date();
        const diffHours = (now - announcementDate) / (1000 * 60 * 60);
        return diffHours < 24;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-blue-800 to-indigo-900 text-white pt-20 pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <span className="inline-block border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium tracking-wide mb-5">
                             LATEST UPDATES
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                            Announcements & <br />Notifications
                        </h1>
                        <p className="text-lg text-gray-200 max-w-2xl mx-auto">
                            Stay updated with match schedules, results, registrations, and important notices from the Sports Committee.
                        </p>
                    </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400"></div>
            </section>

            {/* Search and Filter Bar */}
            <section className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Search - FIXED: Better contrast for typing */}
                        <div className="flex-1 min-w-[200px] relative">
                            <i className='bx bx-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'></i>
                            <input
                                type="text"
                                placeholder="Search announcements..."
                                className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 font-medium"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ color: '#111827' }} /* Explicit dark color */
                            />
                        </div>

                        {/* Filter Toggle Button (Mobile) */}
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

                        {/* Desktop Filters */}
                        <div className="hidden md:flex items-center gap-3">
                            <select 
                                className="border-2 border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium bg-white"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="all">All Categories</option>
                                {categories.slice(1).map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>

                            <select 
                                className="border-2 border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium bg-white"
                                value={selectedDept}
                                onChange={(e) => setSelectedDept(e.target.value)}
                            >
                                <option value="all">All Departments</option>
                                {departments.slice(1).map(dept => (
                                    <option key={dept} value={dept}>{dept}</option>
                                ))}
                            </select>

                            {(selectedCategory !== 'all' || selectedDept !== 'all' || searchQuery) && (
                                <button 
                                    onClick={() => {
                                        setSelectedCategory('all');
                                        setSelectedDept('all');
                                        setSearchQuery('');
                                    }}
                                    className="text-red-600 text-sm hover:text-red-700 flex items-center gap-1 font-medium bg-red-50 px-3 py-2 rounded-lg"
                                >
                                    <i className='bx bx-reset'></i>
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Mobile Filters Panel */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="md:hidden overflow-hidden"
                            >
                                <div className="pt-4 pb-2 space-y-3">
                                    <select 
                                        className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium bg-white"
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                    >
                                        <option value="all">All Categories</option>
                                        {categories.slice(1).map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>

                                    <select 
                                        className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium bg-white"
                                        value={selectedDept}
                                        onChange={(e) => setSelectedDept(e.target.value)}
                                    >
                                        <option value="all">All Departments</option>
                                        {departments.slice(1).map(dept => (
                                            <option key={dept} value={dept}>{dept}</option>
                                        ))}
                                    </select>

                                    <button 
                                        onClick={() => {
                                            setSelectedCategory('all');
                                            setSelectedDept('all');
                                            setSearchQuery('');
                                            setShowFilters(false);
                                        }}
                                        className="w-full bg-red-50 text-red-600 py-2.5 rounded-lg text-sm font-medium border border-red-200"
                                    >
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
                        {/* Left Sidebar - Categories */}
                        <div className="hidden lg:block space-y-4">
                            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                                    <i className='bx bx-category'></i>
                                    Categories
                                </h3>
                                <div className="space-y-1">
                                    {categories.map(cat => {
                                        const count = announcementsData.filter(a => 
                                            cat.id === 'all' ? true : 
                                            cat.id === 'mens' ? (a.category === 'mens' || a.title.includes("Men's")) :
                                            cat.id === 'womens' ? (a.category === 'womens' || a.title.includes("Women's")) :
                                            a.category === cat.id
                                        ).length;
                                        return (
                                            <button
                                                key={cat.id}
                                                onClick={() => setSelectedCategory(cat.id)}
                                                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition ${
                                                    selectedCategory === cat.id 
                                                        ? `bg-${cat.color}-50 text-${cat.color}-700` 
                                                        : 'hover:bg-gray-50 text-gray-600'
                                                }`}
                                            >
                                                <span className="flex items-center gap-2">
                                                    <i className={`bx ${cat.icon}`}></i>
                                                    {cat.name}
                                                </span>
                                                <span className={`text-xs px-2 py-1 rounded-full ${
                                                    selectedCategory === cat.id 
                                                        ? `bg-${cat.color}-100` 
                                                        : 'bg-gray-100'
                                                }`}>
                                                    {count}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl p-5 shadow-lg">
                                <i className='bx bx-bell text-3xl mb-3'></i>
                                <h4 className="font-bold mb-1">Get Notified</h4>
                                <p className="text-sm text-blue-100 mb-4">Subscribe to get instant updates</p>
                                <button className="w-full bg-white text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50 transition">
                                    Subscribe
                                </button>
                            </div>
                        </div>

                        {/* Main Announcements Feed */}
                        <div className="lg:col-span-3">
                            {/* Results count */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="text-sm text-gray-600">
                                    Showing <span className="font-semibold">{filteredAnnouncements.length}</span> announcements
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <i className='bx bx-time'></i>
                                    <span>Updated: Feb 7, 2026</span>
                                </div>
                            </div>

                            {/* Pinned Announcements */}
                            {pinnedAnnouncements.length > 0 && (
                                <div className="mb-6">
                                    <div className="flex items-center gap-2 mb-3 text-amber-600">
                                        <i className='bx bx-pin'></i>
                                        <span className="font-semibold text-sm">PINNED</span>
                                    </div>
                                    <div className="space-y-4">
                                        {pinnedAnnouncements.map(announcement => (
                                            <AnnouncementCard 
                                                key={announcement.id} 
                                                announcement={announcement}
                                                isNew={isNew(announcement.date)}
                                                formatDate={formatDate}
                                                priorityLevels={priorityLevels}
                                                deptColors={{
                                                    'CE': 'blue',
                                                    'ME': 'amber',
                                                    'EE': 'emerald',
                                                    'CVE': 'slate',
                                                    'AR': 'rose'
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Regular Announcements */}
                            <div className="space-y-4">
                                {regularAnnouncements.length > 0 ? (
                                    regularAnnouncements.map(announcement => (
                                        <AnnouncementCard 
                                            key={announcement.id} 
                                            announcement={announcement}
                                            isNew={isNew(announcement.date)}
                                            formatDate={formatDate}
                                            priorityLevels={priorityLevels}
                                            deptColors={{
                                                'CE': 'blue',
                                                'ME': 'amber',
                                                'EE': 'emerald',
                                                'CVE': 'slate',
                                                'AR': 'rose'
                                            }}
                                        />
                                    ))
                                ) : (
                                    <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
                                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <i className='bx bx-message-square-x text-4xl text-gray-400'></i>
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No announcements found</h3>
                                        <p className="text-gray-500 mb-6">Try adjusting your filters or check back later.</p>
                                        <button 
                                            onClick={() => {
                                                setSelectedCategory('all');
                                                setSelectedDept('all');
                                                setSearchQuery('');
                                            }}
                                            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
                                        >
                                            Clear filters
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Load More */}
                            {filteredAnnouncements.length > 5 && (
                                <div className="mt-8 text-center">
                                    <button className="bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-300 transition">
                                        Load More
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Actions - UPDATED with separate GR and CR cards */}
            <section className="py-8 bg-white border-t border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-6">
                        <h3 className="text-lg font-semibold text-gray-700">Quick Contacts</h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 max-w-4xl mx-auto">
                        <Link to="/schedule">
                            <div className="bg-blue-50 p-4 rounded-lg text-center hover:bg-blue-100 transition border border-blue-200 group">
                                <i className='bx bx-calendar text-2xl text-blue-600 group-hover:scale-110 transition-transform'></i>
                                <div className="font-medium text-sm mt-1 text-blue-700">Schedule</div>
                            </div>
                        </Link>
                        
                        <Link to="/register">
                            <div className="bg-green-50 p-4 rounded-lg text-center hover:bg-green-100 transition border border-green-200 group">
                                <i className='bx bx-user-plus text-2xl text-green-600 group-hover:scale-110 transition-transform'></i>
                                <div className="font-medium text-sm mt-1 text-green-700">Register</div>
                            </div>
                        </Link>
                        
                        {/* GR Card - General Representative */}
                        <Link to="/contact/gr">
                            <div className="bg-amber-50 p-4 rounded-lg text-center hover:bg-amber-100 transition border border-amber-200 group">
                                <i className='bx bx-user-voice text-2xl text-amber-600 group-hover:scale-110 transition-transform'></i>
                                <div className="font-medium text-sm mt-1 text-amber-700">GR</div>
                                <div className="text-[10px] text-amber-600 font-medium">General Rep</div>
                            </div>
                        </Link>
                        
                        {/* CR Card - Class Representative */}
                        <Link to="/contact/cr">
                            <div className="bg-purple-50 p-4 rounded-lg text-center hover:bg-purple-100 transition border border-purple-200 group">
                                <i className='bx bx-group text-2xl text-purple-600 group-hover:scale-110 transition-transform'></i>
                                <div className="font-medium text-sm mt-1 text-purple-700">CR</div>
                                <div className="text-[10px] text-purple-600 font-medium">Class Rep</div>
                            </div>
                        </Link>
                        
                        <Link to="/media">
                            <div className="bg-rose-50 p-4 rounded-lg text-center hover:bg-rose-100 transition border border-rose-200 group">
                                <i className='bx bx-images text-2xl text-rose-600 group-hover:scale-110 transition-transform'></i>
                                <div className="font-medium text-sm mt-1 text-rose-700">Media</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer Note */}
            <section className="py-4 bg-slate-900 text-white text-center text-sm">
                <div className="container mx-auto px-4">
                    <p>📢 FOR URGENT ANNOUNCEMENTS, CONTACT SPORTS COMMITTEE · NEXT UPDATE: FEB 8, 2026</p>
                </div>
            </section>
        </div>
    );
};

// Separate component for Announcement Card
const AnnouncementCard = ({ announcement, isNew, formatDate, priorityLevels, deptColors }) => {
    const [expanded, setExpanded] = useState(false);
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white rounded-xl p-5 shadow-sm border ${
                announcement.isPinned ? 'border-amber-300 bg-amber-50/30' : 'border-gray-200 hover:shadow-md'
            } transition`}
        >
            <div className="flex items-start gap-4">
                {/* Priority Icon */}
                <div className={`w-10 h-10 rounded-lg ${priorityLevels[announcement.priority].bg} flex items-center justify-center flex-shrink-0`}>
                    <i className={`bx ${priorityLevels[announcement.priority].icon} text-xl ${priorityLevels[announcement.priority].text}`}></i>
                </div>

                <div className="flex-1">
                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        {isNew && (
                            <span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-bold animate-pulse">
                                NEW
                            </span>
                        )}
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${priorityLevels[announcement.priority].bg} ${priorityLevels[announcement.priority].text}`}>
                            {priorityLevels[announcement.priority].label}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                            <i className='bx bx-time'></i>
                            {formatDate(announcement.date)} • {announcement.time}
                        </span>
                        {announcement.isPinned && (
                            <span className="text-amber-600 text-xs flex items-center gap-1 ml-auto">
                                <i className='bx bxs-pin'></i>
                                Pinned
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-gray-800 text-lg mb-2">
                        {announcement.title}
                    </h3>

                    {/* Content */}
                    <p className={`text-gray-600 mb-3 ${!expanded ? 'line-clamp-2' : ''}`}>
                        {announcement.content}
                    </p>

                    {/* Expand/Collapse */}
                    {announcement.content.length > 150 && (
                        <button 
                            onClick={() => setExpanded(!expanded)}
                            className="text-blue-600 text-sm hover:underline mb-3 flex items-center gap-1"
                        >
                            {expanded ? 'Show less' : 'Read more'}
                            <i className={`bx bx-chevron-${expanded ? 'up' : 'down'}`}></i>
                        </button>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                            <i className='bx bx-group'></i>
                            {announcement.dept}
                        </span>
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                            <i className='bx bx-user'></i>
                            {announcement.author}
                        </span>
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                            <i className='bx bx-show'></i>
                            {announcement.views} views
                        </span>
                    </div>

                    {/* Action Link */}
                    {announcement.link && (
                        <Link to={announcement.link}>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center gap-2">
                                {announcement.linkText || 'View Details'}
                                <i className='bx bx-right-arrow-alt'></i>
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default Announcements;