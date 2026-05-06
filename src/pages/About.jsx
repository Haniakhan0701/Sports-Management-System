// src/pages/About.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import 'boxicons/css/boxicons.min.css';

const About = () => {
    const [activeTab, setActiveTab] = useState('story');

    const stats = [
        { value: '5', label: 'Departments' },
        { value: '12', label: 'Sports' },
        { value: '200+', label: 'Athletes' },
        { value: '30+', label: 'Matches' },
        { value: '7', label: 'Days' },
        { value: '1', label: 'Champion' },
    ];

    const sports = [
        { name: 'Cricket', icon: 'bx-cricket-ball' },
        { name: 'Football', icon: 'bx-football' },
        { name: 'Basketball', icon: 'bxs-basketball' },
        { name: 'Volleyball', icon: 'bx-tennis-ball' },
        { name: 'Badminton', icon: 'bx-run' },
        { name: 'Athletics', icon: 'bx-run' },
        { name: 'Tug of War', icon: 'bx-dumbbell' },
        { name: 'Dodge Ball', icon: 'bx-target-lock' },
    ];

    const committee = [
        { name: 'Dr. Ahmad Raza', role: 'Sports Patron', dept: 'Dean of Engineering' },
        { name: 'Prof. Sara Malik', role: 'Sports Coordinator', dept: 'Faculty Advisor' },
        { name: 'Usman Chaudhry', role: 'Student President', dept: 'Computer Engineering' },
        { name: 'Fatima Zafar', role: 'Media & PR Head', dept: 'Electrical Engineering' },
        { name: 'Ali Raza', role: 'Events Manager', dept: 'Mechanical Engineering' },
        { name: 'Bilal Ahmed', role: 'Ground Coordinator', dept: 'Civil Engineering' },
    ];

    const fadeUp = {
        hidden: { opacity: 0, y: 24 },
        visible: (i = 0) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.08, duration: 0.45 }
        })
    };

    const tabs = [
        { id: 'story',     label: 'Story',     icon: 'bx-book-open'  },
        { id: 'sports',    label: 'Sports',    icon: 'bx-football'   },
        { id: 'committee', label: 'Committee', icon: 'bx-group'      },
    ];

    // WhatsApp link directing to games page inquiry
    const whatsappNumber = '923001234567'; // replace with real number
    const whatsappMsg = encodeURIComponent('Hi! I have a question about BZU Engineering Sports 2026 and the games schedule.');
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

    return (
        <div className="min-h-screen bg-gray-50">

            {/* ── Hero ── */}
            <section className="relative bg-gradient-to-r from-slate-900 to-slate-700 text-white pt-24 pb-28 overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center md:text-left max-w-2xl"
                    >
                        <span className="inline-block border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest mb-5 uppercase">
                            BZU Engineering Sports 2026
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                            More Than <br />Just Games
                        </h1>
                        <p className="text-gray-300 text-base leading-relaxed mb-8 max-w-xl">
                            The premier annual departmental championship — five departments, 200 athletes, 12 sports, seven days of competition at BZU Engineering Campus, Multan.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/register" className="bg-white text-slate-900 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition shadow-lg">
                                Register Now
                            </Link>
                            <Link to="/schedule" className="border border-white/30 hover:border-white/60 text-white font-medium px-6 py-3 rounded-lg transition">
                                View Schedule
                            </Link>
                        </div>
                    </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-amber-400 to-emerald-500" />
            </section>

            {/* ── Stats Bar ── */}
            <section className="bg-white border-b border-gray-100 shadow-sm">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-6 text-center divide-x divide-gray-100">
                        {stats.map((s, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                            >
                                <div className="text-3xl font-black text-gray-900">{s.value}</div>
                                <div className="text-xs text-gray-500 font-medium mt-1 uppercase tracking-wide">{s.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Tab Navigation ── */}
            <section className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                                    activeTab === tab.id
                                        ? 'bg-slate-900 text-white'
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

            {/* ── Story Tab ── */}
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
                                    Every year, the five departments of BZU's Faculty of Engineering set aside their academic rivalry and meet on the field. The results have been electrifying — last-over cricket finishes, overtime basketball thrillers, sprints decided by hundredths of a second.
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    The 2026 edition features Men's and Women's competitions across 12 sports, running over 7 action-packed days from Feb 8–14 at BZU Engineering Campus, Multan.
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
                                        <p className="text-white font-semibold text-sm">Opening Ceremony · Sports Week 2026</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Values — no emojis, clean cards */}
                        <h3 className="text-2xl font-black text-gray-900 mb-8 text-center">What We Stand For</h3>
                        <div className="grid md:grid-cols-3 gap-5">
                            {[
                                { icon: 'bx-group', title: 'Teamwork', desc: 'Every medal won is a team effort. We celebrate collective excellence over individual glory.' },
                                { icon: 'bx-bullseye', title: 'Excellence', desc: 'Whether you finish first or fifth, we push every athlete to perform at their absolute best.' },
                                { icon: 'bx-heart', title: 'Spirit', desc: "The roar of the crowd, the handshake after the match — this is what university sport is all about." },
                                { icon: 'bx-shield', title: 'Fair Play', desc: 'Zero tolerance for unsporting behavior. Every competitor deserves a fair and safe environment.' },
                                { icon: 'bx-user-check', title: 'Inclusion', desc: "Men's and Women's competitions across all sports — every student athlete has a place here." },
                                { icon: 'bx-trophy', title: 'Tradition', desc: 'Six years strong. A championship that grows bigger, better, and more competitive every year.' },
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
                                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-3">
                                        <i className={`bx ${v.icon} text-xl text-slate-700`}></i>
                                    </div>
                                    <h4 className="font-bold text-gray-900 mb-2">{v.title}</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* WhatsApp contact CTA */}
                        <div className="mt-16 bg-slate-900 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6 justify-between">
                            <div>
                                <h3 className="text-white font-black text-xl mb-1">Have a question?</h3>
                                <p className="text-gray-400 text-sm">Reach us on WhatsApp — we'll get back to you quickly.</p>
                            </div>
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3 rounded-xl transition shrink-0"
                            >
                                <i className="bx bxl-whatsapp text-2xl"></i>
                                Chat on WhatsApp
                            </a>
                        </div>
                    </div>
                </section>
            )}

            {/* ── Sports Tab ── */}
            {activeTab === 'sports' && (
                <section className="py-16">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-black text-gray-900 mb-3">12+ Sports. Every Discipline.</h2>
                            <p className="text-gray-500 text-sm">Compete across all sports at BZU Engineering Campus.</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                        <i className={`bx ${sport.icon} text-xl text-slate-700`}></i>
                                    </div>
                                    <h4 className="font-bold text-gray-900 text-sm">{sport.name}</h4>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-12 bg-gradient-to-r from-slate-900 to-slate-700 rounded-2xl p-8 text-white text-center">
                            <h3 className="text-xl font-black mb-2">Regular Play Schedule</h3>
                            <p className="text-gray-300 text-sm mb-6">Matches every Wednesday & Saturday. Finals on Feb 12.</p>
                            <Link to="/schedule" className="bg-white text-slate-900 font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition inline-block text-sm">
                                View Full Schedule
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* ── Committee Tab ── */}
            {activeTab === 'committee' && (
                <section className="py-16">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-black text-gray-900 mb-3">The People Behind It All</h2>
                            <p className="text-gray-500 text-sm">Our dedicated committee makes every match, every moment, and every memory possible.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {committee.map((member, i) => (
                                <motion.div
                                    key={i}
                                    custom={i}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={fadeUp}
                                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition"
                                >
                                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
                                        <i className="bx bx-user text-2xl text-slate-600"></i>
                                    </div>
                                    <h4 className="font-black text-gray-900">{member.name}</h4>
                                    <p className="text-slate-700 font-semibold text-sm mt-1">{member.role}</p>
                                    <p className="text-gray-400 text-xs mt-1">{member.dept}</p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-12 bg-slate-900 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6 justify-between">
                            <div>
                                <h3 className="text-white font-black text-xl mb-1">Want to Volunteer?</h3>
                                <p className="text-gray-400 text-sm">Join our organizing team as a volunteer and be part of the action.</p>
                            </div>
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3 rounded-xl transition shrink-0"
                            >
                                <i className="bx bxl-whatsapp text-2xl"></i>
                                Chat on WhatsApp
                            </a>
                        </div>
                    </div>
                </section>
            )}

            {/* ── Bottom CTA ── */}
            <section className="py-16 bg-gradient-to-r from-slate-900 to-slate-700 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-black mb-3">Ready to Compete?</h2>
                    <p className="text-gray-300 mb-8 max-w-xl mx-auto text-sm">
                        Registrations for BZU Engineering Sports Week 2026 are open. Represent your department and make history.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/register" className="bg-white text-slate-900 font-bold px-8 py-3 rounded-xl hover:bg-gray-100 transition shadow-lg">
                            Register Your Team
                        </Link>
                        <Link to="/games" className="border border-white/30 hover:border-white text-white font-medium px-8 py-3 rounded-xl transition">
                            View All Games
                        </Link>
                    </div>
                    <p className="text-gray-500 text-xs mt-10">
                        BZU Engineering Sports · 2026 · Departmental Championships · Multan, Pakistan
                    </p>
                </div>
            </section>
        </div>
    );
};

export default About;
