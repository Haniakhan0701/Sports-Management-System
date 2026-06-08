// src/pages/Media.jsx - Professional University Sports Media Portal
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import 'boxicons/css/boxicons.min.css';

const Media = () => {
    const [selectedDept, setSelectedDept] = useState('all');
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [showLightbox, setShowLightbox] = useState(false);
    const [showVideoModal, setShowVideoModal] = useState(false);

    // Department configuration with colors and branding
    const departments = [
        { id: 'all', name: 'All Departments', icon: 'bx-collection', color: 'slate', bgColor: 'bg-slate-600', accentColor: 'slate' },
        { id: 'ce', name: 'Computer Engineering', shortName: 'CE', icon: 'bx-laptop', color: 'blue', bgColor: 'bg-blue-600', accentColor: 'blue' },
        { id: 'me', name: 'Mechanical Engineering', shortName: 'ME', icon: 'bx-cog', color: 'amber', bgColor: 'bg-amber-600', accentColor: 'amber' },
        { id: 'ee', name: 'Electrical Engineering', shortName: 'EE', icon: 'bx-bolt-circle', color: 'yellow', bgColor: 'bg-yellow-500', accentColor: 'yellow' },
        { id: 'cve', name: 'Civil Engineering', shortName: 'CVE', icon: 'bx-building-house', color: 'emerald', bgColor: 'bg-emerald-600', accentColor: 'emerald' },
        { id: 'ar', name: 'Architecture', shortName: 'AR', icon: 'bx-pen-tool', color: 'rose', bgColor: 'bg-rose-600', accentColor: 'rose' }
    ];

    // Featured Athletes / Stars of Sports Week
    const featuredAthletes = [
        {
            id: 1,
            name: "Ahmed Hassan",
            dept: "CE",
            sport: "Cricket",
            achievement: "Player of the Tournament",
            stats: "342 runs, 12 wickets",
            image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
        },
        {
            id: 2,
            name: "Fatima Ali",
            dept: "EE",
            sport: "Football",
            achievement: "Top Scorer",
            stats: "8 goals in 5 matches",
            image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
        },
        {
            id: 3,
            name: "Hassan Raza",
            dept: "ME",
            sport: "Athletics",
            achievement: "Gold Medalist",
            stats: "100m & 200m Champion",
            image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
        },
        {
            id: 4,
            name: "Sara Khan",
            dept: "AR",
            sport: "Basketball",
            achievement: "MVP Finals",
            stats: "28 pts, 12 reb per game",
            image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
        }
    ];

    // Department-specific photos
    const photos = [
        {
            id: 1,
            title: "CE Cricket Team Championship Victory",
            description: "CE captain lifting the Sports Week trophy after defeating ME in the final",
            image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
            sport: "cricket", dept: "ce", date: "2026-02-08", photographer: "Ali Raza", likes: 567, views: 3245, featured: true
        },
        {
            id: 2,
            title: "CE Basketball Team in Action",
            description: "CE vs AR semi-final intense gameplay",
            image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
            sport: "basketball", dept: "ce", date: "2026-02-09", photographer: "Hamza Ali", likes: 234, views: 1456, featured: false
        },
        {
            id: 3,
            title: "ME Cricket Team Bowling Attack",
            description: "ME fast bowler delivering a crucial over in the final",
            image: "https://images.unsplash.com/photo-1589802089446-9a4f5a4697b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1589802089446-9a4f5a4697b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
            sport: "cricket", dept: "me", date: "2026-02-08", photographer: "Sara Khan", likes: 312, views: 1876, featured: true
        },
        {
            id: 4,
            title: "ME Football Team Training",
            description: "ME team practicing penalty kicks before the tournament",
            image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
            sport: "football", dept: "me", date: "2026-02-06", photographer: "Bilal Ahmed", likes: 189, views: 987, featured: false
        },
        {
            id: 5,
            title: "EE Women's Football Victory",
            description: "EE women's football team celebrating their semi-final win",
            image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
            sport: "football", dept: "ee", date: "2026-02-07", photographer: "Fatima Zafar", likes: 445, views: 2341, featured: true
        },
        {
            id: 6,
            title: "EE Volleyball Team Spike",
            description: "EE setter executing a perfect spike during quarter-finals",
            image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
            sport: "volleyball", dept: "ee", date: "2026-02-09", photographer: "Usman Chaudhry", likes: 267, views: 1234, featured: false
        },
        {
            id: 7,
            title: "CVE Athletics Sprint Finish",
            description: "CVE sprinter crossing the finish line in 100m finals",
            image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
            sport: "athletics", dept: "cve", date: "2026-02-09", photographer: "Ali Raza", likes: 198, views: 1098, featured: true
        },
        {
            id: 8,
            title: "CVE Football Defense",
            description: "CVE goalkeeper making a crucial save in penalty shootout",
            image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
            sport: "football", dept: "cve", date: "2026-02-07", photographer: "Hamza Ali", likes: 156, views: 876, featured: false
        },
        {
            id: 9,
            title: "AR Basketball Championship",
            description: "AR team celebrating their victory in the basketball tournament",
            image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
            sport: "basketball", dept: "ar", date: "2026-02-10", photographer: "Sara Khan", likes: 389, views: 2156, featured: true
        },
        {
            id: 10,
            title: "AR Badminton Doubles",
            description: "AR doubles pair in action during inter-department tournament",
            image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
            sport: "badminton", dept: "ar", date: "2026-02-08", photographer: "Bilal Ahmed", likes: 134, views: 765, featured: false
        },
        {
            id: 11,
            title: "Sports Week Opening Ceremony",
            description: "Vice Chancellor lighting the ceremonial torch at Main Ground",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
            sport: "ceremony", dept: "all", date: "2026-02-08", photographer: "Fatima Zafar", likes: 678, views: 4567, featured: true
        },
        {
            id: 12,
            title: "Prize Distribution Ceremony",
            description: "Champions receiving trophies at the closing ceremony",
            image: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
            sport: "ceremony", dept: "all", date: "2026-02-12", photographer: "Ali Raza", likes: 523, views: 3456, featured: true
        }
    ];

    // Department-specific videos
    const videos = [
        {
            id: 101,
            title: "CE vs ME Cricket Final - Full Highlights",
            description: "Complete highlights from the thrilling cricket final where CE clinched the championship",
            thumbnail: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            videoUrl: "https://www.youtube.com/embed/EB7D9QAKOWg",
            duration: "12:34", sport: "cricket", dept: "ce", date: "2026-02-08", views: 5678, likes: 789, featured: true
        },
        {
            id: 102,
            title: "EE Women's Football - Road to Finals",
            description: "Documentary-style highlights of EE women's football team journey",
            thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            videoUrl: "https://www.youtube.com/embed/EB7D9QAKOWg",
            duration: "08:45", sport: "football", dept: "ee", date: "2026-02-08", views: 3456, likes: 456, featured: true
        },
        {
            id: 103,
            title: "ME Athletics - Record Breaking Performances",
            description: "ME athletes breaking multiple track and field records",
            thumbnail: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            videoUrl: "https://www.youtube.com/embed/EB7D9QAKOWg",
            duration: "06:22", sport: "athletics", dept: "me", date: "2026-02-09", views: 2345, likes: 345, featured: false
        },
        {
            id: 104,
            title: "AR Basketball Championship Highlights",
            description: "Best plays and dunks from AR's championship run",
            thumbnail: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            videoUrl: "https://www.youtube.com/embed/EB7D9QAKOWg",
            duration: "09:15", sport: "basketball", dept: "ar", date: "2026-02-10", views: 2876, likes: 398, featured: true
        },
        {
            id: 105,
            title: "CVE Volleyball Semi-Final Thriller",
            description: "Epic 5-set volleyball match featuring CVE",
            thumbnail: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            videoUrl: "https://www.youtube.com/embed/EB7D9QAKOWg",
            duration: "11:30", sport: "volleyball", dept: "cve", date: "2026-02-09", views: 1987, likes: 267, featured: false
        },
        {
            id: 106,
            title: "Sports Week 2026 - Official Highlights",
            description: "Complete recap of all sports events from opening to closing ceremony",
            thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            videoUrl: "https://www.youtube.com/embed/EB7D9QAKOWg",
            duration: "15:00", sport: "ceremony", dept: "all", date: "2026-02-12", views: 8765, likes: 1234, featured: true
        }
    ];

    // Department filter helper
    const matchesDept = (item) => {
        if (selectedDept === 'all') return true;
        return item.dept === selectedDept || item.dept === 'all';
    };

    // Filtered sets (department filter only)
    const filteredPhotos = photos.filter(p => matchesDept(p));
    const filteredVideos = videos.filter(v => matchesDept(v));

    // Department click handler
    const handleDeptClick = (deptId) => {
        setSelectedDept(deptId);
    };

    // Close modals on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setShowLightbox(false);
                setShowVideoModal(false);
            }
            if (e.key === 'ArrowRight' && showLightbox) navigateImage('next');
            if (e.key === 'ArrowLeft' && showLightbox) navigateImage('prev');
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [showLightbox, selectedImage]);

    // Lightbox navigation
    const navigateImage = (direction) => {
        const currentIndex = filteredPhotos.findIndex(p => p.id === selectedImage?.id);
        if (currentIndex === -1) return;
        let newIndex;
        if (direction === 'next') {
            newIndex = currentIndex + 1 >= filteredPhotos.length ? 0 : currentIndex + 1;
        } else {
            newIndex = currentIndex - 1 < 0 ? filteredPhotos.length - 1 : currentIndex - 1;
        }
        setSelectedImage(filteredPhotos[newIndex]);
    };

    const getDeptName = (deptId) => {
        const dept = departments.find(d => d.id === deptId);
        return dept ? dept.shortName || dept.name : deptId;
    };

    const placeholderImage = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";

    // Media Card Component
    const MediaCard = ({ item, dept }) => {
        const [imageError, setImageError] = useState(false);
        const displayImage = imageError ? placeholderImage : (item.thumbnail || item.image || placeholderImage);

        const handleClick = () => {
            if (item.mediaType === 'photo') { setSelectedImage(item); setShowLightbox(true); }
            else { setSelectedVideo(item); setShowVideoModal(true); }
        };

        return (
            <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer group"
                onClick={handleClick}
            >
                <div className="relative h-48">
                    <img
                        src={displayImage}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={() => setImageError(true)}
                    />
                    {item.mediaType === 'video' && (
                        <>
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                                    <i className='bx bx-play text-white text-2xl'></i>
                                </div>
                            </div>
                            <span className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                                {item.duration || ''}
                            </span>
                        </>
                    )}
                    {item.featured && (
                        <span className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-0.5 rounded text-xs font-bold">FEATURED</span>
                    )}
                    <span className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold ${dept.bgColor} text-white`}>
                        {dept.shortName}
                    </span>
                </div>
                <div className="p-4">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{item.sport}</span>
                    <h3 className="font-bold text-gray-800 mt-1 line-clamp-1">{item.title}</h3>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                        <span><i className='bx bx-show mr-1'></i>{item.views?.toLocaleString()}</span>
                        <span><i className='bx bx-heart mr-1'></i>{item.likes}</span>
                    </div>
                </div>
            </motion.div>
        );
    };

    // Determine which department sections to render
    const deptSectionsToShow = departments.filter(d =>
        d.id !== 'all' && (selectedDept === 'all' || selectedDept === d.id)
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero */}
            <section className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white pt-24 pb-28 overflow-hidden">
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-4">
                            SPORTS MEDIA CENTER
                        </span>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-4 tracking-tight">
                            Sports Week <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">2026</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
                            Professional coverage of all department sports events, highlights, and championship moments
                        </p>
                    </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            </section>

            {/* Sticky Filter Bar */}
            <section className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap items-center gap-2 py-3" role="tablist" aria-label="Department filters">
                        {/* All button */}
                        <button
                            role="tab"
                            aria-selected={selectedDept === 'all'}
                            onClick={() => handleDeptClick('all')}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 ${
                                selectedDept === 'all'
                                    ? 'bg-slate-700 text-white shadow-lg scale-105'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            <i className='bx bx-collection'></i>
                            <span>All</span>
                        </button>

                        {/* Individual dept buttons */}
                        {departments.filter(d => d.id !== 'all').map(dept => (
                            <button
                                key={dept.id}
                                role="tab"
                                aria-selected={selectedDept === dept.id}
                                onClick={() => handleDeptClick(dept.id)}
                                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 ${
                                    selectedDept === dept.id
                                        ? `${dept.bgColor} text-white shadow-lg scale-105`
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                <i className={`bx ${dept.icon}`}></i>
                                <span>{dept.shortName}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stars of Sports Week */}
            <section className="py-10 bg-white">
                <div className="container mx-auto px-4">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <i className='bx bx-trophy text-yellow-500'></i>
                            Stars of Sports Week
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">Top performers and MVPs from all departments</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {featuredAthletes.map((athlete, index) => {
                            const dept = departments.find(d => d.id === athlete.dept.toLowerCase()) || departments[0];
                            return (
                                <motion.div
                                    key={athlete.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer"
                                >
                                    <div className="aspect-[3/4] relative">
                                        <img src={athlete.image} alt={athlete.name} className="w-full h-full object-cover" loading="lazy" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                                        <div className="absolute top-3 right-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${dept.bgColor} text-white`}>{dept.shortName}</span>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                            <h3 className="font-bold text-lg">{athlete.name}</h3>
                                            <p className="text-sm text-gray-300">{athlete.sport}</p>
                                            <div className="mt-2 space-y-1">
                                                <p className="text-xs text-yellow-400 font-semibold"><i className='bx bx-medal mr-1'></i>{athlete.achievement}</p>
                                                <p className="text-xs text-gray-400">{athlete.stats}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Department Clusters */}
            <div>
                {deptSectionsToShow.map((dept) => {
                    const deptPhotos = photos.filter(p => p.dept === dept.id);
                    const deptVideos = videos.filter(v => v.dept === dept.id);

                    // Include ceremony items only when showing all departments
                    const ceremonyPhotos = selectedDept === 'all'
                        ? photos.filter(p => p.dept === 'all')
                        : [];
                    const ceremonyVideos = selectedDept === 'all'
                        ? videos.filter(v => v.dept === 'all')
                        : [];

                    const allMedia = [
                        ...deptPhotos.map(p => ({ ...p, mediaType: 'photo' })),
                        ...deptVideos.map(v => ({ ...v, mediaType: 'video' })),
                        // Attach ceremony items only once (to the first dept when showing all)
                        ...(dept.id === departments.find(d => d.id !== 'all')?.id && selectedDept === 'all'
                            ? [
                                ...ceremonyPhotos.map(p => ({ ...p, mediaType: 'photo' })),
                                ...ceremonyVideos.map(v => ({ ...v, mediaType: 'video' }))
                              ]
                            : [])
                    ];

                    if (allMedia.length === 0) return null;

                    return (
                        <motion.section
                            key={dept.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35 }}
                            className="py-8 border-t border-gray-200 bg-white"
                        >
                            <div className="container mx-auto px-4">
                                {/* Department cluster header */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`w-12 h-12 rounded-xl ${dept.bgColor} flex items-center justify-center shadow-md`}>
                                        <i className={`bx ${dept.icon} text-white text-2xl`}></i>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">{dept.name}</h2>
                                        <p className="text-sm text-gray-500">
                                            {deptPhotos.length} photo{deptPhotos.length !== 1 ? 's' : ''} &bull; {deptVideos.length} video{deptVideos.length !== 1 ? 's' : ''}
                                        </p>
                                    </div>
                                    {/* Quick-filter badge */}
                                    {selectedDept === 'all' && (
                                        <button
                                            onClick={() => handleDeptClick(dept.id)}
                                            className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold ${dept.bgColor} text-white hover:opacity-90 transition`}
                                        >
                                            View only {dept.shortName} →
                                        </button>
                                    )}
                                </div>

                                {/* Media grid for this department */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {allMedia.map((item) => {
                                        const itemDept = departments.find(d => d.id === item.dept) || dept;
                                        return (
                                            <MediaCard
                                                key={`${item.mediaType}-${item.id}`}
                                                item={item}
                                                dept={itemDept}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.section>
                    );
                })}
            </div>

            {/* Image Lightbox */}
            <AnimatePresence>
                {showLightbox && selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                        onClick={() => setShowLightbox(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="relative max-w-6xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button onClick={() => setShowLightbox(false)} className="absolute -top-12 right-0 text-white hover:text-gray-300 transition z-10">
                                <i className='bx bx-x text-4xl'></i>
                            </button>
                            <img src={selectedImage.image} alt={selectedImage.title} className="w-full max-h-[75vh] object-contain rounded-lg" />
                            <button onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 text-white bg-black/50 p-3 rounded-full hover:bg-black/70 transition">
                                <i className='bx bx-chevron-left text-3xl'></i>
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); navigateImage('next'); }} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 text-white bg-black/50 p-3 rounded-full hover:bg-black/70 transition">
                                <i className='bx bx-chevron-right text-3xl'></i>
                            </button>
                            <div className="mt-4 text-white">
                                <div className="flex items-start justify-between gap-4 flex-wrap">
                                    <div>
                                        <h3 className="text-xl font-bold">{selectedImage.title}</h3>
                                        <p className="text-gray-400 text-sm mt-1">{selectedImage.description}</p>
                                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                                            <span><i className='bx bx-camera mr-1'></i>{selectedImage.photographer}</span>
                                            <span><i className='bx bx-calendar mr-1'></i>{new Date(selectedImage.date).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm">
                                        <span className="text-pink-400"><i className='bx bx-heart mr-1'></i>{selectedImage.likes}</span>
                                        <span className="text-blue-400"><i className='bx bx-show mr-1'></i>{selectedImage.views}</span>
                                    </div>
                                </div>
                                <p className="text-center text-gray-500 text-sm mt-3">
                                    {filteredPhotos.findIndex(p => p.id === selectedImage.id) + 1} / {filteredPhotos.length}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Video Modal */}
            <AnimatePresence>
                {showVideoModal && selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                        onClick={() => setShowVideoModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="relative max-w-4xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button onClick={() => setShowVideoModal(false)} className="absolute -top-12 right-0 text-white hover:text-gray-300 transition z-10">
                                <i className='bx bx-x text-4xl'></i>
                            </button>
                            <div className="relative w-full rounded-xl overflow-hidden bg-black" style={{ paddingTop: '56.25%' }}>
                                <iframe
                                    src={selectedVideo.videoUrl}
                                    title={selectedVideo.title}
                                    className="absolute inset-0 w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                            <div className="mt-4 text-white">
                                <div className="flex items-start justify-between gap-4 flex-wrap">
                                    <div>
                                        <h3 className="text-xl font-bold">{selectedVideo.title}</h3>
                                        <p className="text-gray-400 text-sm mt-1">{selectedVideo.description}</p>
                                        <p className="text-gray-500 text-xs mt-1">
                                            <i className='bx bx-calendar mr-1'></i>{new Date(selectedVideo.date).toLocaleDateString()}
                                            <span className="mx-2">•</span>
                                            <i className='bx bx-time mr-1'></i>{selectedVideo.duration}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm">
                                        <span className="text-blue-400"><i className='bx bx-show mr-1'></i>{selectedVideo.views.toLocaleString()}</span>
                                        <span className="text-pink-400"><i className='bx bx-heart mr-1'></i>{selectedVideo.likes}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer */}
            <section className="py-6 bg-slate-900 text-white text-center text-sm">
                <div className="container mx-auto px-4">
                    <p className="text-gray-400">
                        © 2026 Sports Media Center • All rights reserved • For media inquiries, contact sports.committee@university.edu
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Media;