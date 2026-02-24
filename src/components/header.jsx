import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import 'boxicons/css/boxicons.min.css';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const currentYear = 2026;

    // Navigation items organized by category
    const navItems = [
        { name: 'HOME', path: '/', icon: 'bx-home' },
        { name: 'GAMES', path: '/games', icon: 'bx-football' },
        { name: 'SCHEDULE', path: '/schedule', icon: 'bx-calendar' },
        { name: 'LIVE', path: '/live', icon: 'bx-video-recording', badge: 'LIVE' },
        { name: 'STANDINGS', path: '/standings', icon: 'bx-trophy' },
        { name: 'ANNOUNCEMENTS', path: '/announcements', icon: 'bx-bell' },
        { name: 'MEDIA', path: '/media', icon: 'bx-images' },
        { name: 'ABOUT', path: '/about', icon: 'bx-info-circle' },
    ];

    // Admin links (visible only to admin users - you can control this with auth context)
    const adminItems = [
        { name: 'DASHBOARD', path: '/admin/dashboard', icon: 'bx-dashboard' },
        { name: 'MANAGE GAMES', path: '/admin/games', icon: 'bx-edit-alt' },
        { name: 'SCORES', path: '/admin/scores', icon: 'bx-bar-chart' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${
            scrolled 
                ? 'bg-white/95 backdrop-blur-md shadow-md py-2' 
                : 'bg-white shadow-sm py-3'
        }`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Logo and Brand */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                                <i className='bx bx-trophy text-white text-2xl'></i>
                            </div>
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="font-bold text-gray-800 leading-tight">
                                <span className="text-lg">BZU ENGINEERING</span>
                                <br />
                                <span className="text-xs tracking-wider text-gray-500">SPORTS • {currentYear}</span>
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
                                {item.badge && (
                                    <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold animate-pulse">
                                        {item.badge}
                                    </span>
                                )}
                                {location.pathname === item.path && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-2">
                        {/* Admin Dropdown (conditionally rendered) */}
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
                                <div className="border-t border-gray-100 my-1"></div>
                                <Link
                                    to="/contact"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                >
                                    <i className='bx bx-support mr-2 text-lg align-middle'></i>
                                    SUPPORT
                                </Link>
                            </div>
                        </div>

                        {/* Register Button */}
                        <Link to="/register">
                            <button className="hidden md:flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition shadow-sm">
                                <i className='bx bx-user-plus'></i>
                                REGISTER
                            </button>
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition"
                        >
                            <i className={`bx ${isOpen ? 'bx-x' : 'bx-menu'} text-2xl`}></i>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="lg:hidden overflow-hidden"
                        >
                            <div className="pt-4 pb-3 space-y-1 border-t border-gray-100 mt-3">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition ${
                                            location.pathname === item.path
                                                ? 'text-blue-600 bg-blue-50'
                                                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                                        }`}
                                    >
                                        <i className={`bx ${item.icon} text-xl`}></i>
                                        {item.name}
                                        {item.badge && (
                                            <span className="ml-auto bg-rose-600 text-white text-[10px] px-2 py-0.5 rounded-full">
                                                {item.badge}
                                            </span>
                                        )}
                                    </Link>
                                ))}
                                <div className="border-t border-gray-100 my-2 pt-2">
                                    <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                        Admin
                                    </div>
                                    {adminItems.map((item) => (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                                        >
                                            <i className={`bx ${item.icon} text-xl`}></i>
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                                <div className="pt-2">
                                    <Link to="/register">
                                        <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-md text-sm font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2">
                                            <i className='bx bx-user-plus'></i>
                                            REGISTER NOW
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Live Indicator Bar (shows when matches are live) */}
            <AnimatePresence>
                {false && ( // Replace with actual live matches condition
                    <motion.div
                        initial={{ y: -100 }}
                        animate={{ y: 0 }}
                        exit={{ y: -100 }}
                        className="bg-gradient-to-r from-rose-600 to-red-600 text-white text-sm py-1"
                    >
                        <div className="container mx-auto px-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                <span className="font-semibold">LIVE NOW:</span>
                                <span>CE vs ME (Cricket) • EE vs CVE (Football)</span>
                            </div>
                            <Link to="/live" className="text-white/90 hover:text-white underline text-xs">
                                WATCH LIVE <i className='bx bx-right-arrow-alt'></i>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;