import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import 'boxicons/css/boxicons.min.css';

// ─── YouTube short URL → embed URL ───────────────────────────────────────────
function toEmbedUrl(watchUrl) {
    if (!watchUrl) return null;
    let id = null;
    try {
        const url = new URL(watchUrl);
        if (url.hostname === 'youtu.be') {
            id = url.pathname.slice(1).split('?')[0];
        } else if (url.pathname.includes('/shorts/')) {
            id = url.pathname.split('/shorts/')[1].split('?')[0];
        } else {
            id = url.searchParams.get('v');
        }
    } catch (_) { return null; }
    if (!id) return null;
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&showinfo=0&rel=0&modestbranding=1&start=5`;
}

const OPENING_VIDEO_URL  = toEmbedUrl("https://youtu.be/onP5-DKSbI4?si=F48la5_n03AlRVHC");
const OPENING_VIDEO_FULL = "https://youtu.be/onP5-DKSbI4?si=F48la5_n03AlRVHC";
const WHATSAPP_NUMBER    = "923098543276";


const WhatsAppSuggestForm = ({ whatsappNumber }) => {
  const [copied, setCopied] = React.useState(false);

  const exampleMsg = `Hi! I'm [Your Name], Roll No. [e.g. CPE-2023-29], from [Department], [X]th Semester. I watched the game ideas on the Sports Week site and I'd love to suggest a game! The idea I liked most is: [describe the game or paste reel link here]. I think it would be amazing for Engineering Sports Week 2026!`;

  const handleCopy = () => {
    navigator.clipboard.writeText(exampleMsg).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const waLink = `https://wa.me/${whatsappNumber}`;

  return (
    <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 18, padding: '28px 24px' }} className="relative z-10">
      <h4 style={{ color: '#fff', fontSize: 18, fontWeight: 700, margin: '0 0 4px' }}>Suggest your pick on WhatsApp</h4>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, margin: '0 0 20px' }}>
        Copy the message below, open WhatsApp, paste it — then fill in your name & roll number!
      </p>

      {/* Step indicators */}
      <div className="flex gap-4 mb-5 flex-wrap">
        {['Copy the message', 'Open WhatsApp', 'Paste & fill your details', 'Send!'].map((step, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg,#f97316,#ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{i+1}</div>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>{step}</span>
          </div>
        ))}
      </div>

      {/* Example message box */}
      <div style={{ background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.25)', borderRadius: 12, padding: '16px 18px', marginBottom: 20, position: 'relative' }}>
        <div style={{ fontSize: 11, color: 'rgba(37,211,102,0.7)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
          📋 Example Message — Copy this!
        </div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
          {exampleMsg}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleCopy}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: copied ? 'rgba(37,211,102,0.2)' : 'rgba(255,255,255,0.1)', color: '#fff', fontSize: 14, fontWeight: 600, padding: '12px 22px', borderRadius: 100, border: `1px solid ${copied ? 'rgba(37,211,102,0.5)' : 'rgba(255,255,255,0.2)'}`, cursor: 'pointer', transition: 'all 0.2s' }}
        >
          {copied ? '✅ Copied!' : '📋 Copy Message'}
        </motion.button>

        <a href={waLink} target="_blank" rel="noopener noreferrer">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#25D366', color: '#fff', fontSize: 15, fontWeight: 700, padding: '12px 28px', borderRadius: 100, border: 'none', cursor: 'pointer' }}
          >
            <svg width="20" height="20" viewBox="0 0 32 32" fill="white">
              <path d="M16 0C7.163 0 0 7.163 0 16c0 2.825.737 5.476 2.027 7.782L0 32l8.418-2.007A15.934 15.934 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.258 22.548c-.344.969-1.701 1.773-2.787 2.007-.744.158-1.714.285-4.979-1.07-4.182-1.712-6.876-5.949-7.084-6.227-.198-.278-1.671-2.224-1.671-4.244s1.043-2.994 1.458-3.416c.344-.351.912-.512 1.458-.512.177 0 .335.009.478.016.422.018.633.043.911.707.344.822 1.177 2.842 1.281 3.048.104.206.208.479.063.757-.136.286-.208.463-.414.713-.206.25-.432.559-.617.751-.206.21-.42.436-.181.854.24.41 1.067 1.759 2.29 2.851 1.574 1.4 2.87 1.836 3.315 2.032.344.149.751.111 1-.156.315-.333.705-.886 1.103-1.432.285-.391.647-.438 1.027-.298.385.136 2.424 1.143 2.84 1.352.416.208.693.308.796.479.104.172.104 1.003-.24 1.972z"/>
            </svg>
            Open WhatsApp
          </motion.button>
        </a>
      </div>
    </div>
  );
};


const Games = () => {
    const currentYear = 2026;
    const [activeFilter, setActiveFilter] = useState('All Games');

    const womenRef   = useRef(null);
    const menRef     = useRef(null);
    const specialRef = useRef(null);

    const scrollTo = (ref) => {
        if (ref?.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleFilter = (name) => {
        setActiveFilter(name);
        if (name === "Women's")   setTimeout(() => scrollTo(womenRef),   100);
        if (name === "Men's")     setTimeout(() => scrollTo(menRef),     100);
        if (name === 'All Games') setTimeout(() => scrollTo(specialRef), 100);
    };

    // ── Category tab definitions ──────────────────────────────────────────────
    const categories = [
        { name: 'All Games', icon: 'bx-grid-alt', color: 'from-blue-600 to-blue-700' },
        { name: "Women's",   icon: 'bx-female',   color: 'from-rose-500 to-rose-600' },
        { name: "Men's",     icon: 'bx-male',     color: 'from-blue-500 to-blue-600' },
    ];

    // ── Game lists ────────────────────────────────────────────────────────────
    const gamesByCategory = [
        {
            category: "Women's",
            color: 'rose',
            bgLight: 'bg-rose-50',
            borderColor: 'border-rose-200',
            textColor: 'text-rose-700',
            games: [
                { id: 'cricket-women',           name: 'Cricket',          icon: 'bx bx-football',    players: '11 vs 11',        duration: '15 overs',  popularity: 'High'   },
                { id: 'football-women',          name: 'Football',         icon: 'bx bx-football',    players: '7 vs 7',          duration: '70 min',    popularity: 'High'   },
                { id: 'tug-of-war-women',        name: 'Tug of War',       icon: 'bx bx-git-compare', players: '6 vs 6',          duration: 'Best of 3', popularity: 'Medium' },
                { id: 'dodge-ball-women',        name: 'Dodge Ball',       icon: 'bx bx-target-lock', players: '6 vs 6',          duration: '12 min',    popularity: 'High'   },
                { id: '100m-race-women',         name: '100m Race',        icon: 'bx bx-run',         players: 'Individual',      duration: 'Sprint',    popularity: 'High'   },
                { id: 'badminton-women',         name: 'Badminton',        icon: 'bx bx-tennis-ball', players: 'Singles/Doubles', duration: '21 points', popularity: 'High'   },
                { id: 'bottle-spin-chase-women', name: 'Bottle Spin Chase',icon: 'bx bx-rotate-right',players: '8 per team',      duration: '12 min',    popularity: 'New'    },
                { id: 'relay-4x100m-women',      name: '4×100m Relay',     icon: 'bx bx-group',       players: '4 per team',      duration: 'Relay',     popularity: 'High'   },
            ]
        },
        {
            category: "Men's",
            color: 'blue',
            bgLight: 'bg-blue-50',
            borderColor: 'border-blue-200',
            textColor: 'text-blue-700',
            games: [
                { id: 'cricket-men',      name: 'Cricket',      icon: 'bx bx-football',    players: '11 vs 11',        duration: '20 overs',  popularity: 'High'   },
                { id: 'football-men',     name: 'Football',     icon: 'bx bx-football',    players: '11 vs 11',        duration: '90 min',    popularity: 'High'   },
                { id: 'tug-of-war-men',   name: 'Tug of War',   icon: 'bx bx-git-compare', players: '8 vs 8',          duration: 'Best of 3', popularity: 'Medium' },
                { id: 'dodge-ball-men',   name: 'Dodge Ball',   icon: 'bx bx-target-lock', players: '6 vs 6',          duration: '15 min',    popularity: 'High'   },
                { id: '100m-race-men',    name: '100m Race',    icon: 'bx bx-run',         players: 'Individual',      duration: 'Sprint',    popularity: 'High'   },
                { id: 'relay-4x100m-men', name: '4×100m Relay', icon: 'bx bx-group',       players: '4 per team',      duration: 'Relay',     popularity: 'High'   },
                { id: 'badminton-men',    name: 'Badminton',    icon: 'bx bx-tennis-ball', players: 'Singles/Doubles', duration: '21 points', popularity: 'High'   },
            ]
        }
    ];

    // ── All Games overview mini-cards ─────────────────────────────────────────
    const specialGames = [
        {
            id: 'bottle-spin-chase-women',
            name: 'Bottle Spin Chase',
            icon: 'bx bx-rotate-right',
            players: '8 per team',
            duration: '12 min',
            color: 'from-orange-500 to-orange-600',
            tagline: 'Spin the bottle, grab the ball, eliminate opponents!'
        },
        {
            id: 'dodge-ball-women',
            name: 'Dodge Ball',
            icon: 'bx bx-target-lock',
            players: '6 vs 6',
            duration: '12 min',
            color: 'from-red-500 to-red-600',
            tagline: 'Dodge, duck, dip, dive — last team standing wins!'
        },
        {
            id: 'tug-of-war-women',
            name: 'Tug of War',
            icon: 'bx bx-git-compare',
            players: '6–8 vs 6–8',
            duration: 'Best of 3',
            color: 'from-amber-500 to-amber-600',
            tagline: 'Pure strength and teamwork on the rope!'
        },
        {
            id: 'relay-4x100m-women',
            name: '4×100m Relay',
            icon: 'bx bx-group',
            players: '4 per team',
            duration: 'Relay',
            color: 'from-violet-500 to-violet-600',
            tagline: 'Speed, timing, and perfect baton exchanges!'
        },
        {
            id: 'cricket-women',
            name: 'Cricket',
            icon: 'bx bx-football',
            players: '11 vs 11',
            duration: '15–20 overs',
            color: 'from-green-600 to-green-700',
            tagline: 'Strategy, skill, and bat-and-ball action!'
        },
        {
            id: 'football-women',
            name: 'Football',
            icon: 'bx bx-football',
            players: '7–11 vs 7–11',
            duration: '70–90 min',
            color: 'from-blue-600 to-blue-700',
            tagline: 'The beautiful game — fast, tactical, thrilling!'
        },
        {
            id: 'badminton-women',
            name: 'Badminton',
            icon: 'bx bx-tennis-ball',
            players: 'Singles / Doubles',
            duration: '21 points',
            color: 'from-cyan-500 to-cyan-600',
            tagline: 'Lightning-fast rallies and precision smashes!'
        },
        {
            id: '100m-race-women',
            name: '100m Race',
            icon: 'bx bx-run',
            players: 'Individual',
            duration: 'Sprint',
            color: 'from-pink-500 to-pink-600',
            tagline: 'Pure speed — who is the fastest in engineering?'
        },
    ];

    // ── Venue data — NOT clickable, pure info display ─────────────────────────
    const venueDetails = [
        {
            icon: '🏏',
            sport: 'Cricket',
            accent: 'emerald',
            venues: [
                { label: "Men's",   ground: 'Main Ground & Ali Hall Hostel Ground', icon: 'bx bx-male'   },
                { label: "Women's", ground: 'Maryam Hostel Main Ground',            icon: 'bx bx-female' },
            ]
        },
        {
            icon: '⚽',
            sport: 'Football',
            accent: 'blue',
            venues: [
                { label: "Men's",   ground: 'Main Ground & Ali Hall Hostel Ground', icon: 'bx bx-male'   },
                { label: "Women's", ground: 'Maryam Hostel Main Ground',            icon: 'bx bx-female' },
            ]
        },
        {
            icon: '🏃',
            sport: 'Athletics (100m Race & 4×100m Relay)',
            accent: 'amber',
            venues: [
                { label: 'Race Track', ground: 'Staff Colony No. 2',              icon: 'bx bx-run'         },
                { label: 'Note',       ground: 'Detailed route & timings coming soon', icon: 'bx bx-info-circle' },
            ]
        },
        {
            icon: '🏸',
            sport: 'Badminton',
            accent: 'cyan',
            venues: [
                { label: "Men's & Women's", ground: 'Sports Complex — Indoor Courts', icon: 'bx bx-building' },
            ]
        },
    ];

    // Tailwind accent colour maps
    const accentMap = {
        emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', label: 'text-emerald-700', pin: 'text-emerald-500' },
        blue:    { bg: 'bg-blue-50',    border: 'border-blue-200',    label: 'text-blue-700',    pin: 'text-blue-500'    },
        amber:   { bg: 'bg-amber-50',   border: 'border-amber-200',   label: 'text-amber-700',   pin: 'text-amber-500'   },
        cyan:    { bg: 'bg-cyan-50',    border: 'border-cyan-200',    label: 'text-cyan-700',    pin: 'text-cyan-500'    },
    };

    const totalGames = gamesByCategory[0].games.length + gamesByCategory[1].games.length;

    return (
        <div className="min-h-screen bg-gray-50">

            {/* ═══════════════════════════════════════════════════════════
                HERO — Opening Ceremony Video Background
            ═══════════════════════════════════════════════════════════ */}
            <section
                className="relative bg-gradient-to-r from-rose-700 via-slate-800 to-blue-700 text-white pt-20 pb-24 overflow-hidden"
                style={{ minHeight: '380px' }}
            >
                <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                    <iframe
                        src={OPENING_VIDEO_URL}
                        title="Opening Ceremony"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        className="absolute top-1/2 left-1/2 pointer-events-none"
                        style={{
                            border: 'none',
                            width: '177.78vh',
                            height: '56.25vw',
                            minWidth: '100%',
                            minHeight: '100%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                    <div className="absolute inset-0 bg-black/60" />

                    <a
                        href={OPENING_VIDEO_FULL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 flex items-end justify-end p-5 group"
                        style={{ zIndex: 5 }}
                        title="Watch Opening Ceremony on YouTube"
                    >
                        <span className="flex items-center gap-2 bg-black/50 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 group-hover:scale-105 shadow-lg">
                            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                                <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
                            </svg>
                            🎬 Watch Opening Ceremony
                        </span>
                    </a>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                            Complete Games Guide
                        </h1>
                        <p className="text-lg text-gray-200 max-w-3xl mx-auto drop-shadow">
                            From traditional cricket to exciting new games like Bottle Spin Chase.
                            Everything you need to know about all competitions.
                        </p>
                    </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-rose-400 via-slate-400 to-blue-400"></div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                FILTER TABS — sticky
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-6 bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {categories.map((cat, index) => (
                            <motion.button
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => handleFilter(cat.name)}
                                className={`bg-gradient-to-r ${cat.color} text-white px-6 py-2.5 rounded-full font-medium shadow-md hover:shadow-lg transition flex items-center gap-2 ${
                                    activeFilter === cat.name ? 'ring-4 ring-offset-2 ring-gray-300 scale-105' : ''
                                }`}
                            >
                                <i className={`bx ${cat.icon}`}></i>
                                {cat.name}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                ALL GAMES AT A GLANCE
            ═══════════════════════════════════════════════════════════ */}
            <section ref={specialRef} className="py-16 bg-gradient-to-b from-slate-50 to-white scroll-mt-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                            🎮 All Games at a Glance
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Quick overview of every game in Engineering Sports Week {currentYear}
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
                        {specialGames.map((game, index) => (
                            <Link to={`/games/${game.id}`} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.04 }}
                                    whileHover={{ y: -4, scale: 1.02 }}
                                    className={`bg-gradient-to-br ${game.color} rounded-xl p-4 text-white shadow-lg cursor-pointer h-full`}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <i className={`${game.icon} text-2xl`}></i>
                                        <h3 className="font-bold text-sm leading-tight">{game.name}</h3>
                                    </div>
                                    <p className="text-white/80 text-xs mb-2 leading-snug">{game.tagline}</p>
                                    <div className="bg-white/20 rounded-lg p-2 text-xs space-y-0.5">
                                        <p><span className="font-semibold">Players:</span> {game.players}</p>
                                        <p><span className="font-semibold">Duration:</span> {game.duration}</p>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>

                  {/* ── Game Ideas + WhatsApp Suggest Section ── */}
<div className="mt-10 rounded-2xl overflow-hidden" style={{
  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  padding: '48px 32px 40px',
  position: 'relative',
}}>
  {/* Glow blobs */}
  <div style={{
    position: 'absolute', inset: 0, pointerEvents: 'none',
    background: 'radial-gradient(ellipse at 30% 40%, rgba(255,100,100,0.1) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(80,120,255,0.1) 0%, transparent 60%)'
  }} />

  {/* Header */}
  <div className="text-center relative z-10 mb-8">
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
      color: '#fff', fontSize: 12, fontWeight: 600, padding: '6px 16px',
      borderRadius: 100, marginBottom: 16, letterSpacing: '0.05em', textTransform: 'uppercase'
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'linear-gradient(135deg,#f97316,#ec4899)', display: 'inline-block' }} />
      Game Ideas Hub
    </span>
    <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
      Got a <span style={{ background: 'linear-gradient(90deg,#f97316,#ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>wild game idea</span>?
      <br />Watch. Pick. Suggest.
    </h3>
    <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 500, margin: '0 auto', lineHeight: 1.6, fontSize: 15 }}>
      Browse these 12 viral reels for inspiration, then send us your favourite idea on WhatsApp — takes 30 seconds!
    </p>
  </div>

  {/* 12 Reel Cards */}
  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-10 relative z-10">
    {[
      { url: "https://www.instagram.com/reel/DTfMVFYDBNT/", name: "Wild Team Race" },
      { url: "https://www.instagram.com/reel/DS3ozt0CS2n/", name: "Obstacle Dash" },
      { url: "https://www.instagram.com/reel/DSPjeCFDgEI/", name: "Spin & Catch" },
      { url: "https://www.instagram.com/reel/DR0KOFVDwAX/", name: "Chaos Ball" },
      { url: "https://www.instagram.com/reel/DVFaW_XDjOm/", name: "Ring Relay" },
      { url: "https://www.instagram.com/reel/DRIfbdMCE33/", name: "Balance Rush" },
      { url: "https://www.instagram.com/reel/DS0gZM8Eeyh/", name: "Toss Frenzy" },
      { url: "https://www.instagram.com/reel/DQWUnO0j_fh/", name: "Flag Grab" },
      { url: "https://www.instagram.com/reel/DPPYiEXgrkE/", name: "Sack Sprint" },
      { url: "https://www.instagram.com/reel/DO50FA0gpUz/", name: "Bucket Blitz" },
      { url: "https://www.instagram.com/reel/DTpDuanDOxa/", name: "Partner Duel" },
      { url: "https://www.instagram.com/reel/DURkIdSgM8h/", name: "Mystery Game" },
    ].map((reel, i) => {
      const embedUrl = reel.url.replace('/reel/', '/reel/').replace(/\/$/, '') + '/embed';
      return (
        <motion.div
          key={i}
          whileHover={{ y: -4, scale: 1.05 }}
          style={{
            display: 'block', borderRadius: 14, overflow: 'hidden',
            position: 'relative', aspectRatio: '9/16',
            background: '#000',
            textDecoration: 'none',
          }}
        >
          <iframe
            src={embedUrl}
            title={reel.name}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: 14,
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 8px 8px', background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)' }}>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'linear-gradient(135deg,#f97316,#ec4899)', display: 'inline-block' }} />
              Reel
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>{reel.name}</div>
          </div>
        </motion.div>
      );
    })}
  </div>

  {/* Divider */}
  <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', marginBottom: 28 }} className="relative z-10" />

  {/* WhatsApp Form */}
  <WhatsAppSuggestForm whatsappNumber={WHATSAPP_NUMBER} />
</div>



                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                WOMEN'S GAMES
            ═══════════════════════════════════════════════════════════ */}
            <section ref={womenRef} className="py-12 bg-rose-50/30 scroll-mt-20">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-2 h-8 rounded-full bg-rose-500"></div>
                        <h2 className="text-2xl md:text-3xl font-bold text-rose-700">Women's Games</h2>
                        <div className="h-0.5 flex-1 bg-gradient-to-r from-rose-200 to-transparent rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {gamesByCategory[0].games.map((game, gameIdx) => (
                            <Link to={`/games/${game.id}`} key={gameIdx}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: gameIdx * 0.05 }}
                                    whileHover={{ y: -5 }}
                                    className="bg-rose-50 rounded-xl p-5 border border-rose-200 hover:shadow-lg transition cursor-pointer"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <i className={`${game.icon} text-3xl text-rose-700`}></i>
                                        {game.popularity === 'New' && (
                                            <span className="bg-emerald-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">NEW</span>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{game.name}</h3>
                                    <div className="space-y-1 text-sm">
                                        <p className="text-gray-600"><span className="font-semibold">Players:</span> {game.players}</p>
                                        <p className="text-gray-600"><span className="font-semibold">Duration:</span> {game.duration}</p>
                                    </div>
                                    <div className="mt-3 text-sm font-medium text-rose-700 flex items-center gap-1">
                                        View Details <i className='bx bx-right-arrow-alt'></i>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-4 text-right">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700">
                            {gamesByCategory[0].games.length} Games
                        </span>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                MEN'S GAMES
            ═══════════════════════════════════════════════════════════ */}
            <section ref={menRef} className="py-12 bg-blue-50/30 scroll-mt-20">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-2 h-8 rounded-full bg-blue-500"></div>
                        <h2 className="text-2xl md:text-3xl font-bold text-blue-700">Men's Games</h2>
                        <div className="h-0.5 flex-1 bg-gradient-to-r from-blue-200 to-transparent rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {gamesByCategory[1].games.map((game, gameIdx) => (
                            <Link to={`/games/${game.id}`} key={gameIdx}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: gameIdx * 0.05 }}
                                    whileHover={{ y: -5 }}
                                    className="bg-blue-50 rounded-xl p-5 border border-blue-200 hover:shadow-lg transition cursor-pointer"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <i className={`${game.icon} text-3xl text-blue-700`}></i>
                                        {game.popularity === 'New' && (
                                            <span className="bg-emerald-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">NEW</span>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{game.name}</h3>
                                    <div className="space-y-1 text-sm">
                                        <p className="text-gray-600"><span className="font-semibold">Players:</span> {game.players}</p>
                                        <p className="text-gray-600"><span className="font-semibold">Duration:</span> {game.duration}</p>
                                    </div>
                                    <div className="mt-3 text-sm font-medium text-blue-700 flex items-center gap-1">
                                        View Details <i className='bx bx-right-arrow-alt'></i>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-4 text-right">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                            {gamesByCategory[1].games.length} Games
                        </span>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                GAMES VENUES — pure info, NOT clickable
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-14 bg-white">
                <div className="container mx-auto px-4">

                    <div className="flex items-center gap-3 mb-2">
                        <i className='bx bx-map text-3xl text-emerald-600'></i>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Games Venues</h2>
                        <div className="h-0.5 flex-1 bg-gradient-to-r from-emerald-200 to-transparent rounded-full"></div>
                    </div>
                    <p className="text-gray-500 text-sm mb-8 ml-10">
                        Know exactly where to show up on game day — BZU campus locations
                    </p>

                    {/* ── Venue cards — plain divs, no Link, no hover animation ── */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {venueDetails.map((item, index) => {
                            const ac = accentMap[item.accent];
                            return (
                                <div
                                    key={index}
                                    className={`${ac.bg} rounded-xl p-5 border ${ac.border} h-full`}
                                >
                                    {/* Sport header */}
                                    <div className="flex items-center gap-3 mb-5">
                                        <span className="text-4xl leading-none">{item.icon}</span>
                                        <h3 className="font-bold text-gray-800 leading-tight text-base">
                                            {item.sport}
                                        </h3>
                                    </div>

                                    {/* Venue rows */}
                                    <div className="space-y-4">
                                        {item.venues.map((v, vi) => (
                                            <div key={vi} className="flex items-start gap-2">
                                                <i className={`${v.icon} ${ac.pin} text-lg flex-shrink-0 mt-0.5`}></i>
                                                <div>
                                                    <span className={`text-xs font-bold ${ac.label} uppercase tracking-wide block mb-0.5`}>
                                                        {v.label}
                                                    </span>
                                                    <span className="text-sm text-gray-700 leading-snug">
                                                        {v.ground}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Race track coming-soon banner */}
                    <div className="mt-6 flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 max-w-2xl">
                        <i className='bx bx-time-five text-amber-500 text-2xl flex-shrink-0'></i>
                        <p className="text-sm text-amber-800">
                            <span className="font-bold">🏃 Race Track Update:</span> The 100m Race & 4×100m Relay will be held at{' '}
                            <span className="font-semibold">Staff Colony No. 2</span>. Detailed route map and timings will be announced soon — stay tuned!
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                SCHEDULE / REGISTER CTA
            ═══════════════════════════════════════════════════════════ */}
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

            {/* ═══════════════════════════════════════════════════════════
                FOOTER NOTE
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-4 bg-slate-900 text-white text-center text-sm">
                <div className="container mx-auto px-4">
                    <p>🏆 BZU ENGINEERING SPORTS {currentYear} · 5 DEPARTMENTS · {totalGames}+ GAMES · WOMEN'S & MEN'S COMPETITIONS</p>
                </div>
            </section>
        </div>
    );
};

export default Games;
