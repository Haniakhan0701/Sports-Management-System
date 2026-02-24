// src/pages/Standings.jsx
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import 'boxicons/css/boxicons.min.css';

const Standings = () => {
    const [selectedSeason, setSelectedSeason] = useState("2025-26");
    const [selectedSport, setSelectedSport] = useState("all");
    const [standings, setStandings] = useState([]);
    const [loading, setLoading] = useState(true);

    // Seasons available
    const seasons = ["2025-26", "2024-25", "2023-24"];
    
    // Department colors (matching your Home page)
    const deptColors = {
        'CE': { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', light: 'bg-blue-100' },
        'ME': { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', light: 'bg-amber-100' },
        'EE': { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', light: 'bg-emerald-100' },
        'CVE': { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200', light: 'bg-slate-100' },
        'AR': { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200', light: 'bg-rose-100' }
    };

    // Full department names
    const deptFullNames = {
        'CE': 'Computer Engineering',
        'ME': 'Mechanical Engineering',
        'EE': 'Electrical Engineering',
        'CVE': 'Civil Engineering',
        'AR': 'Architecture'
    };

    // Sports list
    const sports = [
        { id: 'cricket', name: 'Cricket', icon: '🏏', category: "Men's/Women's" },
        { id: 'football', name: 'Football', icon: '⚽', category: "Men's/Women's" },
        { id: 'basketball', name: 'Basketball', icon: '🏀', category: "Men's" },
        { id: 'volleyball', name: 'Volleyball', icon: '🏐', category: "Women's" },
        { id: 'badminton', name: 'Badminton', icon: '🏸', category: 'Both' },
        { id: 'athletics', name: 'Athletics', icon: '🏃', category: 'Both' },
        { id: 'tug-of-war', name: 'Tug of War', icon: '🪢', category: 'Both' },
        { id: 'dodge-ball', name: 'Dodge Ball', icon: '🎯', category: 'Both' },
        { id: '100m-race', name: '100m Race', icon: '⚡', category: 'Both' },
        { id: 'relay', name: '4×100m Relay', icon: '🏃‍♂️', category: 'Both' },
        { id: 'running-super-ball', name: 'Running Super Ball', icon: '⚽', category: "Women's" },
        { id: 'bottle-spin-chase', name: 'Bottle Spin Chase', icon: '🔄', category: 'Both' }
    ];

    // Standings Data Structure
    const allStandingsData = {
        "2025-26": {
            overall: [
                { 
                    dept: 'CE', 
                    played: 24, 
                    wins: 18, 
                    losses: 4, 
                    draws: 2,
                    points: 245,
                    gold: 3,
                    silver: 2,
                    bronze: 1,
                    sportsWon: ['Cricket', 'Basketball', 'Badminton'],
                    trend: 'up',
                    form: ['W', 'W', 'W', 'L', 'W'] // Last 5 results
                },
                { 
                    dept: 'ME', 
                    played: 24, 
                    wins: 16, 
                    losses: 6, 
                    draws: 2,
                    points: 210,
                    gold: 2,
                    silver: 3,
                    bronze: 2,
                    sportsWon: ['Football', 'Tug of War'],
                    trend: 'stable',
                    form: ['W', 'L', 'W', 'W', 'L']
                },
                { 
                    dept: 'EE', 
                    played: 23, 
                    wins: 14, 
                    losses: 7, 
                    draws: 2,
                    points: 185,
                    gold: 2,
                    silver: 1,
                    bronze: 3,
                    sportsWon: ['Volleyball'],
                    trend: 'up',
                    form: ['W', 'W', 'L', 'W', 'W']
                },
                { 
                    dept: 'CVE', 
                    played: 23, 
                    wins: 11, 
                    losses: 10, 
                    draws: 2,
                    points: 150,
                    gold: 1,
                    silver: 2,
                    bronze: 2,
                    sportsWon: ['Dodge Ball'],
                    trend: 'down',
                    form: ['L', 'L', 'W', 'L', 'L']
                },
                { 
                    dept: 'AR', 
                    played: 22, 
                    wins: 9, 
                    losses: 12, 
                    draws: 1,
                    points: 120,
                    gold: 1,
                    silver: 1,
                    bronze: 2,
                    sportsWon: [],
                    trend: 'stable',
                    form: ['L', 'W', 'L', 'L', 'W']
                }
            ],
            cricket: {
                'CE': { played: 5, won: 4, lost: 1, points: 8, position: 1, nrr: '+2.4' },
                'ME': { played: 5, won: 3, lost: 2, points: 6, position: 2, nrr: '+1.2' },
                'EE': { played: 5, won: 2, lost: 3, points: 4, position: 3, nrr: '-0.5' },
                'CVE': { played: 5, won: 1, lost: 4, points: 2, position: 4, nrr: '-1.8' },
                'AR': { played: 5, won: 0, lost: 5, points: 0, position: 5, nrr: '-3.1' }
            },
            football: {
                'EE': { played: 4, won: 3, lost: 1, points: 6, position: 1, gf: 8, ga: 3 },
                'ME': { played: 4, won: 2, lost: 2, points: 4, position: 2, gf: 5, ga: 4 },
                'CE': { played: 4, won: 1, lost: 3, points: 2, position: 3, gf: 3, ga: 6 },
                'CVE': { played: 4, won: 0, lost: 4, points: 0, position: 4, gf: 2, ga: 8 }
            },
            basketball: {
                'CE': { played: 3, won: 3, lost: 0, points: 6, position: 1 },
                'AR': { played: 3, won: 2, lost: 1, points: 4, position: 2 },
                'ME': { played: 3, won: 1, lost: 2, points: 2, position: 3 },
                'EE': { played: 3, won: 0, lost: 3, points: 0, position: 4 }
            }
        },
        "2024-25": {
            overall: [
                { dept: 'ME', points: 235, gold: 3, silver: 2, bronze: 1 },
                { dept: 'CE', points: 220, gold: 2, silver: 3, bronze: 2 },
                { dept: 'EE', points: 190, gold: 2, silver: 1, bronze: 3 },
                { dept: 'AR', points: 165, gold: 1, silver: 2, bronze: 2 },
                { dept: 'CVE', points: 140, gold: 1, silver: 1, bronze: 2 }
            ]
        }
    };

    // Load standings based on selections
    useEffect(() => {
        setLoading(true);
        // Simulate API fetch
        setTimeout(() => {
            try {
                if (selectedSport === 'all') {
                    setStandings(allStandingsData[selectedSeason].overall || []);
                } else {
                    const sportData = allStandingsData[selectedSeason]?.[selectedSport];
                    if (sportData) {
                        const formatted = Object.entries(sportData).map(([dept, data]) => ({
                            dept,
                            ...data
                        })).sort((a, b) => (a.position || 999) - (b.position || 999));
                        setStandings(formatted);
                    } else {
                        setStandings([]);
                    }
                }
            } catch (error) {
                console.error("Error loading standings:", error);
                setStandings([]);
            }
            setLoading(false);
        }, 500);
    }, [selectedSeason, selectedSport]);

    // Get form badge color
    const getFormBadge = (result) => {
        switch(result) {
            case 'W': return 'bg-green-100 text-green-700';
            case 'L': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-amber-800 to-yellow-900 text-white pt-20 pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <span className="inline-block border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium tracking-wide mb-5">
                             SEASON {selectedSeason}
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                            Championship <br />Standings
                        </h1>
                        <p className="text-lg text-gray-200 max-w-2xl mx-auto">
                            Track department performance across all sports. Updated after every match.
                        </p>
                    </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400"></div>
            </section>

            {/* Filters Bar */}
            <section className="py-4 bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                        <div className="flex flex-wrap gap-3">
                            <select 
                                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                                value={selectedSeason}
                                onChange={(e) => setSelectedSeason(e.target.value)}
                            >
                                {seasons.map(season => (
                                    <option key={season} value={season}>Season {season}</option>
                                ))}
                            </select>

                            <select 
                                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                                value={selectedSport}
                                onChange={(e) => setSelectedSport(e.target.value)}
                            >
                                <option value="all">All Sports (Overall)</option>
                                {sports.map(sport => (
                                    <option key={sport.id} value={sport.id}>
                                        {sport.icon} {sport.name} ({sport.category})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="text-sm text-gray-600 flex items-center gap-2">
                            <i className='bx bx-time'></i>
                            Last Updated: Feb 23, 2026 • 5:30 PM
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Standings Table */}
            <section className="py-8">
                <div className="container mx-auto px-4">
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading standings...</p>
                        </div>
                    ) : standings.length > 0 ? (
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            {/* Table Header */}
                            <div className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white p-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold flex items-center gap-2">
                                        <i className='bx bx-trophy'></i>
                                        {selectedSport === 'all' ? 'Overall Championship Standings' : 
                                         `${sports.find(s => s.id === selectedSport)?.name} Standings`}
                                    </h2>
                                    <div className="text-sm bg-white/20 px-3 py-1 rounded-full">
                                        Season {selectedSeason}
                                    </div>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Rank</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Department</th>
                                            {selectedSport === 'all' ? (
                                                <>
                                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">P</th>
                                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">W</th>
                                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">L</th>
                                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">D</th>
                                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">🥇</th>
                                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">🥈</th>
                                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">🥉</th>
                                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Pts</th>
                                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Form</th>
                                                </>
                                            ) : (
                                                <>
                                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Pld</th>
                                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">W</th>
                                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">L</th>
                                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Pts</th>
                                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">NRR</th>
                                                </>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {standings.map((dept, index) => (
                                            <motion.tr
                                                key={dept.dept}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className={`hover:bg-gray-50 transition ${
                                                    index === 0 ? 'bg-amber-50/50' : ''
                                                }`}
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                                                            index === 0 ? 'bg-yellow-400 text-yellow-900' :
                                                            index === 1 ? 'bg-gray-300 text-gray-700' :
                                                            index === 2 ? 'bg-amber-700 text-amber-100' :
                                                            'bg-gray-100 text-gray-600'
                                                        }`}>
                                                            {index + 1}
                                                        </span>
                                                        {dept.trend === 'up' && <i className='bx bx-trending-up text-green-500'></i>}
                                                        {dept.trend === 'down' && <i className='bx bx-trending-down text-red-500'></i>}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-lg ${deptColors[dept.dept].bg} flex items-center justify-center font-bold ${deptColors[dept.dept].text}`}>
                                                            {dept.dept}
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-gray-800">{deptFullNames[dept.dept]}</div>
                                                            {dept.sportsWon && dept.sportsWon.length > 0 && (
                                                                <div className="text-xs text-gray-500 flex items-center gap-1">
                                                                    <i className='bx bx-trophy text-amber-500'></i>
                                                                    {dept.sportsWon.join(' • ')}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                
                                                {selectedSport === 'all' ? (
                                                    <>
                                                        <td className="px-6 py-4 text-center font-medium">{dept.played}</td>
                                                        <td className="px-6 py-4 text-center font-medium text-green-600">{dept.wins}</td>
                                                        <td className="px-6 py-4 text-center font-medium text-red-600">{dept.losses}</td>
                                                        <td className="px-6 py-4 text-center font-medium text-gray-600">{dept.draws || 0}</td>
                                                        <td className="px-6 py-4 text-center">
                                                            <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-sm font-bold">
                                                                {dept.gold}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm font-bold">
                                                                {dept.silver}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-sm font-bold">
                                                                {dept.bronze}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <span className="text-2xl font-bold text-gray-800">{dept.points}</span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex justify-center gap-1">
                                                                {dept.form?.map((result, i) => (
                                                                    <span key={i} className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold ${getFormBadge(result)}`}>
                                                                        {result}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td className="px-6 py-4 text-center">{dept.played}</td>
                                                        <td className="px-6 py-4 text-center text-green-600">{dept.won}</td>
                                                        <td className="px-6 py-4 text-center text-red-600">{dept.lost}</td>
                                                        <td className="px-6 py-4 text-center font-bold">{dept.points}</td>
                                                        <td className="px-6 py-4 text-center">
                                                            <span className="font-mono font-medium">{dept.nrr || dept.gf ? `${dept.gf}:${dept.ga}` : '-'}</span>
                                                        </td>
                                                    </>
                                                )}
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Points System Info */}
                            {selectedSport === 'all' && (
                                <div className="bg-gray-50 p-6 border-t">
                                    <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                                            <span>Gold (1st): 50 pts</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
                                            <span>Silver (2nd): 30 pts</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-3 h-3 bg-amber-700 rounded-full"></span>
                                            <span>Bronze (3rd): 10 pts</span>
                                        </div>
                                        <div className="flex items-center gap-2 ml-auto">
                                            <i className='bx bx-info-circle'></i>
                                            <span>Updated after every match</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className='bx bx-data text-4xl text-gray-400'></i>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No standings available</h3>
                            <p className="text-gray-500 mb-6">Standings for this sport/season haven't been published yet.</p>
                            <button 
                                onClick={() => {
                                    setSelectedSeason("2025-26");
                                    setSelectedSport("all");
                                }}
                                className="bg-amber-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-amber-700 transition"
                            >
                                View Overall Standings
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Recent Results */}
            <section className="py-8 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-3 mb-6">
                        <i className='bx bx-line-chart text-2xl text-gray-600'></i>
                        <h2 className="text-2xl font-bold text-gray-800">Recent Results</h2>
                        <div className="h-px flex-1 bg-gray-200"></div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-green-500 hover:shadow-md transition">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-gray-500">Today • 3:00 PM</span>
                                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Cricket Final</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-lg text-blue-600">CE</span>
                                        <span className="text-gray-400">vs</span>
                                        <span className="font-bold text-lg text-amber-600">ME</span>
                                    </div>
                                    <span className="text-sm font-medium bg-white px-3 py-1 rounded-full">
                                        CE won by 45 runs
                                    </span>
                                </div>
                                <span className="text-xs text-gray-500">+50 pts to CE</span>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500 hover:shadow-md transition">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-gray-500">Yesterday • 4:30 PM</span>
                                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">Football Semi</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-lg text-emerald-600">EE</span>
                                        <span className="text-gray-400">vs</span>
                                        <span className="font-bold text-lg text-slate-600">CVE</span>
                                    </div>
                                    <span className="text-sm font-medium bg-white px-3 py-1 rounded-full">
                                        EE won 3-1
                                    </span>
                                </div>
                                <span className="text-xs text-gray-500">+30 pts to EE</span>
                            </div>
                        </div>
                    </div>

                    <Link to="/schedule">
                        <button className="mt-4 text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1 text-sm">
                            VIEW FULL SCHEDULE <i className='bx bx-right-arrow-alt'></i>
                        </button>
                    </Link>
                </div>
            </section>

            {/* Sport-wise Quick Stats */}
            <section className="py-8 bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-3 mb-6">
                        <i className='bx bx-medal text-2xl text-gray-600'></i>
                        <h2 className="text-2xl font-bold text-gray-800">Sport Leaders</h2>
                        <div className="h-px flex-1 bg-gray-200"></div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {sports.slice(0, 4).map(sport => {
                            const leader = standings.find(s => s.position === 1)?.dept || 'CE';
                            return (
                                <div key={sport.id} className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition border border-gray-100">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-3xl">{sport.icon}</span>
                                        <div>
                                            <div className="font-semibold text-gray-800">{sport.name}</div>
                                            <div className="text-xs text-gray-500">{sport.category}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-8 h-8 rounded-lg ${deptColors[leader].bg} flex items-center justify-center font-bold ${deptColors[leader].text}`}>
                                                {leader}
                                            </div>
                                            <span className="text-sm font-medium">Leading</span>
                                        </div>
                                        <button className="text-amber-600 text-sm hover:underline flex items-center gap-1">
                                            Details <i className='bx bx-right-arrow-alt'></i>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Footer Note */}
            <section className="py-4 bg-slate-900 text-white text-center text-sm">
                <div className="container mx-auto px-4">
                    <p>🏆 STANDINGS UPDATED AFTER EVERY MATCH · SEASON {selectedSeason} · 5 DEPARTMENTS · 12+ SPORTS</p>
                </div>
            </section>
        </div>
    );
};

export default Standings;