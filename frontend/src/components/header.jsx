import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import 'boxicons/css/boxicons.min.css';
import { useAuth } from "../context/AuthContext";
import bzuLogo from "../assets/bzu logo.png";

const API = `${import.meta.env.VITE_API_URL}/api`;

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [liveCount, setLiveCount] = useState(0);
    const location = useLocation();
    const currentYear = 2026;
    const { user, logout } = useAuth();

    // ── Fetch live match count — polls every 30s
    useEffect(() => {
        const fetchLive = async () => {
            try {
                const res = await axios.get(`${API}/matches?status=live`);
                setLiveCount((res.data.matches || []).length);
            } catch {
                // silently fail
            }
        };
        fetchLive();
        const interval = setInterval(fetchLive, 30000);
        return () => clearInterval(interval);
    }, []);

    const navItems = [
        { name: 'HOME',          path: '/',              icon: 'bx-home' },
        { name: 'GAMES',         path: '/games',         icon: 'bx-football' },
        { name: 'SCHEDULE',      path: '/schedule',      icon: 'bx-calendar' },
        { name: 'LIVE',          path: '/live',          icon: 'bx-video-recording', badge: true },
        { name: 'STANDINGS',     path: '/standings',     icon: 'bx-trophy' },
        { name: 'ANNOUNCEMENTS', path: '/announcements', icon: 'bx-bell' },
        { name: 'MEDIA',         path: '/media',         icon: 'bx-images' },
        { name: 'ABOUT',         path: '/about',         icon: 'bx-info-circle' },
    ];

    const adminItems = [
        { name: 'DASHBOARD',    path: '/admin/dashboard', icon: 'bx-dashboard' },
        { name: 'MANAGE GAMES', path: '/admin/games',     icon: 'bx-edit-alt' },
        { name: 'ANNOUNCEMENTS', path: '/admin/announcements', icon: 'bx-bell' },
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => { setIsOpen(false); }, [location]);

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${
            scrolled
                ? 'bg-white/95 backdrop-blur-md shadow-md py-2'
                : 'bg-white shadow-sm py-3'
        }`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">

                    {/* Logo */}



                   <Link to="/" className="flex items-center gap-3 group">
    <div className="relative">
        <img
            src={bzuLogo}
            alt="BZU Logo"
            className="w-14 h-14 object-contain"
        />
    </div>

    <div className="hidden sm:block">
        <h1 className="font-bold text-gray-800 leading-tight">
            <span className="text-lg">BZU ENGINEERING</span>
            <br />
            <span className="text-xs tracking-wider text-gray-500">
                SPORTS • {currentYear}
            </span>
        </h1>
    </div>
</Link>




                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors group ${
                                    location.pathname === item.path
                                        ? 'text-blue-600 bg-blue-50'
                                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                                }`}
                            >
                                <span className="flex items-center gap-1.5">
                                    <i className={`bx ${item.icon} text-lg`}></i>
                                    {item.name}
                                </span>

                                {/* ── LIVE badge — real count ── */}
                                {item.badge && (
                                    <span className={`absolute -top-1 -right-1 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                                        liveCount > 0
                                            ? 'bg-rose-600 animate-pulse'
                                            : 'bg-gray-400'
                                    }`}>
                                        {liveCount > 0 ? `${liveCount} LIVE` : 'LIVE'}
                                    </span>
                                )}

                                {location.pathname === item.path && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                                    />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Side */}
                    <div className="flex items-center gap-2">

                        {/* LOGIN / LOGOUT */}
                        {user ? (
                            <button
                                onClick={logout}
                                className="hidden md:flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition shadow-sm"
                            >
                                <i className='bx bx-log-out'></i>
                                LOGOUT
                            </button>
                        ) : (
                            <Link to="/login">
                                <button className="hidden md:flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition shadow-sm">
                                    <i className='bx bx-log-in'></i>
                                    LOGIN
                                </button>
                            </Link>
                        )}

                        {/* ADMIN SETTINGS ICON - SUPPORT LINK REMOVED */}
                        {user?.role === 'admin' && (
                            <div className="hidden md:block relative group">
                                <button className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition">
                                    <i className='bx bx-cog text-xl'></i>
                                </button>
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    {adminItems.map((item) => (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                        >
                                            <i className={`bx ${item.icon} mr-2 text-lg align-middle`}></i>
                                            {item.name}
                                        </Link>
                                    ))}
                                    {/* SUPPORT LINK COMPLETELY REMOVED */}
                                </div>
                            </div>
                        )}

                        {/* Register */}
                        <Link to="/register">
                            <button className="hidden md:flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition shadow-sm">
                                <i className='bx bx-user-plus'></i>
                                REGISTER
                            </button>
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition"
                        >
                            <i className={`bx ${isOpen ? 'bx-x' : 'bx-menu'} text-2xl`}></i>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity:0, height:0 }}
                            animate={{ opacity:1, height:'auto' }}
                            exit={{ opacity:0, height:0 }}
                            className="lg:hidden overflow-hidden"
                        >
                            <div className="pt-4 pb-3 space-y-1 border-t border-gray-100 mt-3">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                                    >
                                        <i className={`bx ${item.icon} text-xl`}></i>
                                        {item.name}
                                        {/* Mobile LIVE badge */}
                                        {item.badge && liveCount > 0 && (
                                            <span className="bg-rose-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold animate-pulse ml-auto">
                                                {liveCount} LIVE
                                            </span>
                                        )}
                                    </Link>
                                ))}

                                {/* Mobile admin links - SUPPORT REMOVED */}
                                {user?.role === 'admin' && (
                                    <>
                                        <div className="border-t border-gray-100 pt-2 mt-2">
                                            {adminItems.map((item) => (
                                                <Link key={item.path} to={item.path}
                                                    className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-blue-600 hover:bg-blue-50">
                                                    <i className={`bx ${item.icon} text-xl`}></i>
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </>
                                )}

                                <div className="pt-2 flex gap-2">
                                    <Link to="/register" className="flex-1">
                                        <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-md text-sm font-medium">
                                            REGISTER NOW
                                        </button>
                                    </Link>
                                    {user && (
                                        <button onClick={logout}
                                            className="bg-red-500 text-white px-4 py-3 rounded-md text-sm font-medium">
                                            LOGOUT
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default Header;