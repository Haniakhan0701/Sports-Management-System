import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import 'boxicons/css/boxicons.min.css';

const Games = () => {
    // Current year for dynamic display
    const currentYear = 2026;

    // Category definitions with colors (removed Mixed)
    const categories = [
        { name: 'All Games', icon: 'bx-grid-alt', color: 'from-blue-600 to-blue-700' },
        { name: "Women's", icon: 'bx-female', color: 'from-rose-500 to-rose-600' },
        { name: "Men's", icon: 'bx-male', color: 'from-blue-500 to-blue-600' },
    ];

    // Complete list of engineering department games - WOMEN FIRST, then MEN
    const gamesByCategory = [
        // WOMEN'S GAMES FIRST
        {
            category: "Women's",
            color: 'rose',
            bgLight: 'bg-rose-50',
            borderColor: 'border-rose-200',
            textColor: 'text-rose-700',
            games: [
                { id: 'cricket-women', name: 'Cricket', icon: 'bx bx-football', players: '11 vs 11', duration: '15 overs', popularity: 'High' },
                { id: 'football-women', name: 'Football', icon: 'bx bx-football', players: '7 vs 7', duration: '70 min', popularity: 'High' },
                { id: 'tug-of-war-women', name: 'Tug of War', icon: 'bx bx-git-compare', players: '6 vs 6', duration: 'Best of 3', popularity: 'Medium' },
                { id: 'dodge-ball-women', name: 'Dodge Ball', icon: 'bx bx-target-lock', players: '6 vs 6', duration: '12 min', popularity: 'High' },
                { id: '100m-race-women', name: '100m Race', icon: 'bx bx-run', players: 'Individual', duration: 'Sprint', popularity: 'High' },
                { id: 'badminton-women', name: 'Badminton', icon: 'bx bx-tennis-ball', players: 'Singles/Doubles', duration: '21 points', popularity: 'High' },
                { id: 'bottle-spin-chase-women', name: 'Bottle Spin Chase', icon: 'bx bx-rotate-right', players: '8 per team', duration: '12 min', popularity: 'New' },
                { id: 'running-super-ball-women', name: 'Running Super Ball', icon: 'bx bx-cycling', players: '10 per team', duration: '20 min', popularity: 'New' },
                { id: 'relay-4x100m-women', name: '4×100m Relay', icon: 'bx bx-group', players: '4 per team', duration: 'Relay', popularity: 'High' },
            ]
        },
        // MEN'S GAMES SECOND
        {
            category: "Men's",
            color: 'blue',
            bgLight: 'bg-blue-50',
            borderColor: 'border-blue-200',
            textColor: 'text-blue-700',
            games: [
                { id: 'cricket-men', name: 'Cricket', icon: 'bx bx-football', players: '11 vs 11', duration: '20 overs', popularity: 'High' },
                { id: 'football-men', name: 'Football', icon: 'bx bx-football', players: '11 vs 11', duration: '90 min', popularity: 'High' },
                { id: 'tug-of-war-men', name: 'Tug of War', icon: 'bx bx-git-compare', players: '8 vs 8', duration: 'Best of 3', popularity: 'Medium' },
                { id: 'dodge-ball-men', name: 'Dodge Ball', icon: 'bx bx-target-lock', players: '6 vs 6', duration: '15 min', popularity: 'High' },
                { id: '100m-race-men', name: '100m Race', icon: 'bx bx-run', players: 'Individual', duration: 'Sprint', popularity: 'High' },
                { id: 'relay-4x100m-men', name: '4×100m Relay', icon: 'bx bx-group', players: '4 per team', duration: 'Relay', popularity: 'High' },
                { id: 'badminton-men', name: 'Badminton', icon: 'bx bx-tennis-ball', players: 'Singles/Doubles', duration: '21 points', popularity: 'High' },
                { id: 'bottle-spin-chase-men', name: 'Bottle Spin Chase', icon: 'bx bx-rotate-right', players: '10 per team', duration: '15 min', popularity: 'New' },
            ]
        }
    ];

    // Special traditional games that need explanation
    const specialGames = [
        {
            name: 'Running Super Ball',
            description: 'Teams spread out in a designated area. One player holds the ball and tries to reach the destination while others try to tag them. If tagged, the ball passes to the tagger. First team to reach destination wins!',
            rules: [
                '10 players per team (can be adjusted)',
                'Designated start and finish points',
                'No physical contact except gentle tags',
                'Ball must be clearly visible',
                'If ball drops, it must be picked up from that spot'
            ],
            icon: 'bx-cycling',
            color: 'from-emerald-500 to-emerald-600',
            link: '/games/running-super-ball'
        },
        {
            name: 'Bottle Spin Chase',
            description: 'A bottle is spun on the ground. The person it points to must run towards a central ball while others scatter randomly. The runner tries to grab the ball and hit another player below the waist to eliminate them.',
            rules: [
                'Players stand in a circle around the bottle',
                'When bottle points at someone, they must run to center',
                'Others run anywhere within boundary',
                'Ball must be thrown below waist',
                'Hit players are eliminated',
                'Last player standing wins for their team'
            ],
            icon: 'bx-rotate-right',
            color: 'from-orange-500 to-orange-600',
            link: '/games/bottle-spin-chase'
        },
        {
            name: 'Dodge Ball',
            description: 'Classic game where teams try to hit opponents with balls while avoiding being hit themselves. Last team standing wins!',
            rules: [
                '6 players per team on court',
                'Hit below shoulders = elimination',
                'Catching a ball = thrower out + teammate returns',
                'Team with players left wins'
            ],
            icon: 'bx-target-lock',
            color: 'from-red-500 to-red-600',
            link: '/games/dodge-ball'
        },
        {
            name: 'Tug of War',
            description: 'Teams pull against each other until one team pulls the other across the center line. Pure strength and teamwork!',
            rules: [
                '8 players per team',
                'Best of 3 rounds',
                'Team that pulls opponent 2m wins',
                'No wrapping rope around hands'
            ],
            icon: 'bx-git-compare',
            color: 'from-amber-500 to-amber-600',
            link: '/games/tug-of-war'
        }
    ];

    // Popular outdoor games quick view
    const outdoorQuickView = [
        { name: 'Cricket', icon: '🏏', grounds: 'Oval Ground, North Ground', link: '/games/cricket' },
        { name: 'Football', icon: '⚽', grounds: 'Football Field, Practice Ground', link: '/games/football' },
        { name: 'Athletics', icon: '🏃', grounds: 'Main Track, Practice Track', link: '/games/athletics' },
        { name: 'Badminton', icon: '🏸', grounds: 'Indoor Hall, Outdoor Courts', link: '/games/badminton' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-rose-700 via-slate-800 to-blue-700 text-white pt-20 pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Complete Games Guide
                        </h1>
                        <p className="text-lg text-gray-200 max-w-3xl mx-auto">
                            From traditional cricket to exciting new games like Running Super Ball and Bottle Spin Chase. 
                            Everything you need to know about all competitions.
                        </p>
                    </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-rose-400 via-slate-400 to-blue-400"></div>
            </section>

            {/* Quick Categories */}
            <section className="py-8 bg-white border-b border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {categories.map((cat, index) => (
                            <motion.button
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                className={`bg-gradient-to-r ${cat.color} text-white px-6 py-2.5 rounded-full font-medium shadow-md hover:shadow-lg transition flex items-center gap-2`}
                            >
                                <i className={`bx ${cat.icon}`}></i>
                                {cat.name}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Games by Category - WOMEN FIRST */}
            {gamesByCategory.map((category, idx) => (
                <section key={idx} className={`py-12 ${idx === 0 ? 'bg-rose-50/30' : 'bg-blue-50/30'}`}>
                    <div className="container mx-auto px-4">
                        <div className="flex items-center gap-4 mb-8">
                            <div className={`w-2 h-8 rounded-full ${category.color === 'rose' ? 'bg-rose-500' : 'bg-blue-500'}`}></div>
                            <h2 className={`text-2xl md:text-3xl font-bold ${category.textColor}`}>
                                {category.category} Games
                            </h2>
                            <div className={`h-0.5 flex-1 bg-gradient-to-r ${category.color === 'rose' ? 'from-rose-200 to-transparent' : 'from-blue-200 to-transparent'} rounded-full`}></div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                            {category.games.map((game, gameIdx) => (
                                <Link to={`/games/${game.id}`} key={gameIdx}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: gameIdx * 0.05 }}
                                        whileHover={{ y: -5 }}
                                        className={`${category.bgLight} rounded-xl p-5 border ${category.borderColor} hover:shadow-lg transition cursor-pointer`}
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <i className={`${game.icon} text-3xl ${category.textColor}`}></i>
                                            {game.popularity === 'New' && (
                                                <span className="bg-emerald-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                                                    NEW
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{game.name}</h3>
                                        <div className="space-y-1 text-sm">
                                            <p className="text-gray-600"><span className="font-semibold">Players:</span> {game.players}</p>
                                            <p className="text-gray-600"><span className="font-semibold">Duration:</span> {game.duration}</p>
                                        </div>
                                        <div className={`mt-3 text-sm font-medium ${category.textColor} flex items-center gap-1`}>
                                            View Details <i className='bx bx-right-arrow-alt'></i>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                        
                        {/* Count badge */}
                        <div className="mt-4 text-right">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                category.color === 'rose' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                                {category.games.length} Games
                            </span>
                        </div>
                    </div>
                </section>
            ))}

            {/* Special Games Explained Section */}
            <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">🎮 Special Games Explained</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">New to engineering sports? Here's how our most exciting games work!</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6">
                        {specialGames.map((game, index) => (
                            <Link to={game.link} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.02 }}
                                    className={`bg-gradient-to-r ${game.color} rounded-xl p-6 text-white shadow-xl cursor-pointer`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="bg-white/20 p-3 rounded-lg">
                                            <i className={`bx ${game.icon} text-4xl`}></i>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold mb-2">{game.name}</h3>
                                            <p className="text-white/90 mb-4">{game.description}</p>
                                            <div className="bg-white/10 rounded-lg p-4">
                                                <p className="font-semibold mb-2 flex items-center gap-2">
                                                    <i className='bx bx-check-circle'></i>
                                                    Quick Rules:
                                                </p>
                                                <ul className="space-y-1 text-sm">
                                                    {game.rules.map((rule, i) => (
                                                        <li key={i} className="flex items-start gap-2">
                                                            <span className="text-white/60">•</span>
                                                            <span>{rule}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="mt-3 text-sm font-medium flex items-center gap-1 text-white/80 hover:text-white">
                                                Learn More <i className='bx bx-right-arrow-alt'></i>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Outdoor Games Venues */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                        <i className='bx bx-map text-emerald-600'></i>
                        Outdoor Games Venues
                    </h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {outdoorQuickView.map((game, index) => (
                            <Link to={game.link} key={index}>
                                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:shadow-lg transition cursor-pointer">
                                    <div className="text-4xl mb-3">{game.icon}</div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{game.name}</h3>
                                    <p className="text-sm text-gray-600 flex items-start gap-1">
                                        <i className='bx bx-map-pin text-gray-400 mt-1'></i>
                                        <span>{game.grounds}</span>
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Schedule Teaser */}
            <section className="py-12 bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="bg-white rounded-xl p-8 shadow-md text-center max-w-3xl mx-auto">
                        <i className='bx bx-calendar-star text-5xl text-amber-500 mb-4'></i>
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">Ready to Play?</h2>
                        <p className="text-gray-600 mb-6">Check the complete schedule and register your department team now!</p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link to="/schedule">
                                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md flex items-center gap-2">
                                    <i className='bx bx-calendar'></i>
                                    VIEW SCHEDULE
                                </button>
                            </Link>
                            <Link to="/register">
                                <button className="border-2 border-emerald-600 text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition flex items-center gap-2">
                                    <i className='bx bx-user-plus'></i>
                                    REGISTER TEAM
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Note */}
            <section className="py-4 bg-slate-900 text-white text-center text-sm">
                <div className="container mx-auto px-4">
                    <p>🏆 BZU ENGINEERING SPORTS {currentYear} · 5 DEPARTMENTS · {gamesByCategory[0].games.length + gamesByCategory[1].games.length}+ GAMES · WOMEN'S & MEN'S COMPETITIONS</p>
                </div>
            </section>
        </div>
    );
};

export default Games;