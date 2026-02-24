// src/pages/About.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import 'boxicons/css/boxicons.min.css';

const About = () => {
    const [activeTab, setActiveTab] = useState('story');

    const stats = [
        { value: '5', label: 'Departments', icon: '🏛️' },
        { value: '12', label: 'Sports', icon: '🏆' },
        { value: '200+', label: 'Athletes', icon: '🏃' },
        { value: '30+', label: 'Matches', icon: '⚡' },
        { value: '7', label: 'Days', icon: '📅' },
        { value: '1', label: 'Champion', icon: '🥇' },
    ];

    const departments = [
        {
            code: 'CE',
            name: 'Computer Engineering',
            color: 'from-blue-600 to-cyan-500',
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            text: 'text-blue-700',
            icon: '💻',
            description: 'Reigning champions known for their strategic brilliance and team cohesion.',
            titles: 3,
            athletes: 45,
        },
        {
            code: 'ME',
            name: 'Mechanical Engineering',
            color: 'from-orange-600 to-amber-500',
            bg: 'bg-orange-50',
            border: 'border-orange-200',
            text: 'text-orange-700',
            icon: '⚙️',
            description: 'Powerhouse department with exceptional strength in cricket and athletics.',
            titles: 2,
            athletes: 42,
        },
        {
            code: 'EE',
            name: 'Electrical Engineering',
            color: 'from-yellow-500 to-lime-500',
            bg: 'bg-yellow-50',
            border: 'border-yellow-200',
            text: 'text-yellow-700',
            icon: '⚡',
            description: 'Fast and energetic — dominant in football and volleyball competitions.',
            titles: 1,
            athletes: 38,
        },
        {
            code: 'CVE',
            name: 'Civil Engineering',
            color: 'from-green-600 to-emerald-500',
            bg: 'bg-green-50',
            border: 'border-green-200',
            text: 'text-green-700',
            icon: '🏗️',
            description: 'Building champions year by year with consistent all-round performances.',
            titles: 1,
            athletes: 40,
        },
        {
            code: 'AR',
            name: 'Architecture',
            color: 'from-purple-600 to-pink-500',
            bg: 'bg-purple-50',
            border: 'border-purple-200',
            text: 'text-purple-700',
            icon: '🏛️',
            description: 'Creative underdogs with flair — always exciting to watch on the field.',
            titles: 0,
            athletes: 35,
        },
    ];

    const sports = [
        { name: 'Cricket', icon: '🏏', category: "Men's", venue: 'Oval Ground' },
        { name: 'Football', icon: '⚽', category: "Women's", venue: 'Football Field' },
        { name: 'Basketball', icon: '🏀', category: "Men's", venue: 'Indoor Court' },
        { name: 'Volleyball', icon: '🏐', category: "Women's", venue: 'Court 1' },
        { name: 'Badminton', icon: '🏸', category: "Men's", venue: 'Sports Hall' },
        { name: 'Badminton', icon: '🏸', category: "Women's", venue: 'Sports Hall' },
        { name: 'Athletics', icon: '🏃', category: "Men's", venue: 'Running Track' },
        { name: 'Athletics', icon: '🏃', category: "Women's", venue: 'Running Track' },
        { name: 'Tug of War', icon: '🪢', category: "Men's", venue: 'Main Ground' },
        { name: 'Tug of War', icon: '🪢', category: "Women's", venue: 'Main Ground' },
        { name: 'Dodge Ball', icon: '🎯', category: "Men's", venue: 'Court 2' },
        { name: 'Dodge Ball', icon: '🎯', category: "Women's", venue: 'Court 2' },
    ];

    const history = [
        { year: 2026, champion: 'CE', sport: 'Overall', note: 'Current Season' },
        { year: 2025, champion: 'CE', sport: 'Overall', note: 'Back-to-back title' },
        { year: 2024, champion: 'ME', sport: 'Overall', note: 'Mechanical dominance' },
        { year: 2023, champion: 'CE', sport: 'Overall', note: 'Inaugural champions' },
        { year: 2022, champion: 'EE', sport: 'Overall', note: 'EE golden era' },
        { year: 2021, champion: 'CVE', sport: 'Overall', note: 'Civil surprise win' },
    ];

    const committee = [
        { name: 'Dr. Ahmad Raza', role: 'Sports Patron', dept: 'Dean of Engineering', icon: '👨‍💼' },
        { name: 'Prof. Sara Malik', role: 'Sports Coordinator', dept: 'Faculty Advisor', icon: '👩‍🏫' },
        { name: 'Usman Chaudhry', role: 'Student President', dept: 'Computer Engineering', icon: '👨‍🎓' },
        { name: 'Fatima Zafar', role: 'Media & PR Head', dept: 'Electrical Engineering', icon: '👩‍🎓' },
        { name: 'Ali Raza', role: 'Events Manager', dept: 'Mechanical Engineering', icon: '👨‍🎓' },
        { name: 'Bilal Ahmed', role: 'Ground Coordinator', dept: 'Civil Engineering', icon: '👨‍🎓' },
    ];

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: (i = 0) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.5 }
        })
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* ── Hero ── */}
            <section className="relative bg-gradient-to-br from-gray-900 via-green-900 to-emerald-800 text-white pt-24 pb-28 overflow-hidden">
                {/* decorative circles */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-400/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <span className="inline-block border border-green-400/40 bg-green-400/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium tracking-widest mb-6 text-green-300">
                             ABOUT BZU ENGINEERING SPORTS
                        </span>
                        <h1 className="text-5xl md:text-6xl font-black leading-tight mb-5 tracking-tight">
                            More Than <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
                                Just Games
                            </span>
                        </h1>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            BZU Engineering Sports Week is the premier annual departmental championship — where five departments, two hundred athletes, and twelve sports collide in the spirit of excellence, teamwork, and unforgettable moments.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 mt-8">
                            <Link to="/register" className="bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3 rounded-xl transition">
                                Register Now
                            </Link>
                            <Link to="/schedule" className="border border-white/30 hover:border-white/60 text-white font-medium px-6 py-3 rounded-xl transition">
                                View Schedule
                            </Link>
                        </div>
                    </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-emerald-400 to-teal-400" />
            </section>

            {/* ── Stats Bar ── */}
            <section className="bg-white border-b border-gray-100 shadow-sm">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-6 text-center">
                        {stats.map((s, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                            >
                                <div className="text-3xl mb-1">{s.icon}</div>
                                <div className="text-3xl font-black text-gray-900">{s.value}</div>
                                <div className="text-sm text-gray-500 font-medium">{s.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Tab Navigation ── */}
            <section className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
                        {[
                            { id: 'story', label: 'Our Story', icon: 'bx-book-open' },
                            { id: 'sports', label: 'Sports', icon: 'bx-football' },
                            { id: 'departments', label: 'Departments', icon: 'bx-buildings' },
                            { id: 'history', label: 'Past Champions', icon: 'bx-trophy' },
                            { id: 'committee', label: 'Committee', icon: 'bx-group' },
                            { id: 'contact', label: 'Contact', icon: 'bx-envelope' },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                                    activeTab === tab.id
                                        ? 'bg-green-600 text-white'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <i className={`bx ${tab.icon}`}></i>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Our Story Tab ── */}
            {activeTab === 'story' && (
                <section className="py-16">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                                <h2 className="text-3xl font-black text-gray-900 mb-4">The Championship That Unites Engineers</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    BZU Engineering Sports Week was born from a simple idea: that the best engineers aren't just technically brilliant — they're team players, leaders under pressure, and competitors at heart.
                                </p>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Since 2021, every February, the five departments of BZU's Faculty of Engineering set aside their academic rivalry and meet on the field. The results have been electrifying — last-over cricket finishes, overtime basketball thrillers, and sprints decided by hundredths of a second.
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    The 2026 edition features Men's and Women's competitions across 12 sports, with matches running over 7 action-packed days from Feb 8–14 at the BZU Engineering Campus, Multan.
                                </p>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                                    <img
                                        src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                        alt="Opening Ceremony"
                                        className="w-full h-72 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                        <p className="text-white font-semibold">Opening Ceremony · Sports Week 2026</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Values */}
                        <h3 className="text-2xl font-black text-gray-900 mb-8 text-center">What We Stand For</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { icon: '🤝', title: 'Teamwork', desc: 'Every medal won is a team effort. We celebrate collective excellence over individual glory.' },
                                { icon: '🎯', title: 'Excellence', desc: 'Whether you finish first or fifth, we push every athlete to perform at their absolute best.' },
                                { icon: '🌟', title: 'Spirit', desc: "The roar of the crowd, the handshake after the match — this is what university sport is all about." },
                                { icon: '⚖️', title: 'Fair Play', desc: 'Zero tolerance for unsporting behavior. Every competitor deserves a fair and safe environment.' },
                                { icon: '👩‍🎓', title: 'Inclusion', desc: "Men's and Women's competitions across all sports — every student athlete has a place here." },
                                { icon: '🏆', title: 'Tradition', desc: 'Six years strong. A championship that grows bigger, better, and more competitive every year.' },
                            ].map((v, i) => (
                                <motion.div
                                    key={i}
                                    custom={i}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={fadeUp}
                                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition"
                                >
                                    <div className="text-3xl mb-3">{v.icon}</div>
                                    <h4 className="font-bold text-gray-900 mb-2">{v.title}</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Sports Tab ── */}
            {activeTab === 'sports' && (
                <section className="py-16">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-black text-gray-900 mb-3">12 Sports. Every Discipline.</h2>
                            <p className="text-gray-500">Competing across Men's and Women's categories at BZU Engineering Campus.</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {sports.map((sport, i) => (
                                <motion.div
                                    key={i}
                                    custom={i}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={fadeUp}
                                    className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition text-center"
                                >
                                    <div className="text-4xl mb-3">{sport.icon}</div>
                                    <h4 className="font-bold text-gray-900 text-sm">{sport.name}</h4>
                                    <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1 font-medium ${
                                        sport.category === "Men's"
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'bg-pink-100 text-pink-700'
                                    }`}>
                                        {sport.category}
                                    </span>
                                    <p className="text-xs text-gray-400 mt-2 flex items-center justify-center gap-1">
                                        <i className='bx bx-map-pin'></i> {sport.venue}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Schedule callout */}
                        <div className="mt-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white text-center">
                            <h3 className="text-2xl font-black mb-2">Regular Play Schedule</h3>
                            <p className="text-green-100 mb-6">Matches held every Wednesday & Saturday, weather permitting. Finals on Feb 12.</p>
                            <Link to="/schedule" className="bg-white text-green-700 font-bold px-6 py-3 rounded-xl hover:bg-green-50 transition inline-block">
                                View Full Schedule
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* ── Departments Tab ── */}
            {activeTab === 'departments' && (
                <section className="py-16">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-black text-gray-900 mb-3">Five Departments. One Championship.</h2>
                            <p className="text-gray-500">Each department fields athletes across all sports — the department with the most cumulative points wins.</p>
                        </div>
                        <div className="space-y-5">
                            {departments.map((dept, i) => (
                                <motion.div
                                    key={i}
                                    custom={i}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={fadeUp}
                                    className={`rounded-2xl border ${dept.border} ${dept.bg} p-6 flex flex-col md:flex-row items-start md:items-center gap-6`}
                                >
                                    {/* Code badge */}
                                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${dept.color} flex items-center justify-center text-white font-black text-2xl shrink-0 shadow-lg`}>
                                        {dept.code}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-3 mb-1">
                                            <h3 className="text-xl font-black text-gray-900">{dept.name}</h3>
                                            <span className="text-2xl">{dept.icon}</span>
                                            {dept.titles > 0 && (
                                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${dept.bg} ${dept.text} border ${dept.border}`}>
                                                    🏆 {dept.titles}× Champion
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-600 text-sm">{dept.description}</p>
                                    </div>
                                    <div className="flex gap-6 text-center shrink-0">
                                        <div>
                                            <div className={`text-2xl font-black ${dept.text}`}>{dept.athletes}</div>
                                            <div className="text-xs text-gray-500">Athletes</div>
                                        </div>
                                        <div>
                                            <div className={`text-2xl font-black ${dept.text}`}>{dept.titles}</div>
                                            <div className="text-xs text-gray-500">Titles</div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── History Tab ── */}
            {activeTab === 'history' && (
                <section className="py-16">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-black text-gray-900 mb-3">Hall of Champions</h2>
                            <p className="text-gray-500">Six years of sporting excellence at BZU Engineering.</p>
                        </div>

                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 to-gray-200 md:left-1/2 md:-translate-x-0.5" />

                            <div className="space-y-8">
                                {history.map((h, i) => {
                                    const dept = departments.find(d => d.code === h.champion);
                                    return (
                                        <motion.div
                                            key={i}
                                            custom={i}
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true }}
                                            variants={fadeUp}
                                            className={`relative flex gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                        >
                                            {/* dot */}
                                            <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-green-500 border-4 border-white shadow z-10 top-5" />

                                            {/* spacer */}
                                            <div className="hidden md:block md:w-1/2" />

                                            {/* card */}
                                            <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                                                <div className={`rounded-xl border ${dept?.border || 'border-gray-200'} ${dept?.bg || 'bg-white'} p-5 shadow-sm`}>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className={`text-2xl font-black ${dept?.text || 'text-gray-800'}`}>{h.year}</span>
                                                        {h.year === 2026 && (
                                                            <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">CURRENT</span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${dept?.color || 'from-gray-400 to-gray-600'} flex items-center justify-center text-white font-black text-sm`}>
                                                            {h.champion}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-gray-900 text-sm">{dept?.name}</p>
                                                            <p className="text-xs text-gray-500">{h.note}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Championship count summary */}
                        <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-4">
                            {departments.map((d, i) => (
                                <div key={i} className={`rounded-xl text-center p-4 border ${d.border} ${d.bg}`}>
                                    <div className={`text-3xl font-black ${d.text}`}>{d.titles}</div>
                                    <div className={`text-sm font-bold ${d.text}`}>{d.code}</div>
                                    <div className="text-xs text-gray-500">title{d.titles !== 1 ? 's' : ''}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Committee Tab ── */}
            {activeTab === 'committee' && (
                <section className="py-16">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-black text-gray-900 mb-3">The People Behind It All</h2>
                            <p className="text-gray-500">Our dedicated committee makes every match, every moment, and every memory possible.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {committee.map((member, i) => (
                                <motion.div
                                    key={i}
                                    custom={i}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={fadeUp}
                                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition text-center"
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-200 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                                        {member.icon}
                                    </div>
                                    <h4 className="font-black text-gray-900">{member.name}</h4>
                                    <p className="text-green-600 font-semibold text-sm mt-1">{member.role}</p>
                                    <p className="text-gray-400 text-xs mt-1">{member.dept}</p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-12 bg-gray-900 rounded-2xl p-8 text-center text-white">
                            <h3 className="text-xl font-black mb-2">Want to Volunteer?</h3>
                            <p className="text-gray-400 text-sm mb-6">We're always looking for enthusiastic students to join our organizing team as volunteers.</p>
                            <a href="mailto:sports@bzu.edu.pk" className="bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3 rounded-xl transition inline-block">
                                Get In Touch
                            </a>
                        </div>
                    </div>
                </section>
            )}

            {/* ── Contact Tab ── */}
            {activeTab === 'contact' && (
                <section className="py-16">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-black text-gray-900 mb-3">Get In Touch</h2>
                            <p className="text-gray-500">Questions about registration, scheduling, or anything else? We're here.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Contact Info */}
                            <div className="space-y-5">
                                {[
                                    { icon: 'bx-map', label: 'Location', value: 'BZU Engineering Campus, Multan, Pakistan', color: 'text-red-500' },
                                    { icon: 'bx-envelope', label: 'Email', value: 'sports@bzu.edu.pk', color: 'text-blue-500' },
                                    { icon: 'bx-phone', label: 'Phone', value: '+92 61 1234567', color: 'text-green-500' },
                                    { icon: 'bx-time', label: 'Office Hours', value: 'Mon–Fri, 9:00 AM – 5:00 PM', color: 'text-purple-500' },
                                    { icon: 'bx-calendar', label: 'Sports Week', value: 'Feb 8–14, 2026 · BZU Campus', color: 'text-orange-500' },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        custom={i}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        variants={fadeUp}
                                        className="flex items-start gap-4 bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
                                    >
                                        <div className={`text-2xl ${item.color} mt-0.5`}>
                                            <i className={`bx ${item.icon}`}></i>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{item.label}</p>
                                            <p className="text-gray-800 font-semibold mt-0.5">{item.value}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Quick message form */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100"
                            >
                                <h3 className="font-black text-gray-900 text-lg mb-5">Send a Message</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                        <input
                                            type="text"
                                            placeholder="Ahmed Khan"
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            placeholder="ahmed@bzu.edu.pk"
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                        <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                                            <option value="">Select Department</option>
                                            <option>Computer Engineering</option>
                                            <option>Mechanical Engineering</option>
                                            <option>Electrical Engineering</option>
                                            <option>Civil Engineering</option>
                                            <option>Architecture</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                        <textarea
                                            rows={4}
                                            placeholder="Your question or message..."
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                                        />
                                    </div>
                                    <button className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl transition">
                                        Send Message
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            )}

            {/* ── Bottom CTA ── */}
            <section className="py-16 bg-gradient-to-br from-gray-900 to-green-900 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-black mb-3">Ready to Compete?</h2>
                    <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                        Registrations for BZU Engineering Sports Week 2026 are open. Represent your department and make history.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/register" className="bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-3 rounded-xl transition">
                            Register Your Team
                        </Link>
                        <Link to="/games" className="border border-white/30 hover:border-white text-white font-medium px-8 py-3 rounded-xl transition">
                            View All Games
                        </Link>
                    </div>
                    <p className="text-gray-500 text-sm mt-10">
                        BZU Engineering Sports · 2026 · Departmental Championships · Multan, Pakistan
                    </p>
                </div>
            </section>
        </div>
    );
};

export default About;
