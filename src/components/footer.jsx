import { Link } from "react-router-dom";
import 'boxicons/css/boxicons.min.css';

const Footer = () => {
    const currentYear = 2026;
    const nextSportsWeek = currentYear + 1;

    const quickLinks = [
        { name: 'Games', path: '/games', icon: 'bx-football' },
        { name: 'Schedule', path: '/schedule', icon: 'bx-calendar' },
        { name: 'Live', path: '/live', icon: 'bx-video-recording' },
        { name: 'Standings', path: '/leaderboard', icon: 'bx-trophy' },
        { name: 'Announcements', path: '/announcements', icon: 'bx-bell' },
        { name: 'Media', path: '/media', icon: 'bx-images' },
    ];

    const departments = [
        { name: 'Computer Engineering', short: 'CE', path: '/teams/ce' },
        { name: 'Mechanical Engineering', short: 'ME', path: '/teams/me' },
        { name: 'Electrical Engineering', short: 'EE', path: '/teams/ee' },
        { name: 'Civil Engineering', short: 'CVE', path: '/teams/cve' },
        { name: 'Architecture', short: 'AR', path: '/teams/ar' },
    ];

    const adminLinks = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: 'bx-dashboard' },
        { name: 'Manage Games', path: '/admin/games', icon: 'bx-edit-alt' },
        { name: 'Update Scores', path: '/admin/scores', icon: 'bx-bar-chart' },
        { name: 'Announcements', path: '/admin/announcements', icon: 'bx-megaphone' },
        { name: 'Media', path: '/admin/media', icon: 'bx-images' },
        { name: 'Budget', path: '/admin/budget', icon: 'bx-credit-card' },
        { name: 'Users', path: '/admin/users', icon: 'bx-group' },
    ];

    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Main Footer */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
                    {/* Brand Column */}
                    <div className="lg:col-span-3">
                        <Link to="/" className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                                <i className='bx bx-trophy text-white text-2xl'></i>
                            </div>
                            <div>
                                <h2 className="font-bold text-white text-lg">BZU ENGINEERING</h2>
                                <p className="text-xs text-gray-400">SPORTS • {currentYear}</p>
                            </div>
                        </Link>
                        <p className="text-sm text-gray-400 mb-4">
                            The premier departmental sports championship fostering excellence, teamwork, and school spirit through competitive athletics.
                        </p>
                        <div className="flex space-x-3">
                            <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                                <i className='bx bxl-facebook text-white text-sm'></i>
                            </a>
                            <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition">
                                <i className='bx bxl-twitter text-white text-sm'></i>
                            </a>
                            <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition">
                                <i className='bx bxl-instagram text-white text-sm'></i>
                            </a>
                            <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition">
                                <i className='bx bxl-youtube text-white text-sm'></i>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2">
                        <h3 className="text-white font-semibold mb-4 text-sm tracking-wider">QUICK LINKS</h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link 
                                        to={link.path}
                                        className="text-sm text-gray-400 hover:text-white transition flex items-center gap-2"
                                    >
                                        <i className={`bx ${link.icon} text-blue-500 text-sm`}></i>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Departments */}
                    <div className="lg:col-span-2">
                        <h3 className="text-white font-semibold mb-4 text-sm tracking-wider">DEPARTMENTS</h3>
                        <ul className="space-y-2">
                            {departments.map((dept) => (
                                <li key={dept.short}>
                                    <Link 
                                        to={dept.path}
                                        className="text-sm text-gray-400 hover:text-white transition flex items-center gap-2"
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full ${
                                            dept.short === 'CE' ? 'bg-blue-500' :
                                            dept.short === 'ME' ? 'bg-amber-500' :
                                            dept.short === 'EE' ? 'bg-emerald-500' :
                                            dept.short === 'CVE' ? 'bg-slate-500' :
                                            'bg-rose-500'
                                        }`}></span>
                                        {dept.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Admin Section */}
                    <div className="lg:col-span-2">
                        <h3 className="text-white font-semibold mb-4 text-sm tracking-wider">ADMINISTRATION</h3>
                        <ul className="space-y-2">
                            {adminLinks.map((link) => (
                                <li key={link.path}>
                                    <Link 
                                        to={link.path}
                                        className="text-sm text-gray-400 hover:text-white transition flex items-center gap-2"
                                    >
                                        <i className={`bx ${link.icon} text-amber-500 text-sm`}></i>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact/Info */}
                    <div className="lg:col-span-3">
                        <h3 className="text-white font-semibold mb-4 text-sm tracking-wider">CONTACT</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <i className='bx bx-map text-blue-500 text-lg mt-0.5'></i>
                                <span className="text-sm text-gray-400">
                                    BZU Engineering Campus,<br />Multan, Pakistan
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <i className='bx bx-envelope text-blue-500 text-lg'></i>
                                <a href="mailto:sports@bzu.edu.pk" className="text-sm text-gray-400 hover:text-white transition">
                                    sports@bzu.edu.pk
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <i className='bx bx-phone text-blue-500 text-lg'></i>
                                <a href="tel:+92611234567" className="text-sm text-gray-400 hover:text-white transition">
                                    +92 61 1234567
                                </a>
                            </li>
                        </ul>

                        {/* Next Sports Week Teaser */}
                        <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                            <p className="text-xs text-gray-400 mb-1">NEXT SPORTS WEEK</p>
                            <p className="text-xl font-bold text-white">{nextSportsWeek}</p>
                            <p className="text-xs text-gray-400 mt-1">5 Departments · 12 Sports</p>
                            <Link to="/about#sports-week">
                                <button className="mt-3 text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1">
                                    LEARN MORE <i className='bx bx-right-arrow-alt'></i>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Regular Sports Frequency Bar */}
            <div className="border-t border-gray-800 bg-gray-900/50">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3 text-sm">
                            <i className='bx bx-calendar-check text-emerald-500'></i>
                            <span className="text-gray-400">
                                <span className="text-white font-medium">Regular Play:</span> Matches held every Wednesday & Saturday, weather permitting
                            </span>
                        </div>
                        <Link to="/schedule" className="text-xs text-gray-400 hover:text-white transition">
                            VIEW FULL SCHEDULE <i className='bx bx-right-arrow-alt ml-1'></i>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="border-t border-gray-800 bg-gray-950">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
                        <div className="flex items-center gap-4">
                            <span>© {currentYear} BZU Engineering Sports. All rights reserved.</span>
                            <Link to="/privacy" className="hover:text-gray-300 transition">Privacy</Link>
                            <Link to="/terms" className="hover:text-gray-300 transition">Terms</Link>
                            <Link to="/contact" className="hover:text-gray-300 transition">Contact</Link>
                        </div>
                        <div className="flex items-center gap-3">
                            <span>Designed for BZU Engineering</span>
                            <span>•</span>
                            <span>v2.0.0</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;