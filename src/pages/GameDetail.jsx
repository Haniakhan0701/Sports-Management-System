import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import 'boxicons/css/boxicons.min.css';

// Complete database of all games with detailed information
const gamesDatabase = {
    // WOMEN'S GAMES
    "cricket-women": {
        name: "Cricket (Women's)",
        category: "Women's",
        icon: "bx bx-football",
        color: "rose",
        bgColor: "bg-rose-50",
        textColor: "text-rose-700",
        borderColor: "border-rose-200",
        headerGradient: "from-rose-600 to-rose-700",
        description: "The classic game of bat and ball, adapted for women's competition with modified overs and rules.",
        longDescription: "Women's cricket has gained tremendous popularity in engineering departments. It's a game of strategy, skill, and teamwork. Matches are played with reduced overs to ensure exciting, fast-paced action.",
        players: "11 vs 11",
        duration: "15 overs per side",
        venue: "Oval Ground, North Ground",
        schedule: "Wednesdays & Saturdays, 3:00 PM",
        teamComposition: "11 players per team (with substitutes allowed)",
        rules: [
            "15 overs per innings",
            "Each bowler can bowl maximum 3 overs",
            "Powerplay: First 4 overs (only 2 fielders outside circle)",
            "Standard cricket scoring rules apply",
            "LBW rules apply",
            "No-ball = 2 runs + free hit",
            "Wide = 1 run + extra ball"
        ],
        equipment: [
            "Cricket bat (standard size)",
            "Leather ball (142g)",
            "Pads, gloves, helmet (mandatory for batters)",
            "Protective gear for wicket-keeper",
            "Team jersey (color-coded by department)"
        ],
        skills: ["Batting technique", "Bowling accuracy", "Fielding agility", "Game awareness", "Team coordination"],
        format: "T15 (15 overs match)",
        scoring: "Runs: 1, 2, 4, 6 • Wides: 1 run • No-balls: 2 runs + free hit",
        officials: "2 umpires + 1 scorer",
        history: "Introduced in 2010, women's cricket has become one of the most anticipated events of Engineering Sports Week.",
        facts: [
            "CE department holds the record for most wins (5 championships)",
            "Highest individual score: 78 runs by Sarah Ahmed (CE)",
            "Best bowling figures: 4/12 by Fatima Khan (EE)"
        ]
    },
    "football-women": {
        name: "Football (Women's)",
        category: "Women's",
        icon: "bx bx-football",
        color: "rose",
        bgColor: "bg-rose-50",
        textColor: "text-rose-700",
        borderColor: "border-rose-200",
        headerGradient: "from-rose-600 to-rose-700",
        description: "Fast-paced football action with modified team sizes for women's competition.",
        longDescription: "Women's football showcases incredible skill, speed, and teamwork. With 7-a-side format, the game is faster and more technical, allowing players more touches on the ball.",
        players: "7 vs 7",
        duration: "70 minutes (35 min each half)",
        venue: "Football Field, Practice Ground",
        schedule: "Tuesdays & Thursdays, 4:30 PM",
        teamComposition: "7 players per team (including goalkeeper) + 5 substitutes",
        rules: [
            "7-a-side format (including goalkeeper)",
            "Two halves of 35 minutes each",
            "No offside rule",
            "Rolling substitutions allowed",
            "Goal area: 10 yards radius",
            "Penalty spot: 8 yards from goal",
            "Kick-ins instead of throw-ins"
        ],
        equipment: [
            "Size 5 football",
            "Shin guards (mandatory)",
            "Football boots (studs recommended)",
            "Goalkeeper gloves",
            "Team jersey with numbers"
        ],
        skills: ["Dribbling", "Passing accuracy", "Shooting power", "Tactical positioning", "Goalkeeping"],
        format: "7-a-side league",
        scoring: "Goal = 1 point",
        officials: "1 referee + 2 linesmen",
        history: "Women's football started in 2012 and has seen tremendous growth with 8 teams competing annually.",
        facts: [
            "ME department won the last 2 championships",
            "Most goals in a match: 7-3 (EE vs AR, 2024)",
            "Fastest goal: 23 seconds by Zara Malik (ME)"
        ]
    },
    "tug-of-war-women": {
        name: "Tug of War (Women's)",
        category: "Women's",
        icon: "bx bx-git-compare",
        color: "rose",
        bgColor: "bg-rose-50",
        textColor: "text-rose-700",
        borderColor: "border-rose-200",
        headerGradient: "from-rose-600 to-rose-700",
        description: "Ultimate test of strength and teamwork. Two teams pull against each other until one crosses the line.",
        longDescription: "Tug of War is the purest test of collective strength and coordination. It's not just about power—it's about timing, teamwork, and strategy. The team that pulls together, wins together.",
        players: "6 vs 6",
        duration: "Best of 3 rounds",
        venue: "Main Ground, Practice Field",
        schedule: "Friday mornings, 10:00 AM",
        teamComposition: "6 pullers + 2 reserves",
        rules: [
            "Best of 3 rounds",
            "Team that pulls opponent 2 meters wins the round",
            "No wrapping rope around hands or body",
            "All pullers must remain on their feet",
            "Team with 2 rounds wins the match",
            "2-minute rest between rounds"
        ],
        equipment: [
            "Competition rope (30mm diameter, 30m length)",
            "Center line marker",
            "2m winning distance markers",
            "Protective gloves (optional)",
            "Team uniform"
        ],
        skills: ["Collective strength", "Rhythm coordination", "Foot placement", "Team communication", "Endurance"],
        format: "Knockout tournament",
        scoring: "Win = 3 points • Draw = 1 point each",
        officials: "1 referee + 2 judges",
        history: "A crowd favorite since the first Sports Week in 2008, Tug of War draws the biggest crowds.",
        facts: [
            "CE vs ME finals have become a classic rivalry",
            "Longest match: 4 minutes 30 seconds (CE vs CVE, 2023)",
            "ME holds the record for most consecutive wins (4)"
        ]
    },
    "dodge-ball-women": {
        name: "Dodge Ball (Women's)",
        category: "Women's",
        icon: "bx bx-target-lock",
        color: "rose",
        bgColor: "bg-rose-50",
        textColor: "text-rose-700",
        borderColor: "border-rose-200",
        headerGradient: "from-rose-600 to-rose-700",
        description: "Fast-paced elimination game where teams throw balls at opponents while avoiding being hit.",
        longDescription: "Dodge Ball combines agility, reflexes, and throwing accuracy. Players must dodge, duck, dip, dive, and dodge! It's an adrenaline-pumping game that spectators love.",
        players: "6 vs 6",
        duration: "12 minutes per match",
        venue: "Indoor Court, Outdoor Courts",
        schedule: "Mondays & Wednesdays, 2:00 PM",
        teamComposition: "6 players on court + 2 substitutes",
        rules: [
            "Hit below shoulders = elimination",
            "Catching a ball = thrower out + teammate returns",
            "Ball must be thrown, not kicked",
            "Players can use ball to block incoming throws",
            "Team with players left at end wins",
            "If time runs out, team with more players wins"
        ],
        equipment: [
            "6 foam balls per match",
            "Court boundary markers",
            "Elimination line",
            "Comfortable sportswear",
            "Protective eyewear (optional)"
        ],
        skills: ["Throwing accuracy", "Quick reflexes", "Agility", "Catching ability", "Spatial awareness"],
        format: "Round robin + knockout",
        scoring: "Win = 2 points • Draw = 1 point",
        officials: "2 referees",
        history: "Introduced in 2015, Dodge Ball quickly became one of the most popular indoor games.",
        facts: [
            "EE department invented the 'lightning throw' technique",
            "Fastest match: 3 minutes (CE vs AR, 2024)",
            "Most catches in a match: 7 by Ayesha Khan (EE)"
        ]
    },
    "100m-race-women": {
        name: "100m Race (Women's)",
        category: "Women's",
        icon: "bx bx-run",
        color: "rose",
        bgColor: "bg-rose-50",
        textColor: "text-rose-700",
        borderColor: "border-rose-200",
        headerGradient: "from-rose-600 to-rose-700",
        description: "The ultimate test of pure speed. Sprint to the finish line in this classic athletics event.",
        longDescription: "The 100m sprint is athletics' blue-riband event. It's all about explosive power, perfect technique, and mental focus. The fastest woman in engineering departments earns the title of Sprint Queen.",
        players: "Individual",
        duration: "10-15 seconds",
        venue: "Main Track",
        schedule: "Day 1 of Sports Week, 9:00 AM",
        teamComposition: "Individual event (3 participants per department)",
        rules: [
            "One false start allowed per athlete",
            "Second false start = disqualification",
            "Lanes assigned by random draw",
            "Must stay in assigned lane",
            "Timing stops when torso crosses finish line",
            "Wind assistance must be below 2 m/s for records"
        ],
        equipment: [
            "Running spikes (optional)",
            "Timing system (electronic)",
            "Lane markers",
            "Starting blocks",
            "Race number bib"
        ],
        skills: ["Explosive start", "Acceleration", "Top speed maintenance", "Finishing technique", "Mental focus"],
        format: "Heats → Semifinals → Final",
        scoring: "Gold = 5 points • Silver = 3 points • Bronze = 1 point",
        officials: "1 starter + 3 timers + 2 judges",
        history: "The 100m has been part of Sports Week since inception in 2008.",
        facts: [
            "Record: 12.3 seconds by Fatima Zafar (CE, 2024)",
            "Most gold medals: 3 by ME department",
            "2025 champion: Sara Ahmed (EE) with 12.5 seconds"
        ]
    },
    "badminton-women": {
        name: "Badminton (Women's)",
        category: "Women's",
        icon: "bx bx-tennis-ball",
        color: "rose",
        bgColor: "bg-rose-50",
        textColor: "text-rose-700",
        borderColor: "border-rose-200",
        headerGradient: "from-rose-600 to-rose-700",
        description: "Fast-paced racquet sport requiring agility, precision, and lightning reflexes.",
        longDescription: "Badminton is one of the fastest racquet sports in the world. Players need incredible reflexes, stamina, and shot precision. Both singles and doubles competitions are held.",
        players: "Singles (1v1) / Doubles (2v2)",
        duration: "Best of 3 games to 21 points",
        venue: "Indoor Hall",
        schedule: "Daily matches, 10:00 AM - 5:00 PM",
        teamComposition: "3 singles + 2 doubles pairs per department",
        rules: [
            "Best of 3 games to 21 points",
            "Must win by 2 points (30 point cap)",
            "Rally scoring (point on every serve)",
            "Service rules: must be below waist",
            "Lets: replay if shuttle hits net on serve and goes over"
        ],
        equipment: [
            "Badminton racquet",
            "Nylon shuttlecocks (for matches)",
            "Court shoes (non-marking)",
            "Net (5ft 1in height at center)",
            "Comfortable sportswear"
        ],
        skills: ["Footwork", "Shot precision", "Smash power", "Drop shot finesse", "Net play"],
        format: "Group stage + knockout",
        scoring: "Singles win = 2 points • Doubles win = 2 points",
        officials: "1 umpire per court + line judges for finals",
        history: "Badminton has the highest participation among all indoor games.",
        facts: [
            "CE won both singles and doubles in 2024",
            "Longest rally record: 78 shots (ME vs CE, 2023)",
            "Most titles: EE with 5 championships"
        ]
    },
    "bottle-spin-chase-women": {
        name: "Bottle Spin Chase (Women's)",
        category: "Women's",
        icon: "bx bx-rotate-right",
        color: "rose",
        bgColor: "bg-rose-50",
        textColor: "text-rose-700",
        borderColor: "border-rose-200",
        headerGradient: "from-rose-600 to-rose-700",
        description: "A thrilling elimination game where luck and speed combine. Spin the bottle, chase, and eliminate!",
        longDescription: "Bottle Spin Chase is a unique engineering sports tradition. Players stand in a circle around a bottle. When spun, the person it points to must run to the center, grab the ball, and try to hit others who scatter randomly. Hit players are eliminated. Last player standing wins!",
        players: "8 per team",
        duration: "12 minutes per round",
        venue: "Court 1, Court 2",
        schedule: "Afternoon sessions, 2:00 PM - 4:00 PM",
        teamComposition: "8 players + 2 substitutes",
        rules: [
            "Players stand in a circle (5m radius)",
            "Bottle is spun in the center",
            "Pointed player runs to grab center ball",
            "Others run anywhere within boundary",
            "Ball must be thrown below waist",
            "Hit players are eliminated",
            "Last player standing wins for their team",
            "If ball misses, thrower is eliminated"
        ],
        equipment: [
            "1 plastic bottle (500ml, partially filled with sand)",
            "1 soft foam ball (for safety)",
            "Boundary markers",
            "Circle marker",
            "Team armbands"
        ],
        skills: ["Reaction speed", "Throwing accuracy", "Evasion", "Decision making", "Spatial awareness"],
        format: "Team vs team elimination",
        scoring: "Winning team = 3 points • Losing team = 1 point",
        officials: "2 referees per match",
        history: "Invented by engineering students in 2018, this game has become a fan favorite.",
        facts: [
            "ME team holds record for most consecutive wins (7)",
            "Fastest elimination: 3 seconds by Zara (CE)",
            "Most players left in winning team: 5 (EE, 2024)"
        ]
    },
    "running-super-ball-women": {
        name: "Running Super Ball (Women's)",
        category: "Women's",
        icon: "bx bx-cycling",
        color: "rose",
        bgColor: "bg-rose-50",
        textColor: "text-rose-700",
        borderColor: "border-rose-200",
        headerGradient: "from-rose-600 to-rose-700",
        description: "An exciting chase game where teams try to reach the destination while passing the ball under pressure.",
        longDescription: "Running Super Ball combines elements of tag, relay, and ball control. Teams spread out across the playing area. One player starts with the ball and tries to reach the destination while opponents try to tag them. If tagged, the ball passes to the tagger. First team to have a player reach the destination wins!",
        players: "10 per team",
        duration: "20 minutes",
        venue: "Large Field, Practice Ground",
        schedule: "Weekend mornings, 9:00 AM",
        teamComposition: "10 players + 3 substitutes",
        rules: [
            "Designated start and finish points (50m apart)",
            "10 players per team on field",
            "One player starts with the ball at start point",
            "Must reach finish point with ball",
            "Opponents can tag ball carrier (gentle tags only)",
            "If tagged, ball passes to tagger",
            "Tagged player must leave field",
            "First team to reach finish with ball wins",
            "If ball drops, must pick up from that spot"
        ],
        equipment: [
            "1 soft rubber ball (size 4)",
            "Start and finish markers",
            "Team colored vests",
            "Boundary flags",
            "Water stations (very important!)"
        ],
        skills: ["Running endurance", "Ball protection", "Strategic positioning", "Team coordination", "Quick decision making"],
        format: "Round robin league",
        scoring: "Win = 3 points • Draw = 1 point • Loss = 0 points",
        officials: "3 referees (to track tagging)",
        history: "Introduced in 2022, Running Super Ball quickly became one of the most anticipated new games.",
        facts: [
            "CE and ME rivalry is intense in this game",
            "Longest match: 35 minutes (EE vs CVE, 2024)",
            "Most ball carries: 7 by Ayesha (CE) in a single match"
        ]
    },
    "relay-4x100m-women": {
        name: "4×100m Relay (Women's)",
        category: "Women's",
        icon: "bx bx-group",
        color: "rose",
        bgColor: "bg-rose-50",
        textColor: "text-rose-700",
        borderColor: "border-rose-200",
        headerGradient: "from-rose-600 to-rose-700",
        description: "Team sprinting event where four runners combine speed and perfect baton exchanges.",
        longDescription: "The 4×100m relay is athletics at its most exciting. Four runners must work together, combining individual speed with flawless baton exchanges. One dropped baton can cost the team victory, while perfect teamwork can beat faster individual runners.",
        players: "4 per team",
        duration: "50-60 seconds",
        venue: "Main Track",
        schedule: "Day 2 of Sports Week, 11:00 AM",
        teamComposition: "4 runners + 1 reserve",
        rules: [
            "Each team has 4 runners",
            "Each runs 100m in assigned lane",
            "Baton must be exchanged within 20m zone",
            "If baton drops, original runner must pick up",
            "Can't interfere with other teams",
            "Team with fastest time wins"
        ],
        equipment: [
            "Baton (aluminum or plastic)",
            "Exchange zone markers",
            "Lane markers",
            "Running spikes",
            "Timing system"
        ],
        skills: ["Sprinting speed", "Baton exchange technique", "Timing", "Team synchronization", "Pressure handling"],
        format: "Heats + Final",
        scoring: "Gold = 8 points • Silver = 5 points • Bronze = 3 points",
        officials: "4 exchange judges + 3 timers",
        history: "The relay has been part of Sports Week since 2010 and always draws huge crowds.",
        facts: [
            "Record: 52.3 seconds by CE (2024)",
            "ME won 3 consecutive golds (2021-2023)",
            "Most dramatic finish: CE beat EE by 0.03 seconds in 2024"
        ]
    },

    // MEN'S GAMES (similar detailed structure)
    "cricket-men": {
        name: "Cricket (Men's)",
        category: "Men's",
        icon: "bx bx-football",
        color: "blue",
        bgColor: "bg-blue-50",
        textColor: "text-blue-700",
        borderColor: "border-blue-200",
        headerGradient: "from-blue-600 to-blue-700",
        description: "The gentleman's game, played with passion and skill in engineering departments.",
        longDescription: "Men's cricket is the flagship sport of Engineering Sports Week. Full 20-over matches showcase batting power, bowling variety, and fielding athleticism. The CE vs ME cricket final is the most-watched event of the entire week.",
        players: "11 vs 11",
        duration: "20 overs per side",
        venue: "Oval Ground, North Ground",
        schedule: "Weekend matches, 2:00 PM start",
        teamComposition: "11 players + 4 substitutes",
        rules: [
            "20 overs per innings",
            "Each bowler can bowl maximum 4 overs",
            "Powerplay: First 6 overs (only 2 fielders outside 30-yard circle)",
            "Standard cricket scoring rules",
            "LBW applies",
            "No-ball = 2 runs + free hit",
            "Wide = 1 run + extra ball"
        ],
        equipment: [
            "Cricket bat (standard)",
            "Leather ball (156g)",
            "Full protective gear (pads, gloves, helmet, box)",
            "Wicket-keeping gloves",
            "Team jersey (department colors)"
        ],
        skills: ["Batting technique", "Bowling variations", "Fielding agility", "Captaincy", "Game awareness"],
        format: "T20 format",
        scoring: "Win = 4 points • Tie = 2 points • Bonus point for run rate >1.25",
        officials: "2 umpires + 1 scorer + 3rd umpire for finals",
        history: "Cricket has been played since the first Sports Week in 2008. The CE-ME rivalry is legendary.",
        facts: [
            "Highest team total: 245/4 by CE (2024)",
            "Best bowling: 5/15 by Ahmed (ME, 2023)",
            "Most sixes in tournament: 28 by CE (2024)"
        ]
    },
    "football-men": {
        name: "Football (Men's)",
        category: "Men's",
        icon: "bx bx-football",
        color: "blue",
        bgColor: "bg-blue-50",
        textColor: "text-blue-700",
        borderColor: "border-blue-200",
        headerGradient: "from-blue-600 to-blue-700",
        description: "Full 11-a-side football with all the passion and skill of the beautiful game.",
        longDescription: "Men's football is played with full FIFA rules, 11-a-side on a full-sized pitch. It's a test of stamina, skill, and tactical awareness. The engineering departments take their football very seriously!",
        players: "11 vs 11",
        duration: "90 minutes (45 min each half)",
        venue: "Football Field, Main Ground",
        schedule: "Evening matches, 4:30 PM & 6:30 PM",
        teamComposition: "11 players + 7 substitutes",
        rules: [
            "Standard FIFA rules apply",
            "Offside rule enforced",
            "3 substitutions allowed per match",
            "Yellow card = caution, Red card = ejection",
            "Extra time and penalties for knockout matches"
        ],
        equipment: [
            "Size 5 football",
            "Shin guards (mandatory)",
            "Football boots",
            "Goalkeeper gloves",
            "Team jersey with numbers"
        ],
        skills: ["Dribbling", "Passing", "Shooting", "Tactical positioning", "Goalkeeping"],
        format: "League + Knockout",
        scoring: "Win = 3 points • Draw = 1 point • Loss = 0",
        officials: "1 referee + 2 assistants",
        history: "Football has grown enormously, with all 5 departments fielding competitive teams.",
        facts: [
            "ME won the treble in 2024 (League, Cup, Championship)",
            "Most goals in a match: 7-2 (EE vs AR, 2023)",
            "CE holds record for most clean sheets (8 in 2024)"
        ]
    },
    // Continue for all men's games...
};

const GameDetail = () => {
    const { gameName } = useParams();
    const navigate = useNavigate();
    
    // Get game details from database
    const game = gamesDatabase[gameName];
    
    // If game not found, show 404-like message
    if (!game) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Game Not Found</h1>
                    <p className="text-gray-600 mb-6">The game you're looking for doesn't exist.</p>
                    <Link to="/games">
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                            Back to Games
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    // Determine if it's women's or men's for styling
    const isWomen = game.category === "Women's";
    const primaryColor = isWomen ? 'rose' : 'blue';
    const secondaryColor = isWomen ? 'pink' : 'indigo';

    return (
        <div className="min-h-screen bg-gray-50">
            
            {/* Hero Section with Game Name */}
            <section className={`relative bg-gradient-to-r ${game.headerGradient} text-white pt-16 pb-20 overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <Link to="/games" className="inline-block mb-6">
                            <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm transition flex items-center gap-2">
                                <i className='bx bx-arrow-back'></i>
                                Back to Games
                            </button>
                        </Link>
                        
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <i className={`${game.icon} text-6xl`}></i>
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold mb-2">{game.name}</h1>
                                <span className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${
                                    isWomen ? 'bg-rose-200 text-rose-900' : 'bg-blue-200 text-blue-900'
                                }`}>
                                    {game.category}
                                </span>
                            </div>
                        </div>
                        
                        <p className="text-xl text-white/90 max-w-3xl mx-auto mt-4">
                            {game.description}
                        </p>
                    </motion.div>
                </div>
                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-${primaryColor}-300 via-white to-${primaryColor}-300`}></div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                
                {/* Quick Info Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    <div className={`${game.bgColor} rounded-xl p-4 text-center border ${game.borderColor}`}>
                        <i className='bx bx-group text-2xl mb-1'></i>
                        <p className="text-sm text-gray-500">Players</p>
                        <p className={`font-bold ${game.textColor}`}>{game.players}</p>
                    </div>
                    <div className={`${game.bgColor} rounded-xl p-4 text-center border ${game.borderColor}`}>
                        <i className='bx bx-time text-2xl mb-1'></i>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className={`font-bold ${game.textColor}`}>{game.duration}</p>
                    </div>
                    <div className={`${game.bgColor} rounded-xl p-4 text-center border ${game.borderColor}`}>
                        <i className='bx bx-map text-2xl mb-1'></i>
                        <p className="text-sm text-gray-500">Venue</p>
                        <p className={`font-bold ${game.textColor} text-sm`}>{game.venue}</p>
                    </div>
                    <div className={`${game.bgColor} rounded-xl p-4 text-center border ${game.borderColor}`}>
                        <i className='bx bx-calendar text-2xl mb-1'></i>
                        <p className="text-sm text-gray-500">Schedule</p>
                        <p className={`font-bold ${game.textColor} text-sm`}>{game.schedule}</p>
                    </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid lg:grid-cols-3 gap-8">
                    
                    {/* Main Content - 2 columns */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Long Description */}
                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">About the Game</h2>
                            <p className="text-gray-600 leading-relaxed">{game.longDescription}</p>
                        </div>

                        {/* Rules */}
                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <i className='bx bx-list-ul'></i>
                                Rules & Regulations
                            </h2>
                            <ul className="space-y-2">
                                {game.rules.map((rule, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className={`text-${primaryColor}-600 font-bold mt-1`}>•</span>
                                        <span className="text-gray-600">{rule}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Equipment Needed */}
                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <i className='bx bx-backpack'></i>
                                Equipment Required
                            </h2>
                            <ul className="grid sm:grid-cols-2 gap-2">
                                {game.equipment.map((item, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <span className={`text-${primaryColor}-600`}>✓</span>
                                        <span className="text-gray-600">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Sidebar - 1 column */}
                    <div className="space-y-6">
                        
                        {/* Team Composition */}
                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <h2 className="text-xl font-bold text-gray-800 mb-3">Team Composition</h2>
                            <p className="text-gray-600 mb-2">{game.teamComposition}</p>
                            <div className={`mt-4 p-3 ${game.bgColor} rounded-lg border ${game.borderColor}`}>
                                <p className="text-sm font-medium">Format: {game.format}</p>
                            </div>
                        </div>

                        {/* Skills Required */}
                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <h2 className="text-xl font-bold text-gray-800 mb-3">Key Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {game.skills.map((skill, index) => (
                                    <span key={index} className={`px-3 py-1 ${game.bgColor} ${game.textColor} rounded-full text-xs font-medium border ${game.borderColor}`}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Scoring System */}
                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <h2 className="text-xl font-bold text-gray-800 mb-3">Scoring System</h2>
                            <p className="text-gray-600 text-sm">{game.scoring}</p>
                        </div>

                        {/* Officials */}
                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <h2 className="text-xl font-bold text-gray-800 mb-3">Match Officials</h2>
                            <p className="text-gray-600">{game.officials}</p>
                        </div>

                        {/* History & Records */}
                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <h2 className="text-xl font-bold text-gray-800 mb-3">History & Records</h2>
                            <p className="text-gray-600 text-sm mb-3">{game.history}</p>
                            <div className={`p-3 ${game.bgColor} rounded-lg border ${game.borderColor}`}>
                                <p className="font-semibold mb-2">Did You Know?</p>
                                <ul className="space-y-1 text-sm">
                                    {game.facts.map((fact, index) => (
                                        <li key={index} className="flex items-start gap-1">
                                            <span className={`text-${primaryColor}-600`}>⭐</span>
                                            <span>{fact}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Register CTA */}
                <div className="mt-12 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 text-white text-center">
                    <h2 className="text-2xl font-bold mb-3">Ready to Play {game.name}?</h2>
                    <p className="text-gray-300 mb-6">Register your department team now and showcase your skills!</p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link to="/register">
                            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold transition shadow-lg flex items-center gap-2">
                                <i className='bx bx-user-plus'></i>
                                REGISTER TEAM
                            </button>
                        </Link>
                        <Link to="/schedule">
                            <button className="border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-3 rounded-lg font-semibold transition flex items-center gap-2">
                                <i className='bx bx-calendar'></i>
                                VIEW SCHEDULE
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameDetail;