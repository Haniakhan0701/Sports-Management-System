import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import 'boxicons/css/boxicons.min.css';

// Import images from assets
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";

const Schedule = () => {
    const [selectedMonth, setSelectedMonth] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDept, setSelectedDept] = useState('all');
    const [selectedSport, setSelectedSport] = useState('all');

    // Current date
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // Determine if we're in sports season (Sept - Feb)
    const isSportsSeason = currentMonth >= 8 || currentMonth <= 1; // Sept(8) to Feb(1)

    // Sports Season Year display (e.g., "2026-27")
    const seasonStart = isSportsSeason && currentMonth >= 8 ? currentYear : currentYear - 1;
    const seasonEnd = seasonStart + 1;
    const seasonDisplay = `${seasonStart}-${seasonEnd}`;

    // --- PDF Schedules Data Array ---
    const pdfSchedules = [
        {
            id: 1,
            title: "Sports Week 2027 - Complete Schedule",
            month: "February",
            file: "/pdfs/my1.pdf",
            size: "2.4 MB",
            isNew: true
        },
        {
            id: 2,
            title: "January 2027 - Knockout Matches",
            month: "January",
            file: "/pdfs/my2.pdf",
            size: "1.8 MB",
            isNew: false
        },
        {
            id: 3,
            title: "December 2026 - League Matches",
            month: "December",
            file: "/pdfs/my3.pdf",
            size: "2.1 MB",
            isNew: false
        }
    ];

    // --- Seasonal Matches Data Array ---
    const seasonalMatches = [
        // FEBRUARY 2027 - SPORTS WEEK (MAIN EVENT)
        {
            id: 1,
            season: "2026-27",
            month: "February",
            monthNumber: 2,
            date: "2027-02-08",
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
            season: "2026-27",
            month: "February",
            monthNumber: 2,
            date: "2027-02-08",
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
            season: "2026-27",
            month: "February",
            monthNumber: 2,
            date: "2027-02-09",
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
            season: "2026-27",
            month: "February",
            monthNumber: 2,
            date: "2027-02-09",
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
            season: "2026-27",
            month: "February",
            monthNumber: 2,
            date: "2027-02-10",
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

        // JANUARY 2027 - KNOCKOUT STAGES
        {
            id: 6,
            season: "2026-27",
            month: "January",
            monthNumber: 1,
            date: "2027-01-15",
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
            season: "2026-27",
            month: "January",
            monthNumber: 1,
            date: "2027-01-16",
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
            season: "2026-27",
            month: "January",
            monthNumber: 1,
            date: "2027-01-22",
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

        // DECEMBER 2026 - LEAGUE MATCHES
        {
            id: 9,
            season: "2026-27",
            month: "December",
            monthNumber: 12,
            date: "2026-12-06",
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
            season: "2026-27",
            month: "December",
            monthNumber: 12,
            date: "2026-12-13",
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
            season: "2026-27",
            month: "December",
            monthNumber: 12,
            date: "2026-12-14",
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

        // NOVEMBER 2026 - OPENING MATCHES
        {
            id: 12,
            season: "2026-27",
            month: "November",
            monthNumber: 11,
            date: "2026-11-08",
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
            season: "2026-27",
            month: "November",
            monthNumber: 11,
            date: "2026-11-09",
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

        // OCTOBER 2026 - TRIAL/FRIENDLY MATCHES
        {
            id: 14,
            season: "2026-27",
            month: "October",
            monthNumber: 10,
            date: "2026-10-18",
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
            season: "2026-27",
            month: "October",
            monthNumber: 10,
            date: "2026-10-25",
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

    // Get upcoming matches
    const today = new Date();
    const upcomingMatches = seasonalMatches.filter(m => {
        const matchDate = new Date(m.date);
        return matchDate >= today && m.status === 'upcoming';
    }).sort((a, b) => new Date(a.date) - new Date(b.date));

    const sportsWeekMatches = seasonalMatches.filter(m => m.isSportsWeek && m.status === 'upcoming');

    // Filter option components with active state styling
    const FilterSelect = ({ label, value, onChange, options }) => {
        const isActive = value !== 'all';
        return (
            <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                    isActive 
                        ? 'bg-black text-white shadow-lg' 
                        : 'bg-white text-black border border-gray-300 hover:border-gray-400'
                }`}
            >
                <select
                    className={`appearance-none w-full px-4 py-2.5 pr-10 text-sm font-medium cursor-pointer bg-transparent relative z-10 ${
                        isActive ? 'text-white' : 'text-black'
                    }`}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                >
                    {options.map((option) => (
                        <option 
                            key={option.value} 
                            value={option.value}
                            className="bg-white text-black"
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${
                    isActive ? 'text-white' : 'text-black'
                }`}>
                    <i className='bx bx-chevron-down text-sm'></i>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section with Season Info and Images */}
            <section className="relative bg-gradient-to-r from-orange-800 to-red-900 text-white pt-20 pb-24 overflow-hidden">
                {/* Background decorative images */}
                <div className="absolute top-10 left-10 w-32 h-32 opacity-10 rounded-full overflow-hidden">
                    <img src={img1} alt="Sports decoration" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-10 right-10 w-40 h-40 opacity-10 rounded-full overflow-hidden">
                    <img src={img2} alt="Sports decoration" className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-1/2 left-1/4 w-24 h-24 opacity-5 rounded-full overflow-hidden">
                    <img src={img2} alt="Sports decoration" className="w-full h-full object-cover" />
                </div>

                <div className="absolute inset-0 bg-black/20"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2.5 rounded-full mb-4">
                            <span className="font-semibold text-sm tracking-wide">CURRENT SEASON 2026-2027</span>
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
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-700 transition shadow-md"
                            >
                                Register for Sports Week
                            </motion.button>
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

                    {/* Current Season Schedules - Mapped from array */}
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-500 mb-3">CURRENT SEASON 2026-2027</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {pdfSchedules.map((pdf) => (
                                <motion.div
                                    key={pdf.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileHover={{ y: -6, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                                    className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:border-orange-300 transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center">
                                            <i className='bx bxs-file-pdf text-2xl text-red-500'></i>
                                        </div>
                                        {pdf.isNew && (
                                            <span className="bg-green-500 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-sm">
                                                NEW
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="font-semibold text-gray-800 mb-1 text-sm leading-tight">{pdf.title}</h3>
                                    <p className="text-xs text-gray-500 mb-4">{pdf.month} 2026-2027</p>
                                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                        <span className="text-xs text-gray-500 font-medium">{pdf.size}</span>
                                        <a
                                            href={pdf.file}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition flex items-center gap-1.5 shadow-sm hover:shadow-md"
                                        >
                                            <i className='bx bx-link-external'></i>
                                            Open PDF
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Sports Week Countdown/Highlight */}
            {sportsWeekMatches.length > 0 && (
                <section className="py-6 bg-gradient-to-r from-orange-50 to-red-50 border-y border-orange-200">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap items-center gap-6">
                            <div className="bg-orange-600 text-white px-5 py-2.5 rounded-lg font-bold shadow-md">
                                SPORTS WEEK 2027
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-800">8</div>
                                        <div className="text-xs text-gray-500">Feb</div>
                                    </div>
                                    <div className="text-orange-500 font-bold text-xl">→</div>
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
                            <Link to="/media#sports-week">
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-orange-600 text-white px-5 py-2.5 rounded-lg text-sm hover:bg-orange-700 transition shadow-md"
                                >
                                    View Sports Week
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Filters */}
            <section className="py-6 bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap gap-3 items-center">
                        <span className="text-sm font-semibold text-gray-700 mr-2">Filter Matches:</span>

                        <FilterSelect
                            label="Month"
                            value={selectedMonth}
                            onChange={setSelectedMonth}
                            options={seasonMonths}
                        />

                        <FilterSelect
                            label="Category"
                            value={selectedCategory}
                            onChange={setSelectedCategory}
                            options={[
                                { value: 'all', label: 'All Categories' },
                                { value: "Men's", label: "Men's" },
                                { value: "Women's", label: "Women's" },
                                { value: 'Mixed', label: 'Mixed' }
                            ]}
                        />

                        <FilterSelect
                            label="Department"
                            value={selectedDept}
                            onChange={setSelectedDept}
                            options={[
                                { value: 'all', label: 'All Departments' },
                                ...departments.slice(1).map(dept => ({ value: dept, label: dept }))
                            ]}
                        />

                        <FilterSelect
                            label="Sport"
                            value={selectedSport}
                            onChange={setSelectedSport}
                            options={sports.map(sport => ({ 
                                value: sport === 'All' ? 'all' : sport, 
                                label: sport 
                            }))}
                        />

                        {(selectedMonth !== 'all' || selectedCategory !== 'all' || selectedDept !== 'all' || selectedSport !== 'all') && (
                            <motion.button 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                onClick={() => {
                                    setSelectedMonth('all');
                                    setSelectedCategory('all');
                                    setSelectedDept('all');
                                    setSelectedSport('all');
                                }}
                                className="text-red-600 text-sm font-medium hover:text-red-700 transition flex items-center gap-1 ml-2"
                            >
                                <i className='bx bx-x-circle'></i>
                                Clear All
                            </motion.button>
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
                                <motion.div 
                                    key={month}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <h2 className="text-xl font-bold text-gray-800">{month}</h2>
                                        <div className="h-px flex-1 bg-gray-300"></div>
                                        <span className="text-sm text-gray-500 font-medium">
                                            {groupedByMonth[month].length} match{groupedByMonth[month].length !== 1 ? 'es' : ''}
                                        </span>
                                    </div>

                                    <div className="grid gap-4">
                                        {groupedByMonth[month].map((match) => (
                                            <motion.div
                                                key={match.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                whileHover={{ y: -2, boxShadow: "0 8px 20px -5px rgba(0, 0, 0, 0.08)" }}
                                                className={`bg-white rounded-xl p-5 border-l-4 ${
                                                    match.isSportsWeek
                                                        ? 'border-l-orange-600'
                                                        : match.status === 'completed'
                                                        ? 'border-l-gray-400'
                                                        : 'border-l-blue-600'
                                                } shadow-sm transition-all duration-300`}
                                            >
                                                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                            match.status === 'completed' 
                                                                ? 'bg-gray-200 text-gray-600'
                                                                : 'bg-blue-600 text-white'
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
                                                        {match.isSportsWeek && (
                                                            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
                                                                Sports Week
                                                            </span>
                                                        )}
                                                        <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                                                            {match.stage}
                                                        </span>
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-700 bg-gray-50 px-3 py-1 rounded-lg">
                                                        {match.date} • {match.time}
                                                    </span>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-4">
                                                    <div className="flex items-center gap-4">
                                                        <span className="font-bold text-xl text-gray-800">{match.dept1}</span>
                                                        {match.dept2 && (
                                                            <>
                                                                <span className="text-gray-400 font-medium">VS</span>
                                                                <span className="font-bold text-xl text-gray-800">{match.dept2}</span>
                                                            </>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center gap-4 ml-auto">
                                                        <span className="text-sm text-gray-500 flex items-center gap-1.5">
                                                            <i className='bx bx-map-pin'></i>
                                                            {match.venue}
                                                        </span>
                                                        {match.result && (
                                                            <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                                                                {match.result}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-16 bg-white rounded-xl shadow-sm"
                        >
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                                <i className='bx bx-calendar-x text-3xl text-gray-400'></i>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No matches found</h3>
                            <p className="text-gray-500 mb-4">Try adjusting your filters to see more results</p>
                            <button 
                                onClick={() => {
                                    setSelectedMonth('all');
                                    setSelectedCategory('all');
                                    setSelectedDept('all');
                                    setSelectedSport('all');
                                }}
                                className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-900 transition"
                            >
                                Reset Filters
                            </button>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Season Timeline */}
            <section className="py-8 bg-white">
                <div className="container mx-auto px-4">
                    <h3 className="font-bold text-gray-800 mb-6 text-lg">📅 Season Timeline 2026-2027</h3>
                    <div className="relative">
                        <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 rounded-full"></div>
                        <div className="grid grid-cols-5 gap-2 relative">
                            {monthOrder.map((month, idx) => (
                                <motion.div 
                                    key={month} 
                                    className="text-center"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <div className={`w-6 h-6 mx-auto rounded-full relative z-10 flex items-center justify-center ${
                                        idx <= monthOrder.indexOf('February') ? 'bg-orange-600' : 'bg-gray-300'
                                    }`}>
                                        {idx <= monthOrder.indexOf('February') && (
                                            <div className="w-2 h-2 rounded-full bg-white"></div>
                                        )}
                                    </div>
                                    <div className="mt-3 font-semibold text-sm text-gray-800">{month}</div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        {idx === 0 && 'Trials'}
                                        {idx === 1 && 'Openers'}
                                        {idx === 2 && 'League'}
                                        {idx === 3 && 'Knockouts'}
                                        {idx === 4 && 'Finals'}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Schedule;