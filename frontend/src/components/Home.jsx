import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import 'boxicons/css/boxicons.min.css';
import SportsScene3D from '../components/SportsScene3D'



const API = `${import.meta.env.VITE_API_URL}/api`;

const SPORT_ICONS = {
  Cricket: "🏏", Football: "⚽", Badminton: "🏸",
  "Tug of War": "🪢", "Dodge Ball": "🎯",
  "100m Race": "🏃", "4×100m Relay": "🏅",
  "Bottle Spin Chase": "🍾",
};

const DEPT_COLORS = {
  CE:  { text: "text-blue-600",    bg: "bg-blue-50",    bar: "bg-blue-500" },
  ME:  { text: "text-amber-600",   bg: "bg-amber-50",   bar: "bg-amber-500" },
  EE:  { text: "text-emerald-600", bg: "bg-emerald-50", bar: "bg-emerald-500" },
  CVE: { text: "text-slate-600",   bg: "bg-slate-50",   bar: "bg-slate-500" },
  AR:  { text: "text-rose-600",    bg: "bg-rose-50",    bar: "bg-rose-500" },
};

const DEPT_FULL = {
  CE: "Computer Eng", ME: "Mechanical Eng",
  EE: "Electrical Eng", CVE: "Civil Eng", AR: "Architecture",
};

const departments = [
  { name: "Computer Engineering", short: "CE",  icon: "bx-laptop",        color: "text-blue-600",    bgLight: "bg-blue-50" },
  { name: "Mechanical Engineering", short: "ME", icon: "bx-cog",           color: "text-amber-600",   bgLight: "bg-amber-50" },
  { name: "Electrical Engineering", short: "EE", icon: "bx-bolt-circle",   color: "text-emerald-600", bgLight: "bg-emerald-50" },
  { name: "Civil Engineering", short: "CVE",     icon: "bx-building-house",color: "text-slate-600",   bgLight: "bg-slate-50" },
  { name: "Architecture", short: "AR",           icon: "bx-paint",         color: "text-rose-600",    bgLight: "bg-rose-50" },
];

// Calculate standings from completed matches
const calcStandings = (matches) => {
  const pts = { CE: 0, ME: 0, EE: 0, CVE: 0, AR: 0 };
  const wins = { CE: 0, ME: 0, EE: 0, CVE: 0, AR: 0 };
  matches.filter(m => m.status === "completed" && m.winner && m.winner !== "Draw")
    .forEach(m => {
      if (pts[m.winner] !== undefined) {
        pts[m.winner] += 3;
        wins[m.winner] += 1;
      }
    });
  return Object.entries(pts)
    .map(([dept, points]) => ({ dept, points, wins: wins[dept], full: DEPT_FULL[dept] }))
    .sort((a, b) => b.points - a.points)
    .map((d, i) => ({ ...d, rank: i + 1 }));
};

const formatTime = (d) => {
  if (!d) return "";
  const dt = new Date(d);
  const today = new Date();
  const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
  const isToday = dt.toDateString() === today.toDateString();
  const isTomorrow = dt.toDateString() === tomorrow.toDateString();
  const time = dt.toLocaleTimeString("en-PK", { hour: "2-digit", minute: "2-digit" });
  if (isToday) return `Today ${time}`;
  if (isTomorrow) return `Tomorrow ${time}`;
  return dt.toLocaleDateString("en-PK", { day: "numeric", month: "short" }) + ` ${time}`;
};

const Home = () => {
  const [liveMatches, setLiveMatches]       = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [standings, setStandings]           = useState([]);
  const [announcements, setAnnouncements]   = useState([]);
  const [loading, setLoading]               = useState(true);

  const currentYear = 2026;
  const nextSportsWeekYear = currentYear + 1;

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [matchRes, annRes] = await Promise.all([
          axios.get(`${API}/matches`),
          axios.get(`${API}/announcements`),
        ]);
        const all = matchRes.data.matches || [];
        setLiveMatches(all.filter(m => m.status === "live"));
        setUpcomingMatches(all.filter(m => m.status === "upcoming").slice(0, 4));
        setStandings(calcStandings(all));
        setAnnouncements((annRes.data.announcements || []).slice(0, 4));
      } catch (err) {
        console.error("Home fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
    // Poll every 30 seconds for live updates
    const interval = setInterval(fetchAll, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="relative bg-gradient-to-r from-slate-900 to-slate-700 text-white pt-20 pb-24 md:pt-24 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
            className="text-center md:text-left md:max-w-3xl">
            <span className="inline-block border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium tracking-wide mb-5">
              BZU ENGINEERING {currentYear}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Departmental <br />Sports Championship
            </h1>
            <p className="text-lg text-gray-200 mb-8 max-w-2xl">
              Five departments. Twelve sports. One champion. Fostering excellence, teamwork, and school spirit through competitive athletics.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link to="/schedule">
                <button className="bg-white text-slate-900 px-7 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg flex items-center gap-2">
                  <i className='bx bx-calendar-star'></i> VIEW SCHEDULE
                </button>
              </Link>
              <Link to="/live">
                <button className="border border-white text-white px-7 py-3 rounded-lg font-semibold hover:bg-white/10 transition flex items-center gap-2">
                  <i className='bx bx-play-circle'></i> LIVE ACTION
                  {liveMatches.length > 0 && (
                    <span className="bg-rose-600 text-white text-xs px-2 py-0.5 rounded-full font-bold animate-pulse ml-1">
                      {liveMatches.length}
                    </span>
                  )}
                </button>
              </Link>
            </div>
          </motion.div>

   {/* 3D Sports Scene — ADD THIS BELOW */}
          <div className="absolute right-0 top-0 w-full md:w-1/2 h-full hidden md:block">
            <SportsScene3D />
          </div>

        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-amber-400 to-emerald-500"></div>
      </section>

      {/* Notice */}
      <section className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <div className="flex items-center gap-3 text-gray-600">
              <i className='bx bx-calendar-check text-xl text-emerald-600'></i>
              <span><strong className="text-gray-800">Regular Play:</strong> Matches held every Wednesday & Saturday, weather permitting.</span>
            </div>
            <Link to="/about#regular-sports">
              <button className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1">
                Learn More <i className='bx bx-right-arrow-alt'></i>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-2xl font-bold text-gray-800">DEPARTMENTS</h2>
            <div className="h-px flex-1 bg-gray-200"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
            {departments.map((dept, index) => (
              <motion.div key={index} whileHover={{ y:-4 }}
                className={`${dept.bgLight} p-5 rounded-xl text-center border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer`}>
                <i className={`bx ${dept.icon} text-3xl ${dept.color} mb-2`}></i>
                <div className={`font-bold text-xl ${dept.color}`}>{dept.short}</div>
                <div className="text-xs text-gray-500 mt-1">{dept.name.split(' ')[0]}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE MATCHES — Real Data ── */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-2 h-7 bg-rose-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-800">LIVE MATCHES</h2>
            {liveMatches.length > 0 && (
              <span className="bg-rose-600 text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wider animate-pulse">
                {liveMatches.length} LIVE
              </span>
            )}
          </div>

          {liveMatches.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveMatches.map((match) => (
                <motion.div key={match._id} initial={{ opacity:0, scale:0.97 }} animate={{ opacity:1, scale:1 }}
                  className="bg-white rounded-xl shadow-md border-l-4 border-rose-600 p-5 hover:shadow-lg transition">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{SPORT_ICONS[match.sport] || "🏆"}</span>
                    <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                      🔴 LIVE
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mb-2">{match.category} · {match.sport}</div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-center">
                      <div className={`text-2xl font-black ${DEPT_COLORS[match.teamA]?.text}`}>{match.teamA}</div>
                      <div className="text-3xl font-black text-gray-900">{match.scoreA}</div>
                    </div>
                    <div className="text-gray-400 font-bold text-lg">VS</div>
                    <div className="text-center">
                      <div className={`text-2xl font-black ${DEPT_COLORS[match.teamB]?.text}`}>{match.teamB}</div>
                      <div className="text-3xl font-black text-gray-900">{match.scoreB}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 flex items-center gap-1">
                    <i className='bx bx-map'></i> {match.ground}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
              className="bg-white rounded-xl shadow p-8 text-center max-w-2xl mx-auto border border-gray-200">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className='bx bx-signal-5 text-4xl text-gray-400'></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Live Action at the Moment</h3>
              <p className="text-gray-500 mb-6">Check the schedule for upcoming matches or tune in later.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/schedule">
                  <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition shadow flex items-center gap-2">
                    <i className='bx bx-calendar'></i> VIEW SCHEDULE
                  </button>
                </Link>
                <Link to="/announcements">
                  <button className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition">
                    LATEST UPDATES
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── UPCOMING + STANDINGS — Real Data ── */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Upcoming */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-bold text-gray-800">UPCOMING FIXTURES</h2>
                <div className="h-px flex-1 bg-gray-200"></div>
              </div>
              {loading ? (
                <div className="text-gray-400 text-sm">Loading fixtures...</div>
              ) : upcomingMatches.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-400">
                  <i className='bx bx-calendar-x text-4xl mb-2 block'></i>
                  No upcoming matches scheduled yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingMatches.map((match) => (
                    <div key={match._id} className="bg-gray-50 rounded-lg p-5 hover:bg-gray-100 transition border-l-4 border-blue-600 shadow-sm">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{SPORT_ICONS[match.sport] || "🏆"}</span>
                          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">{match.sport}</span>
                          <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">{match.category}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{formatTime(match.scheduledAt)}</span>
                      </div>
                      <div className="flex items-center gap-4 text-lg">
                        <span className={`font-bold ${DEPT_COLORS[match.teamA]?.text || "text-gray-800"}`}>{match.teamA}</span>
                        <span className="text-gray-400 text-sm">VS</span>
                        <span className={`font-bold ${DEPT_COLORS[match.teamB]?.text || "text-gray-800"}`}>{match.teamB}</span>
                        <span className="ml-auto text-sm text-gray-500 flex items-center gap-1">
                          <i className='bx bx-map'></i> {match.ground}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <Link to="/schedule">
                <button className="mt-6 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 text-sm">
                  VIEW FULL SCHEDULE <i className='bx bx-right-arrow-alt'></i>
                </button>
              </Link>
            </div>

            {/* Standings */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-bold text-gray-800">STANDINGS</h2>
                <div className="h-px flex-1 bg-gray-200"></div>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                {loading ? (
                  <div className="text-gray-400 text-sm text-center py-4">Loading standings...</div>
                ) : standings.every(s => s.points === 0) ? (
                  <div className="text-gray-400 text-sm text-center py-4">
                    <i className='bx bx-trophy text-3xl block mb-2'></i>
                    No results yet — standings update after matches complete.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {standings.map((dept) => (
                      <div key={dept.dept} className="flex items-center justify-between p-2 hover:bg-white rounded-lg transition">
                        <div className="flex items-center gap-3">
                          <span className="w-7 text-center font-semibold text-gray-500 text-lg">{dept.rank}</span>
                          <div>
                            <span className={`font-bold text-lg ${DEPT_COLORS[dept.dept]?.text || "text-gray-800"}`}>{dept.dept}</span>
                            <span className="text-xs text-gray-400 ml-2">{dept.full}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xl text-gray-800">{dept.points}</span>
                          <span className="text-xs text-gray-400">pts</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <Link to="/standings">
                  <button className="mt-4 w-full text-center text-amber-600 hover:text-amber-700 font-medium text-sm py-2 border-t border-gray-200 pt-4">
                    VIEW FULL STANDINGS <i className='bx bx-right-arrow-alt'></i>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ANNOUNCEMENTS — Real Data ── */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <i className='bx bx-bell text-2xl text-gray-600'></i>
                <h2 className="text-2xl font-bold text-gray-800">ANNOUNCEMENTS</h2>
                <div className="h-px flex-1 bg-gray-200"></div>
              </div>
              {loading ? (
                <div className="text-gray-400 text-sm">Loading announcements...</div>
              ) : announcements.length === 0 ? (
                <div className="bg-white rounded-lg p-8 text-center text-gray-400">
                  <i className='bx bx-bell-off text-4xl block mb-2'></i>
                  No announcements yet.
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {announcements.map((item) => (
                    <div key={item._id} className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 hover:shadow transition">
                      <div className="flex items-start gap-3">
                        <i className='bx bx-message-rounded-dots text-blue-600 text-xl'></i>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{item.title}</p>
                          <div className="flex gap-2 mt-3">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              item.category === "Men's"    ? "bg-blue-100 text-blue-700" :
                              item.category === "Women's"  ? "bg-rose-100 text-rose-700" :
                              "bg-gray-100 text-gray-700"
                            }`}>{item.category}</span>
                            {item.departments?.map(d => (
                              <span key={d} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{d}</span>
                            ))}
                          </div>
                        </div>
                        {item.type === "IMPORTANT" && (
                          <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-semibold shrink-0">
                            IMPORTANT
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="bg-white rounded-xl p-6 shadow-md border-t-4 border-blue-600 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <i className='bx bx-calendar-star text-2xl text-blue-600'></i>
                  <h3 className="font-bold text-gray-800 text-lg">NEXT SPORTS WEEK</h3>
                </div>
                <p className="text-3xl font-bold text-gray-800 mb-1">{nextSportsWeekYear}</p>
                <p className="text-gray-500 text-sm mb-4">The premier departmental tournament returns.</p>
                <div className="mt-auto pt-4">
                  <Link to="/about#sports-week">
                    <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2.5 rounded-lg transition text-sm">
                      LEARN MORE
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { to:"/games",      icon:"bx-football",       label:"GAMES" },
              { to:"/live",       icon:"bx-video-recording",label:"LIVE" },
              { to:"/standings",  icon:"bx-trophy",          label:"STANDINGS" },
              { to:"/media",      icon:"bx-images",          label:"GALLERY" },
              { to:"/register",   icon:"bx-user-plus",       label:"REGISTER" },
              { to:"/about",      icon:"bx-info-circle",     label:"ABOUT" },
            ].map((item) => (
              <Link key={item.to} to={item.to}>
                <div className="bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100 transition border border-gray-200">
                  <i className={`bx ${item.icon} text-2xl text-gray-600`}></i>
                  <div className="font-medium text-gray-700 text-sm mt-1">{item.label}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-3 bg-gray-800 text-gray-300 text-center text-xs">
        <div className="container mx-auto px-4">
          BZU ENGINEERING SPORTS · {currentYear} · DEPARTMENTAL CHAMPIONSHIPS · MEN'S & WOMEN'S COMPETITIONS
        </div>
      </section>
    </div>
  );
};

export default Home;
