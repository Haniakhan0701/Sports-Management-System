import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import 'boxicons/css/boxicons.min.css';

const Schedule = () => {
    const [selectedMonth, setSelectedMonth] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDept, setSelectedDept] = useState('all');
    const [selectedSport, setSelectedSport] = useState('all');
    const [showPdfViewer, setShowPdfViewer] = useState(false);
    const [selectedPdf, setSelectedPdf] = useState(null);

    const [seasonalMatches, setSeasonalMatches] = useState([]);
    const [matchesLoading, setMatchesLoading] = useState(true);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/games');
                const data = res.data.data || [];

                const transformed = data.map(g => {
                    const dateObj = new Date(g.date);
                    const monthName = dateObj.toLocaleString('en-US', { month: 'long' });
                    const monthNumber = dateObj.getMonth() + 1;
                    const dateStr = dateObj.toISOString().split('T')[0];
                    const timeStr = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                    const dayStr = dateObj.toLocaleString('en-US', { weekday: 'long' });

                    return {
                        id:           g._id,
                        month:        monthName,
                        monthNumber:  monthNumber,
                        date:         dateStr,
                        day:          dayStr,
                        time:         timeStr,
                        sport:        g.sport,
                        category:     g.category,
                        dept1:        g.teamA,
                        dept2:        g.teamB,
                        venue:        g.venue || 'TBD',
                        status:       g.status,
                        result:       g.result || '',
                        stage:        '',          // ← notes hidden from public view
                        isSportsWeek: false,
                        scoreA:       g.scoreA,
                        scoreB:       g.scoreB,
                    };
                });

                setSeasonalMatches(transformed);
            } catch (err) {
                console.error('Failed to fetch matches:', err);
            } finally {
                setMatchesLoading(false);
            }
        };

        fetchMatches();
        const interval = setInterval(fetchMatches, 30000);
        return () => clearInterval(interval);
    }, []);

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const isSportsSeason = currentMonth >= 8 || currentMonth <= 1;
    const seasonStart = isSportsSeason && currentMonth >= 8 ? currentYear : currentYear - 1;
    const seasonEnd = seasonStart + 1;
    const seasonDisplay = `${seasonStart}-${seasonEnd}`;

    const pdfSchedules = [
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

    const departments = ['All', 'CE', 'ME', 'EE', 'CVE', 'AR'];
    const sports = ['All', 'Cricket', 'Football', 'Tug of War', 'Dodge Ball', '100m Race', 'Badminton', 'Bottle Spin Chase', '4×100m Relay'];

    const seasonMonths = [
        { value: 'all',      label: 'All Months' },
        { value: 'October',  label: 'October (Trials)' },
        { value: 'November', label: 'November (Openers)' },
        { value: 'December', label: 'December (League)' },
        { value: 'January',  label: 'January (Knockouts)' },
        { value: 'February', label: 'February (Sports Week)' }
    ];

    const filteredMatches = seasonalMatches.filter(match => {
        if (selectedMonth !== 'all' && match.month !== selectedMonth) return false;
        if (selectedCategory !== 'all' && match.category !== selectedCategory && match.category !== 'Mixed') return false;
        if (selectedDept !== 'all' && match.dept1 !== selectedDept && match.dept2 !== selectedDept) return false;
        if (selectedSport !== 'all' && match.sport !== selectedSport) return false;
        return true;
    });

    const groupedByMonth = filteredMatches.reduce((groups, match) => {
        const month = match.month;
        if (!groups[month]) groups[month] = [];
        groups[month].push(match);
        return groups;
    }, {});

    const monthOrder = ['October', 'November', 'December', 'January', 'February'];
    const sortedMonths = Object.keys(groupedByMonth).sort((a, b) =>
        monthOrder.indexOf(a) - monthOrder.indexOf(b)
    );

    const sportsWeekMatches = seasonalMatches.filter(m => m.isSportsWeek && m.status === 'upcoming');
    const liveMatches = seasonalMatches.filter(m => m.status === 'live');

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Hero Section */}
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

            {/* Season Status Bar */}
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
                            {liveMatches.length > 0 && (
                                <div className="flex items-center gap-2 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
                                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                    <span className="text-xs font-bold text-red-600">
                                        {liveMatches.length} Match{liveMatches.length > 1 ? 'es' : ''} Live Now
                                    </span>
                                </div>
                            )}
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

            {/* PDF Schedules */}
            <section className="py-8 bg-white border-b border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-3 mb-6">
                        <i className='bx bx-file text-2xl text-orange-600'></i>
                        <h2 className="text-xl font-bold text-gray-800">OFFICIAL SCHEDULES</h2>
                        <div className="h-px flex-1 bg-gray-200"></div>
                    </div>
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-500 mb-3">CURRENT SEASON {seasonDisplay}</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {pdfSchedules.filter(pdf => pdf.isCurrent).map((pdf) => (
                                <motion.div
                                    key={pdf.id}
                                    whileHover={{ y: -4 }}
                                    className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition cursor-pointer"
                                    onClick={() => { setSelectedPdf(pdf); setShowPdfViewer(true); }}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <i className='bx bxs-file-pdf text-3xl text-red-500'></i>
                                        {pdf.isNew && (
                                            <span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">NEW</span>
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

            {/* Sports Week Highlight */}
            {sportsWeekMatches.length > 0 && (
                <section className="py-6 bg-gradient-to-r from-orange-50 to-red-50 border-y border-orange-200">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap items-center gap-6">
                            <div className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold">SPORTS WEEK 2027</div>
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
                                        <div className="text-xs text-gray-500">Cricket • Football • Badminton • Tug of War • Athletics</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Filters */}
            <section className="py-6 bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap gap-4 items-center">
                        <span className="text-sm font-medium text-gray-700">Filter Matches:</span>
                        <select className="border rounded-lg px-3 py-2 text-sm text-gray-700" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                            {seasonMonths.map(month => (
                                <option key={month.value} value={month.value}>{month.label}</option>
                            ))}
                        </select>
                        <select className="border rounded-lg px-3 py-2 text-sm text-gray-700" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                            <option value="all">All Categories</option>
                            <option value="Men's">Men's</option>
                            <option value="Women's">Women's</option>
                        </select>
                        <select className="border rounded-lg px-3 py-2 text-sm text-gray-700" value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
                            <option value="all">All Departments</option>
                            {departments.slice(1).map(dept => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>
                        <select className="border rounded-lg px-3 py-2 text-sm text-gray-700" value={selectedSport} onChange={(e) => setSelectedSport(e.target.value)}>
                            {sports.map(sport => (
                                <option key={sport} value={sport === 'All' ? 'all' : sport}>{sport}</option>
                            ))}
                        </select>
                        {(selectedMonth !== 'all' || selectedCategory !== 'all' || selectedDept !== 'all' || selectedSport !== 'all') && (
                            <button onClick={() => { setSelectedMonth('all'); setSelectedCategory('all'); setSelectedDept('all'); setSelectedSport('all'); }}
                                className="text-red-600 text-sm hover:text-red-700">
                                Clear
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Schedule Display */}
            <section className="py-8 bg-gray-50">
                <div className="container mx-auto px-4">
                    {matchesLoading ? (
                        <div className="flex items-center justify-center py-20 text-gray-400">
                            <i className='bx bx-loader-alt animate-spin text-3xl mr-3'></i>
                            Loading matches...
                        </div>
                    ) : filteredMatches.length > 0 ? (
                        <div className="space-y-10">
                            {sortedMonths.map(month => (
                                <div key={month}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <h2 className="text-xl font-bold text-gray-800">{month}</h2>
                                        <div className="h-px flex-1 bg-gray-300"></div>
                                        <span className="text-sm text-gray-500">{groupedByMonth[month].length} matches</span>
                                    </div>
                                    <div className="grid gap-4">
                                        {groupedByMonth[month].map((match) => (
                                            <motion.div
                                                key={match.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className={`bg-white rounded-lg p-5 border-l-4 ${
                                                    match.status === 'live'      ? 'border-l-red-500' :
                                                    match.status === 'completed' ? 'border-l-gray-400' :
                                                    'border-l-indigo-600'
                                                } shadow-sm hover:shadow-md transition`}
                                            >
                                                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                                                    <div className="flex items-center gap-3">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                            match.status === 'live'      ? 'bg-red-500 text-white animate-pulse' :
                                                            match.status === 'completed' ? 'bg-gray-200 text-gray-600' :
                                                            'bg-indigo-600 text-white'
                                                        }`}>
                                                            {match.status === 'live' ? '🔴 LIVE' :
                                                             match.status === 'completed' ? 'COMPLETED' : 'UPCOMING'}
                                                        </span>
                                                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                                                            {match.sport}
                                                        </span>
                                                        <span className={`text-xs px-3 py-1 rounded-full ${
                                                            match.category === "Men's"   ? 'bg-blue-100 text-blue-700' :
                                                            match.category === "Women's" ? 'bg-rose-100 text-rose-700' :
                                                            'bg-purple-100 text-purple-700'
                                                        }`}>
                                                            {match.category}
                                                        </span>
                                                        {/* stage is now always empty — notes are admin-only */}
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
                                                                {match.status === 'live' && match.scoreA !== null && match.scoreB !== null ? (
                                                                    <span className="text-lg font-black text-red-600">
                                                                        {match.scoreA} – {match.scoreB}
                                                                    </span>
                                                                ) : (
                                                                    <span className="text-gray-400">VS</span>
                                                                )}
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
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                {seasonalMatches.length === 0 ? 'No matches scheduled yet' : 'No matches found'}
                            </h3>
                            <p className="text-gray-500">
                                {seasonalMatches.length === 0 ? 'Admin will add matches soon. Check back later!' : 'Try adjusting your filters'}
                            </p>
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
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
                        onClick={() => setShowPdfViewer(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
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
