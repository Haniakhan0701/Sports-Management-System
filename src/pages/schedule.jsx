import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import 'boxicons/css/boxicons.min.css';

const Schedule = () => {
    const [selectedMonth, setSelectedMonth] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDept, setSelectedDept] = useState('all');
    const [selectedSport, setSelectedSport] = useState('all');
    const [showPdfViewer, setShowPdfViewer] = useState(false);
    const [selectedPdf, setSelectedPdf] = useState(null);
    
    // Current date
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    
    // Determine if we're in sports season (Sept - Feb)
    const isSportsSeason = currentMonth >= 8 || currentMonth <= 1; // Sept(8) to Feb(1)
    
    // Sports Season Year display (e.g., "2025-26")
    const seasonStart = isSportsSeason && currentMonth >= 8 ? currentYear : currentYear - 1;
    const seasonEnd = seasonStart + 1;
    const seasonDisplay = `${seasonStart}-${seasonEnd}`;

    // --- PDF Schedules (Historical + Current) ---
    const pdfSchedules = [
        // Current Season
        {
            id: 1,
            title: "Sports Week 2026 - Complete Schedule",
            uploadDate: "2026-02-01",
            season: "2025-26",
            month: "February",
            event: "Sports Week 2026",
            fileUrl: "/schedules/sports-week-2026.pdf",
            uploadedBy: "Sports Committee",
            size: "2.4 MB",
            isCurrent: true,
            isNew: true
        },
        {
            id: 2,
            title: "January 2026 - Knockout Matches",
            uploadDate: "2026-01-15",
            season: "2025-26",
            month: "January",
            event: "Knockout Stages",
            fileUrl: "/schedules/jan-2026-knockouts.pdf",
            uploadedBy: "CE Department",
            size: "1.8 MB",
            isCurrent: true,
            isNew: false
        },
        {
            id: 3,
            title: "December 2025 - League Matches",
            uploadDate: "2025-12-01",
            season: "2025-26",
            month: "December",
            event: "League Stage",
            fileUrl: "/schedules/dec-2025-league.pdf",
            uploadedBy: "ME Department",
            size: "2.1 MB",
            isCurrent: true,
            isNew: false
        },
        {
            id: 4,
            title: "November 2025 - Opening Matches",
            uploadDate: "2025-11-01",
            season: "2025-26",
            month: "November",
            event: "Opening Round",
            fileUrl: "/schedules/nov-2025-opening.pdf",
            uploadedBy: "Sports Committee",
            size: "1.5 MB",
            isCurrent: true,
            isNew: false
        },
        {
            id: 5,
            title: "October 2025 - Trial Matches",
            uploadDate: "2025-10-05",
            season: "2025-26",
            month: "October",
            event: "Friendly Matches",
            fileUrl: "/schedules/oct-2025-trials.pdf",
            uploadedBy: "EE Department",
            size: "1.2 MB",
            isCurrent: true,
            isNew: false
        },
        // Previous Season (Archive)
        {
            id: 6,
            title: "Sports Week 2025 - Complete Schedule",
            uploadDate: "2025-02-10",
            season: "2024-25",
            month: "February",
            event: "Sports Week 2025",
            fileUrl: "/schedules/archive/sports-week-2025.pdf",
            uploadedBy: "Sports Committee",
            size: "2.3 MB",
            isCurrent: false,
            isNew: false
        },
        {
            id: 7,
            title: "Sports Week 2024 - Complete Schedule",
            uploadDate: "2024-02-12",
            season: "2023-24",
            month: "February",
            event: "Sports Week 2024",
            fileUrl: "/schedules/archive/sports-week-2024.pdf",
            uploadedBy: "Sports Committee",
            size: "2.2 MB",
            isCurrent: false,
            isNew: false
        }
    ];

    // --- Seasonal Matches (Organized by Month, not Week) ---
    const seasonalMatches = [
        // FEBRUARY 2026 - SPORTS WEEK (MAIN EVENT)
        {
            id: 1,
            season: "2025-26",
            month: "February",
            monthNumber: 2,
            date: "2026-02-08",
            day: "Saturday",
            time: "10:00 AM",
            sport: "Cricket",
            category: "Men's",
            dept1: "CE",
            dept2: "ME",
            venue: "Oval Ground",
            status: "upcoming",
            stage: "Final",
            isSportsWeek: true
        },
        {
            id: 2,
            season: "2025-26",
            month: "February",
            monthNumber: 2,
            date: "2026-02-08",
            day: "Saturday",
            time: "2:00 PM",
            sport: "Football",
            category: "Women's",
            dept1: "EE",
            dept2: "CVE",
            venue: "Football Field",
            status: "upcoming",
            stage: "Final",
            isSportsWeek: true
        },
        {
            id: 3,
            season: "2025-26",
            month: "February",
            monthNumber: 2,
            date: "2026-02-09",
            day: "Sunday",
            time: "9:00 AM",
            sport: "Basketball",
            category: "Men's",
            dept1: "AR",
            dept2: "CE",
            venue: "Indoor Court",
            status: "upcoming",
            stage: "Final",
            isSportsWeek: true
        },
        {
            id: 4,
            season: "2025-26",
            month: "February",
            monthNumber: 2,
            date: "2026-02-09",
            day: "Sunday",
            time: "11:00 AM",
            sport: "Volleyball",
            category: "Women's",
            dept1: "ME",
            dept2: "EE",
            venue: "Court 1",
            status: "upcoming",
            stage: "Final",
            isSportsWeek: true
        },
        {
            id: 5,
            season: "2025-26",
            month: "February",
            monthNumber: 2,
            date: "2026-02-10",
            day: "Monday",
            time: "10:00 AM",
            sport: "Athletics",
            category: "Mixed",
            dept1: "All Depts",
            dept2: "",
            venue: "Main Track",
            status: "upcoming",
            stage: "Finals Day",
            isSportsWeek: true
        },

        // JANUARY 2026 - KNOCKOUT STAGES
        {
            id: 6,
            season: "2025-26",
            month: "January",
            monthNumber: 1,
            date: "2026-01-15",
            day: "Thursday",
            time: "3:00 PM",
            sport: "Cricket",
            category: "Men's",
            dept1: "CE",
            dept2: "EE",
            venue: "Oval Ground",
            status: "completed",
            result: "CE won by 45 runs",
            stage: "Semi Final 1"
        },
        {
            id: 7,
            season: "2025-26",
            month: "January",
            monthNumber: 1,
            date: "2026-01-16",
            day: "Friday",
            time: "3:00 PM",
            sport: "Cricket",
            category: "Men's",
            dept1: "ME",
            dept2: "CVE",
            venue: "North Ground",
            status: "completed",
            result: "ME won by 6 wickets",
            stage: "Semi Final 2"
        },
        {
            id: 8,
            season: "2025-26",
            month: "January",
            monthNumber: 1,
            date: "2026-01-22",
            day: "Thursday",
            time: "4:00 PM",
            sport: "Football",
            category: "Women's",
            dept1: "EE",
            dept2: "AR",
            venue: "Football Field",
            status: "completed",
            result: "EE won 3-1",
            stage: "Semi Final"
        },

        // DECEMBER 2025 - LEAGUE MATCHES
        {
            id: 9,
            season: "2025-26",
            month: "December",
            monthNumber: 12,
            date: "2025-12-06",
            day: "Saturday",
            time: "2:00 PM",
            sport: "Cricket",
            category: "Men's",
            dept1: "CE",
            dept2: "AR",
            venue: "Oval Ground",
            status: "completed",
            result: "CE won by 30 runs",
            stage: "League Match"
        },
        {
            id: 10,
            season: "2025-26",
            month: "December",
            monthNumber: 12,
            date: "2025-12-13",
            day: "Saturday",
            time: "2:00 PM",
            sport: "Cricket",
            category: "Men's",
            dept1: "ME",
            dept2: "EE",
            venue: "North Ground",
            status: "completed",
            result: "ME won by 4 wickets",
            stage: "League Match"
        },
        {
            id: 11,
            season: "2025-26",
            month: "December",
            monthNumber: 12,
            date: "2025-12-14",
            day: "Sunday",
            time: "10:00 AM",
            sport: "Football",
            category: "Women's",
            dept1: "CVE",
            dept2: "ME",
            venue: "Football Field",
            status: "completed",
            result: "CVE won 2-1",
            stage: "League Match"
        },

        // NOVEMBER 2025 - OPENING MATCHES
        {
            id: 12,
            season: "2025-26",
            month: "November",
            monthNumber: 11,
            date: "2025-11-08",
            day: "Saturday",
            time: "10:00 AM",
            sport: "Cricket",
            category: "Men's",
            dept1: "CE",
            dept2: "CVE",
            venue: "Oval Ground",
            status: "completed",
            result: "CE won by 50 runs",
            stage: "Opening Match"
        },
        {
            id: 13,
            season: "2025-26",
            month: "November",
            monthNumber: 11,
            date: "2025-11-09",
            day: "Sunday",
            time: "3:00 PM",
            sport: "Football",
            category: "Women's",
            dept1: "EE",
            dept2: "ME",
            venue: "Football Field",
            status: "completed",
            result: "Match Drawn 1-1",
            stage: "Opening Match"
        },

        // OCTOBER 2025 - TRIAL/FRIENDLY MATCHES
        {
            id: 14,
            season: "2025-26",
            month: "October",
            monthNumber: 10,
            date: "2025-10-18",
            day: "Saturday",
            time: "4:00 PM",
            sport: "Basketball",
            category: "Men's",
            dept1: "AR",
            dept2: "CE",
            venue: "Indoor Court",
            status: "completed",
            result: "CE won 65-42",
            stage: "Friendly"
        },
        {
            id: 15,
            season: "2025-26",
            month: "October",
            monthNumber: 10,
            date: "2025-10-25",
            day: "Saturday",
            time: "3:00 PM",
            sport: "Badminton",
            category: "Women's",
            dept1: "EE",
            dept2: "ME",
            venue: "Indoor Hall",
            status: "completed",
            result: "EE won 3-2",
            stage: "Friendly"
        }
    ];

    const departments = ['All', 'CE', 'ME', 'EE', 'CVE', 'AR'];
    const sports = ['All', 'Cricket', 'Football', 'Basketball', 'Volleyball', 'Badminton', 'Athletics'];
    
    // Season months (Oct - Feb)
    const seasonMonths = [
        { value: 'all', label: 'All Months' },
        { value: 'October', label: 'October (Trials)' },
        { value: 'November', label: 'November (Openers)' },
        { value: 'December', label: 'December (League)' },
        { value: 'January', label: 'January (Knockouts)' },
        { value: 'February', label: 'February (Sports Week)' }
    ];

    // Filter matches
    const filteredMatches = seasonalMatches.filter(match => {
        if (selectedMonth !== 'all' && match.month !== selectedMonth) return false;
        if (selectedCategory !== 'all' && match.category !== selectedCategory && match.category !== 'Mixed') return false;
        if (selectedDept !== 'all' && match.dept1 !== selectedDept && match.dept2 !== selectedDept) return false;
        if (selectedSport !== 'all' && match.sport !== selectedSport) return false;
        return true;
    });

    // Group by month for display
    const groupedByMonth = filteredMatches.reduce((groups, match) => {
        const month = match.month;
        if (!groups[month]) {
            groups[month] = [];
        }
        groups[month].push(match);
        return groups;
    }, {});

    // Month order (Oct to Feb)
    const monthOrder = ['October', 'November', 'December', 'January', 'February'];
    const sortedMonths = Object.keys(groupedByMonth).sort((a, b) => 
        monthOrder.indexOf(a) - monthOrder.indexOf(b)
    );

    // Get current/upcoming matches
    const today = new Date();
    const upcomingMatches = seasonalMatches.filter(m => {
        const matchDate = new Date(m.date);
        return matchDate >= today && m.status === 'upcoming';
    }).sort((a, b) => new Date(a.date) - new Date(b.date));

    const sportsWeekMatches = seasonalMatches.filter(m => m.isSportsWeek && m.status === 'upcoming');

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section with Season Info */}
            <section className="relative bg-gradient-to-r from-orange-800 to-red-900 text-white pt-20 pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                            <span className="font-semibold">Season {seasonDisplay}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Winter Sports Calendar</h1>
                        <p className="text-lg text-gray-200 max-w-2xl mx-auto">
                            October {seasonStart} - February {seasonEnd}
                        </p>
                        {!isSportsSeason && (
                            <div className="mt-4 bg-yellow-500/20 p-3 rounded-lg inline-block">
                                <p className="text-sm">⚡ Off Season · Next season begins October {currentYear}</p>
                            </div>
                        )}
                    </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400"></div>
            </section>

            {/* Season Progress/Status */}
            <section className="py-4 bg-white border-b border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${isSportsSeason ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                                <span className="text-sm font-medium">
                                    {isSportsSeason ? 'Season Active' : 'Off Season'}
                                </span>
                            </div>
                            <div className="h-4 w-px bg-gray-300"></div>
                            <div className="text-sm text-gray-600">
                                <span className="font-semibold">Next Major:</span> Sports Week 2027 (Feb 8-12)
                            </div>
                        </div>
                        <Link to="/register">
                            <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-700 transition">
                                Register for Sports Week
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* PDF Schedules - Organized by Season */}
            <section className="py-8 bg-white border-b border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-3 mb-6">
                        <i className='bx bx-file text-2xl text-orange-600'></i>
                        <h2 className="text-xl font-bold text-gray-800">OFFICIAL SCHEDULES</h2>
                        <div className="h-px flex-1 bg-gray-200"></div>
                    </div>

                    {/* Current Season Schedules */}
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-500 mb-3">CURRENT SEASON {seasonDisplay}</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {pdfSchedules.filter(pdf => pdf.isCurrent).map((pdf) => (
                                <motion.div
                                    key={pdf.id}
                                    whileHover={{ y: -4 }}
                                    className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition cursor-pointer"
                                    onClick={() => setSelectedPdf(pdf) || setShowPdfViewer(true)}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <i className='bx bxs-file-pdf text-3xl text-red-500'></i>
                                        {pdf.isNew && (
                                            <span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                                                NEW
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="font-semibold text-gray-800 mb-1">{pdf.title}</h3>
                                    <p className="text-xs text-gray-500 mb-2">{pdf.month} {pdf.season}</p>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-gray-600">{pdf.event}</span>
                                        <span className="text-gray-500">{pdf.size}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Archive Accordion */}
                    <details className="group">
                        <summary className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900">
                            <i className='bx bx-archive'></i>
                            <span>Previous Seasons Archive</span>
                            <i className='bx bx-chevron-down group-open:rotate-180 transition'></i>
                        </summary>
                        <div className="mt-4 grid md:grid-cols-3 gap-4">
                            {pdfSchedules.filter(pdf => !pdf.isCurrent).map((pdf) => (
                                <div key={pdf.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                    <div className="flex items-center gap-2">
                                        <i className='bx bxs-file-pdf text-red-400'></i>
                                        <span className="text-sm font-medium">{pdf.title}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Season {pdf.season}</p>
                                </div>
                            ))}
                        </div>
                    </details>
                </div>
            </section>

            {/* Sports Week Countdown/Highlight */}
            {sportsWeekMatches.length > 0 && (
                <section className="py-6 bg-gradient-to-r from-orange-50 to-red-50 border-y border-orange-200">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap items-center gap-6">
                            <div className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold">
                                SPORTS WEEK 2026
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-800">8</div>
                                        <div className="text-xs text-gray-500">Feb</div>
                                    </div>
                                    <div className="text-orange-500 font-bold">→</div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-800">12</div>
                                        <div className="text-xs text-gray-500">Feb</div>
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-semibold text-gray-700">{sportsWeekMatches.length} Finals Scheduled</div>
                                        <div className="text-xs text-gray-500">Cricket • Football • Basketball • Volleyball • Athletics</div>
                                    </div>
                                </div>
                            </div>
                            <Link to="/sports-week">
                                <button className="bg-orange-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-orange-700 transition">
                                    View Sports Week
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Filters */}
            <section className="py-6 bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap gap-4 items-center">
                        <span className="text-sm font-medium text-gray-700">Filter Matches:</span>
                        
                        <select 
                            className="border rounded-lg px-3 py-2 text-sm"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                        >
                            {seasonMonths.map(month => (
                                <option key={month.value} value={month.value}>{month.label}</option>
                            ))}
                        </select>

                        <select 
                            className="border rounded-lg px-3 py-2 text-sm"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="all">All Categories</option>
                            <option value="Men's">Men's</option>
                            <option value="Women's">Women's</option>
                            <option value="Mixed">Mixed</option>
                        </select>

                        <select 
                            className="border rounded-lg px-3 py-2 text-sm"
                            value={selectedDept}
                            onChange={(e) => setSelectedDept(e.target.value)}
                        >
                            <option value="all">All Departments</option>
                            {departments.slice(1).map(dept => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>

                        <select 
                            className="border rounded-lg px-3 py-2 text-sm"
                            value={selectedSport}
                            onChange={(e) => setSelectedSport(e.target.value)}
                        >
                            {sports.map(sport => (
                                <option key={sport} value={sport === 'All' ? 'all' : sport}>{sport}</option>
                            ))}
                        </select>

                        {(selectedMonth !== 'all' || selectedCategory !== 'all' || selectedDept !== 'all' || selectedSport !== 'all') && (
                            <button 
                                onClick={() => {
                                    setSelectedMonth('all');
                                    setSelectedCategory('all');
                                    setSelectedDept('all');
                                    setSelectedSport('all');
                                }}
                                className="text-red-600 text-sm hover:text-red-700"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Schedule Display - Grouped by Month */}
            <section className="py-8 bg-gray-50">
                <div className="container mx-auto px-4">
                    {filteredMatches.length > 0 ? (
                        <div className="space-y-10">
                            {sortedMonths.map(month => (
                                <div key={month}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <h2 className="text-xl font-bold text-gray-800">{month}</h2>
                                        <div className="h-px flex-1 bg-gray-300"></div>
                                        <span className="text-sm text-gray-500">
                                            {groupedByMonth[month].length} matches
                                        </span>
                                    </div>
                                    
                                    <div className="grid gap-4">
                                        {groupedByMonth[month].map((match) => (
                                            <motion.div
                                                key={match.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className={`bg-white rounded-lg p-5 border-l-4 ${
                                                    match.isSportsWeek 
                                                        ? 'border-l-orange-600' 
                                                        : match.status === 'completed'
                                                        ? 'border-l-gray-400'
                                                        : 'border-l-indigo-600'
                                                } shadow-sm hover:shadow-md transition`}
                                            >
                                                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                                                    <div className="flex items-center gap-3">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                            match.status === 'completed' 
                                                                ? 'bg-gray-200 text-gray-600'
                                                                : 'bg-indigo-600 text-white'
                                                        }`}>
                                                            {match.status === 'completed' ? 'COMPLETED' : 'UPCOMING'}
                                                        </span>
                                                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                                                            {match.sport}
                                                        </span>
                                                        <span className={`text-xs px-3 py-1 rounded-full ${
                                                            match.category === "Men's" ? 'bg-blue-100 text-blue-700' :
                                                            match.category === "Women's" ? 'bg-rose-100 text-rose-700' :
                                                            'bg-purple-100 text-purple-700'
                                                        }`}>
                                                            {match.category}
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            {match.stage}
                                                        </span>
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-700">
                                                        {match.date} • {match.time}
                                                    </span>
                                                </div>
                                                
                                                <div className="flex flex-wrap items-center gap-4">
                                                    <div className="flex items-center gap-4">
                                                        <span className="font-bold text-xl text-gray-800">{match.dept1}</span>
                                                        {match.dept2 && (
                                                            <>
                                                                <span className="text-gray-400">VS</span>
                                                                <span className="font-bold text-xl text-gray-800">{match.dept2}</span>
                                                            </>
                                                        )}
                                                    </div>
                                                    
                                                    <div className="flex items-center gap-4 ml-auto">
                                                        <span className="text-sm text-gray-500 flex items-center gap-1">
                                                            <i className='bx bx-map'></i>
                                                            {match.venue}
                                                        </span>
                                                        {match.result && (
                                                            <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                                                {match.result}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <i className='bx bx-calendar-x text-5xl text-gray-400 mb-4'></i>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No matches found</h3>
                            <p className="text-gray-500">Try adjusting your filters</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Season Timeline */}
            <section className="py-8 bg-white">
                <div className="container mx-auto px-4">
                    <h3 className="font-bold text-gray-800 mb-6">📅 Season Timeline</h3>
                    <div className="relative">
                        <div className="absolute top-5 left-0 w-full h-1 bg-gray-200"></div>
                        <div className="grid grid-cols-5 relative">
                            {monthOrder.map((month, idx) => (
                                <div key={month} className="text-center">
                                    <div className={`w-5 h-5 mx-auto rounded-full relative z-10 ${
                                        idx <= monthOrder.indexOf('February') ? 'bg-orange-600' : 'bg-gray-300'
                                    }`}></div>
                                    <div className="mt-2 font-semibold text-sm">{month}</div>
                                    <div className="text-xs text-gray-500">
                                        {idx === 0 && 'Trials'}
                                        {idx === 1 && 'Openers'}
                                        {idx === 2 && 'League'}
                                        {idx === 3 && 'Knockouts'}
                                        {idx === 4 && 'Finals'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* PDF Viewer Modal */}
            <AnimatePresence>
                {showPdfViewer && selectedPdf && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
                        onClick={() => setShowPdfViewer(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-4 border-b flex items-center justify-between">
                                <div>
                                    <h3 className="font-bold">{selectedPdf.title}</h3>
                                    <p className="text-xs text-gray-500">{selectedPdf.season} · {selectedPdf.month}</p>
                                </div>
                                <button onClick={() => setShowPdfViewer(false)}>
                                    <i className='bx bx-x text-2xl'></i>
                                </button>
                            </div>
                            <div className="bg-gray-100 h-[70vh] flex items-center justify-center">
                                <div className="text-center">
                                    <i className='bx bxs-file-pdf text-6xl text-red-400 mb-4'></i>
                                    <p>PDF Preview</p>
                                    <a href={selectedPdf.fileUrl} target="_blank" 
                                       className="inline-block mt-4 bg-gray-800 text-white px-4 py-2 rounded-lg">
                                        Open PDF
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Schedule;