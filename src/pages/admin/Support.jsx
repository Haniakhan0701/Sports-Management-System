// src/pages/admin/Support.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import 'boxicons/css/boxicons.min.css';

const Support = () => {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', category: 'Technical Issue', subject: '', message: '' });

    const faqs = [
        { q: 'How do I add a new match to the schedule?', a: 'Go to Admin → Manage Games and click "Add Game". Fill in the sport, teams, date, time, and venue.' },
        { q: 'How do I update a live score?', a: 'Go to Admin → Scores. Find the match and click "Update Score". You can also click "Go Live" to mark a match as live.' },
        { q: 'How do I post an announcement?', a: 'Navigate to the Announcements page from the main nav. There you can create, edit, and delete announcements.' },
        { q: 'How do I upload photos or videos to the media gallery?', a: 'Go to the Media page from the main navigation. Use the upload section to add new photos or video links.' },
        { q: 'How are department standings calculated?', a: 'Standings are based on cumulative points earned from all sports. Win = 3 pts, Draw = 1 pt, Loss = 0 pts.' },
        { q: 'Can I edit or delete a game after adding it?', a: 'Yes — go to Manage Games, find the match row, and use the edit (pencil) or delete (trash) icons on the right.' },
    ];

    const [openFaq, setOpenFaq] = useState(null);

    const handleSubmit = () => {
        if (!form.name || !form.email || !form.message) return;
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gray-900 text-white py-8">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                        <Link to="/admin/dashboard" className="hover:text-white transition">Dashboard</Link>
                        <i className='bx bx-chevron-right'></i>
                        <span className="text-white">Support</span>
                    </div>
                    <h1 className="text-3xl font-black">Support Center</h1>
                    <p className="text-gray-400 text-sm mt-1">Help, FAQs, and contact for admins</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-5xl">
                {/* Quick links */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {[
                        { icon: 'bx-edit-alt', label: 'Manage Games', path: '/admin/games', color: 'text-blue-600 bg-blue-50 border-blue-100' },
                        { icon: 'bx-bar-chart', label: 'Update Scores', path: '/admin/scores', color: 'text-green-600 bg-green-50 border-green-100' },
                        { icon: 'bx-bell', label: 'Announcements', path: '/announcements', color: 'text-orange-600 bg-orange-50 border-orange-100' },
                        { icon: 'bx-images', label: 'Media', path: '/media', color: 'text-purple-600 bg-purple-50 border-purple-100' },
                    ].map((item, i) => (
                        <Link key={i} to={item.path}>
                            <div className={`rounded-xl border p-4 text-center hover:shadow-md transition cursor-pointer ${item.color}`}>
                                <i className={`bx ${item.icon} text-2xl`}></i>
                                <p className="text-sm font-bold mt-2">{item.label}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* FAQs */}
                    <div>
                        <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                            <i className='bx bx-question-mark text-blue-600'></i> Frequently Asked Questions
                        </h2>
                        <div className="space-y-3">
                            {faqs.map((faq, i) => (
                                <motion.div
                                    key={i}
                                    className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm"
                                >
                                    <button
                                        className="w-full text-left px-5 py-4 flex items-center justify-between gap-3 hover:bg-gray-50 transition"
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    >
                                        <span className="font-semibold text-gray-900 text-sm">{faq.q}</span>
                                        <i className={`bx ${openFaq === i ? 'bx-minus' : 'bx-plus'} text-gray-400 shrink-0`}></i>
                                    </button>
                                    {openFaq === i && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="px-5 pb-4 text-sm text-gray-600 border-t border-gray-50 pt-3"
                                        >
                                            {faq.a}
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                            <i className='bx bx-envelope text-blue-600'></i> Contact Support
                        </h2>

                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
                            >
                                <div className="text-5xl mb-3">✅</div>
                                <h3 className="font-black text-green-800 text-lg">Message Sent!</h3>
                                <p className="text-green-700 text-sm mt-2">We'll get back to you at <strong>{form.email}</strong> within 24 hours.</p>
                                <button onClick={() => { setSubmitted(false); setForm({ name:'', email:'', category:'Technical Issue', subject:'', message:'' }); }}
                                    className="mt-5 text-sm text-green-700 underline">
                                    Send another message
                                </button>
                            </motion.div>
                        ) : (
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">YOUR NAME</label>
                                        <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Ahmed Khan" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">EMAIL</label>
                                        <input type="email" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="ahmed@bzu.edu.pk" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">CATEGORY</label>
                                    <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                                        <option>Technical Issue</option>
                                        <option>Score Update Problem</option>
                                        <option>Game Scheduling</option>
                                        <option>Media Upload</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">SUBJECT</label>
                                    <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Brief description of your issue" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">MESSAGE</label>
                                    <textarea rows={4} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                        placeholder="Describe your issue in detail..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
                                </div>
                                <button onClick={handleSubmit}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2">
                                    <i className='bx bx-send'></i> Send Message
                                </button>
                                <p className="text-center text-xs text-gray-400">Or email us directly at <a href="mailto:sports@bzu.edu.pk" className="text-blue-600 underline">sports@bzu.edu.pk</a></p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Support;
