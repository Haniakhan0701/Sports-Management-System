// src/components/AnnouncementPopup.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "http://localhost:5000/api";

const AnnouncementPopup = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [dismissedIds, setDismissedIds] = useState([]);

    // Fetch announcements every minute
    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const res = await axios.get(`${API}/announcements`);
                let newAnnouncements = res.data.announcements || res.data || [];
                
                // Sort: pinned first, then by newest
                newAnnouncements.sort((a, b) => {
                    if (a.pinned && !b.pinned) return -1;
                    if (!a.pinned && b.pinned) return 1;
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
                
                // Filter out dismissed ones
                newAnnouncements = newAnnouncements.filter(a => !dismissedIds.includes(a._id));
                
                setAnnouncements(newAnnouncements);
                
                // Show popup if there are announcements
                if (newAnnouncements.length > 0 && !showPopup) {
                    setShowPopup(true);
                }
            } catch (error) {
                console.error("Failed to fetch popup announcements:", error);
            }
        };
        
        fetchAnnouncements();
        const interval = setInterval(fetchAnnouncements, 60000);
        return () => clearInterval(interval);
    }, [dismissedIds]);

    const handleDismiss = (id) => {
        setDismissedIds(prev => [...prev, id]);
        if (currentIndex + 1 < announcements.length) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setShowPopup(false);
            setCurrentIndex(0);
        }
    };

    const handleClose = () => {
        setShowPopup(false);
        setCurrentIndex(0);
    };

    const currentAnnouncement = announcements[currentIndex];
    const hasMore = currentIndex + 1 < announcements.length;

    // Colors based on announcement type (matching your backend model)
    const typeColors = {
        IMPORTANT: { border: 'border-red-500', bg: 'bg-red-50', text: 'text-red-700', icon: 'bx-bell', label: 'IMPORTANT' },
        INFO: { border: 'border-blue-500', bg: 'bg-blue-50', text: 'text-blue-700', icon: 'bx-info-circle', label: 'INFORMATION' },
        MATCH: { border: 'border-green-500', bg: 'bg-green-50', text: 'text-green-700', icon: 'bx-trophy', label: 'MATCH UPDATE' },
        GENERAL: { border: 'border-gray-500', bg: 'bg-gray-50', text: 'text-gray-700', icon: 'bx-megaphone', label: 'ANNOUNCEMENT' }
    };

    if (!showPopup || !currentAnnouncement) return null;

    const colors = typeColors[currentAnnouncement.type] || typeColors.GENERAL;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm"
                onClick={handleClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className={`max-w-lg w-full bg-white rounded-2xl shadow-2xl overflow-hidden border-l-8 ${colors.border}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className={`${colors.bg} px-6 py-4 flex justify-between items-center`}>
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colors.text} bg-white`}>
                                <i className={`bx ${colors.icon} text-xl`}></i>
                            </div>
                            <div>
                                <h3 className={`font-bold ${colors.text}`}>
                                    {colors.label}
                                </h3>
                                {currentAnnouncement.pinned && (
                                    <span className="text-xs text-amber-600 flex items-center gap-1">
                                        <i className='bx bxs-pin'></i> Pinned
                                    </span>
                                )}
                            </div>
                        </div>
                        <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
                            <i className='bx bx-x text-2xl'></i>
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-3">{currentAnnouncement.title}</h2>
                        <p className="text-gray-600 mb-4 leading-relaxed">{currentAnnouncement.body}</p>
                        
                        {/* Meta info */}
                        <div className="flex flex-wrap gap-2 mb-4 text-sm">
                            {currentAnnouncement.category && (
                                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full flex items-center gap-1">
                                    <i className='bx bx-category'></i>
                                    {currentAnnouncement.category}
                                </span>
                            )}
                            {currentAnnouncement.departments && currentAnnouncement.departments.length > 0 && !currentAnnouncement.departments.includes('All') && (
                                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full flex items-center gap-1">
                                    <i className='bx bx-building'></i>
                                    {currentAnnouncement.departments.join(', ')}
                                </span>
                            )}
                            {currentAnnouncement.createdAt && (
                                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full flex items-center gap-1 text-xs">
                                    <i className='bx bx-calendar'></i>
                                    {new Date(currentAnnouncement.createdAt).toLocaleDateString()}
                                </span>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-4">
                            {currentAnnouncement.link && (
                                <Link
                                    to={currentAnnouncement.link}
                                    onClick={handleClose}
                                    className={`flex-1 text-center px-4 py-2.5 rounded-lg font-medium transition ${colors.bg} ${colors.text} hover:opacity-80`}
                                >
                                    {currentAnnouncement.linkText || 'View Details'}
                                    <i className='bx bx-right-arrow-alt ml-2'></i>
                                </Link>
                            )}
                            <button
                                onClick={() => handleDismiss(currentAnnouncement._id)}
                                className="flex-1 px-4 py-2.5 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                            >
                                {hasMore ? 'Next →' : 'Close'}
                            </button>
                        </div>

                        {/* Progress indicator */}
                        {announcements.length > 1 && (
                            <div className="mt-4 text-center text-xs text-gray-400">
                                {currentIndex + 1} of {announcements.length}
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AnnouncementPopup;