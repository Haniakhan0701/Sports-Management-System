// src/pages/Register.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import 'boxicons/css/boxicons.min.css';

const Register = () => {
    const [form, setForm] = useState({
        fullName: '',
        rollNumber: '',
        email: '',
        phone: '',
        department: '',
        semester: '',
        session: '',
        sports: [],        // ← now an array for multi-select
        category: '',
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const departments = [
        { code: 'CE', label: 'CE — Computer Engineering' },
        { code: 'ME', label: 'ME — Mechanical Engineering' },
        { code: 'EE', label: 'EE — Electrical Engineering' },
        { code: 'CVE', label: 'CVE — Civil Engineering' },
        { code: 'AR', label: 'AR — Architecture' },
    ];

    const semesters = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];

    const currentYear = 2026;
    const sessions = Array.from({ length: 5 }, (_, i) => {
        const start = currentYear - 4 + i;
        return `${start}-${start + 4}`;
    });

    const sports = [
        { name: 'Cricket',          icon: '🏏', detail: '11 vs 11 · 15 overs' },
        { name: 'Football',         icon: '⚽', detail: '7 vs 7 · 70 min' },
        { name: 'Tug of War',       icon: '🪢', detail: '6 vs 6 · Best of 3' },
        { name: 'Dodge Ball',       icon: '🎯', detail: '6 vs 6 · 12 min' },
        { name: '100m Race',        icon: '🏃', detail: 'Individual · Sprint' },
        { name: 'Badminton',        icon: '🏸', detail: 'Singles/Doubles · 21 pts' },
        { name: 'Bottle Spin Chase',icon: '🍾', detail: '8 per team · 12 min', isNew: true },
        { name: '4×100m Relay',     icon: '🔁', detail: '4 per team · Relay' },
    ];

    // ── Email validation ──────────────────────────────────────────
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // ── Handlers ──────────────────────────────────────────────────
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const toggleSport = (sportName) => {
        setForm(prev => ({
            ...prev,
            sports: prev.sports.includes(sportName)
                ? prev.sports.filter(s => s !== sportName)
                : [...prev.sports, sportName],
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Required text fields
        const required = ['fullName', 'rollNumber', 'email', 'phone', 'department', 'semester', 'session', 'category'];
        for (let field of required) {
            if (!form[field]) {
                setError('Please fill in all fields.');
                return;
            }
        }

        // Email format
        if (!isValidEmail(form.email)) {
            setError('Please enter a valid email address (e.g. ahmed@bzu.edu.pk).');
            return;
        }

        // At least one sport
        if (form.sports.length === 0) {
            setError('Please select at least one sport.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const res = await axios.post('http://localhost:5000/api/registrations', form);
            if (res.data.success) {
                setSuccess(true);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setSuccess(false);
        setForm({ fullName: '', rollNumber: '', email: '', phone: '', department: '', semester: '', session: '', sports: [], category: '' });
    };

    // ── Shared input className ────────────────────────────────────
    const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white";

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Hero */}
            <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white pt-20 pb-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <span className="inline-block border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium tracking-widest mb-5">
                             ATHLETE REGISTRATION · 2027
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
                            Register for <br />
                            <span className="text-cyan-300">Sports Week 2027</span>
                        </h1>
                        <p className="text-blue-100 text-lg max-w-xl mx-auto">
                            Represent your Department. Fill in your details below to officially register as an Athlete.
                        </p>
                        <div className="flex flex-wrap justify-center gap-2 mt-6">
                            {departments.map(d => (
                                <span key={d.code} className="bg-white/10 border border-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    {d.code}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400" />
            </section>

            {/* Form */}
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-2xl">

                    {/* ── Success State ── */}
                    {success ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center"
                        >
                            <div className="text-6xl mb-4">🎉</div>
                            <h2 className="text-2xl font-black text-gray-900 mb-3">You're Registered!</h2>
                            <p className="text-gray-500 mb-2">
                                Welcome to <strong>BZU Engineering Sports Week 2027</strong>.
                            </p>
                            <p className="text-gray-400 text-sm mb-8">
                                Your registration is <span className="text-orange-500 font-semibold">pending approval</span>. The sports committee will contact you via email or WhatsApp once approved.
                            </p>

                            <div className="bg-gray-50 rounded-xl p-5 text-left mb-8 space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Name</span>
                                    <span className="font-bold text-gray-900">{form.fullName || '—'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Department</span>
                                    <span className="font-bold text-gray-900">{form.department}</span>
                                </div>
                                <div className="flex justify-between items-start gap-4">
                                    <span className="text-gray-500 shrink-0">Sport(s)</span>
                                    <span className="font-bold text-gray-900 text-right">{form.sports.join(', ')} · {form.category}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Contact</span>
                                    <span className="font-bold text-gray-900">{form.phone}</span>
                                </div>
                            </div>

                            <div className="flex gap-3 justify-center flex-wrap">
                                <button onClick={resetForm} className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition">
                                    Register Another Athlete
                                </button>
                                <Link to="/" className="border border-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 transition">
                                    Go to Home
                                </Link>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                        >
                            {/* Form Header */}
                            <div className="bg-gray-900 text-white px-6 py-5 flex items-center justify-between">
                                <div>
                                    <h2 className="font-black text-lg">Athlete Registration Form</h2>
                                    <p className="text-gray-400 text-sm mt-0.5">BZU Engineering Sports Week · February 2027</p>
                                </div>
                                <span className="text-3xl">🏟️</span>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-8">

                                {/* Error Banner */}
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2"
                                    >
                                        <i className='bx bx-error-circle text-lg shrink-0'></i>
                                        {error}
                                    </motion.div>
                                )}

                                {/* ── Section 1: Personal Info ── */}
                                <div>
                                    <h3 className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-4 pb-2 border-b border-gray-100">
                                        <i className='bx bx-user text-blue-500'></i> Personal Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                                Full Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                name="fullName"
                                                value={form.fullName}
                                                onChange={handleChange}
                                                placeholder="e.g. Ahmed Khan"
                                                className={inputCls}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                                Roll Number <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                name="rollNumber"
                                                value={form.rollNumber}
                                                onChange={handleChange}
                                                placeholder="e.g. 22-CE-01"
                                                className={inputCls}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                                Phone Number <span className="text-red-500">*</span>
                                                <span className="text-xs font-normal text-gray-400 ml-1">(for WhatsApp group)</span>
                                            </label>
                                            <input
                                                name="phone"
                                                value={form.phone}
                                                onChange={handleChange}
                                                placeholder="+92 300 1234567"
                                                className={inputCls}
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                                Email Address <span className="text-red-500">*</span>
                                                <span className="text-xs font-normal text-gray-400 ml-1">(for approval notifications)</span>
                                            </label>
                                            <input
                                                name="email"
                                                type="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                placeholder="ahmed@bzu.edu.pk"
                                                className={inputCls}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* ── Section 2: Academic Info ── */}
                                <div>
                                    <h3 className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-4 pb-2 border-b border-gray-100">
                                        <i className='bx bx-building text-blue-500'></i> Academic Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="md:col-span-3">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Department <span className="text-red-500">*</span>
                                            </label>
                                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                                                {departments.map(d => (
                                                    <label
                                                        key={d.code}
                                                        className={`border rounded-xl py-3 text-center cursor-pointer transition font-bold text-sm ${
                                                            form.department === d.code
                                                                ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                                                                : 'border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-blue-50'
                                                        }`}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="department"
                                                            value={d.code}
                                                            checked={form.department === d.code}
                                                            onChange={handleChange}
                                                            className="hidden"
                                                        />
                                                        <div className="text-lg font-black">{d.code}</div>
                                                        <div className="text-xs font-normal opacity-80 mt-0.5">
                                                            {d.code === 'CE' ? 'Computer' :
                                                             d.code === 'ME' ? 'Mechanical' :
                                                             d.code === 'EE' ? 'Electrical' :
                                                             d.code === 'CVE' ? 'Civil' : 'Architecture'}
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                                Semester <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                name="semester"
                                                value={form.semester}
                                                onChange={handleChange}
                                                className={inputCls}
                                            >
                                                <option value="">Select Semester</option>
                                                {semesters.map(s => (
                                                    <option key={s} value={s}>{s} Semester</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                                Session <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                name="session"
                                                value={form.session}
                                                onChange={handleChange}
                                                className={inputCls}
                                            >
                                                <option value="">Select Session</option>
                                                {sessions.map(s => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* ── Section 3: Sport Selection ── */}
                                <div>
                                    <h3 className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-1 pb-2 border-b border-gray-100">
                                        <i className='bx bx-football text-blue-500'></i> Sport Selection
                                    </h3>
                                    <p className="text-xs text-gray-400 mb-4">You can select multiple sports.</p>

                                    {/* Sport Grid — checkbox multi-select */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Choose Sport(s) <span className="text-red-500">*</span>
                                        </label>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            {sports.map(s => {
                                                const selected = form.sports.includes(s.name);
                                                return (
                                                    <button
                                                        type="button"
                                                        key={s.name}
                                                        onClick={() => toggleSport(s.name)}
                                                        className={`relative border rounded-xl py-3 px-2 text-center cursor-pointer transition ${
                                                            selected
                                                                ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                                                                : 'border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-blue-50'
                                                        }`}
                                                    >
                                                        {s.isNew && (
                                                            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                                                                NEW
                                                            </span>
                                                        )}
                                                        {selected && (
                                                            <span className="absolute top-1.5 left-1.5 text-white text-xs">
                                                                <i className='bx bx-check-circle'></i>
                                                            </span>
                                                        )}
                                                        <div className="text-2xl">{s.icon}</div>
                                                        <div className="text-xs font-bold mt-1">{s.name}</div>
                                                        <div className={`text-[10px] mt-0.5 ${selected ? 'text-blue-100' : 'text-gray-400'}`}>
                                                            {s.detail}
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {/* Selected chips summary */}
                                        {form.sports.length > 0 && (
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {form.sports.map(s => (
                                                    <span key={s} className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                                        {s}
                                                        <button type="button" onClick={() => toggleSport(s)} className="ml-1 hover:text-red-500">×</button>
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Category */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Category <span className="text-red-500">*</span>
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {["Men's", "Women's"].map(c => (
                                                <label
                                                    key={c}
                                                    className={`border rounded-xl py-3 text-center cursor-pointer transition font-bold text-sm ${
                                                        form.category === c
                                                            ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                                                            : 'border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-blue-50'
                                                    }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="category"
                                                        value={c}
                                                        checked={form.category === c}
                                                        onChange={handleChange}
                                                        className="hidden"
                                                    />
                                                    <span className="text-xl block mb-1">{c === "Men's" ? '👨' : '👩'}</span>
                                                    {c}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-black py-4 rounded-xl transition flex items-center justify-center gap-2 text-lg shadow-lg"
                                >
                                    {loading ? (
                                        <>
                                            <i className='bx bx-loader-alt animate-spin text-xl'></i>
                                            Registering...
                                        </>
                                    ) : (
                                        <>
                                            <i className='bx bx-user-plus text-xl'></i>
                                            Register Now
                                        </>
                                    )}
                                </button>

                                <p className="text-center text-xs text-gray-400 leading-relaxed">
                                    By registering you agree to abide by BZU Sports Week rules and code of conduct. <br />
                                    Your phone number will be used to add you to the team WhatsApp group.
                                </p>
                            </form>
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Register;
