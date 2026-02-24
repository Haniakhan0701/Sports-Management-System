// src/pages/Media.jsx
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import 'boxicons/css/boxicons.min.css';

const Media = () => {
    const [selectedAlbum, setSelectedAlbum] = useState('all');
    const [selectedSport, setSelectedSport] = useState('all');
    const [selectedType, setSelectedType] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [showLightbox, setShowLightbox] = useState(false);
    const [showVideoModal, setShowVideoModal] = useState(false);

    const currentYear = 2026;

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

    // Media types
    const mediaTypes = [
        { id: 'all', name: 'All Media', icon: 'bx-collection' },
        { id: 'photos', name: 'Photos', icon: 'bx-image', color: 'blue' },
        { id: 'videos', name: 'Videos', icon: 'bx-video', color: 'red' },
        { id: 'highlights', name: 'Highlights', icon: 'bx-camera-movie', color: 'purple' }
    ];

    // Sports for filtering
    const sports = [
        { id: 'all', name: 'All Sports', icon: '🏆' },
        { id: 'cricket', name: 'Cricket', icon: '🏏' },
        { id: 'football', name: 'Football', icon: '⚽' },
        { id: 'basketball', name: 'Basketball', icon: '🏀' },
        { id: 'volleyball', name: 'Volleyball', icon: '🏐' },
        { id: 'badminton', name: 'Badminton', icon: '🏸' },
        { id: 'athletics', name: 'Athletics', icon: '🏃' },
        { id: 'tug-of-war', name: 'Tug of War', icon: '🪢' },
        { id: 'dodge-ball', name: 'Dodge Ball', icon: '🎯' },
        { id: 'ceremony', name: 'Ceremonies', icon: '🎉' }
    ];

    // Albums/Categories
    const albums = [
        { id: 'all', name: 'All Albums' },
        { id: 'sports-week-2026', name: 'Sports Week 2026', count: 45, cover: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 'cricket-finals', name: 'Cricket Finals', count: 23, cover: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 'football-tournament', name: 'Football Tournament', count: 31, cover: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 'opening-ceremony', name: 'Opening Ceremony', count: 18, cover: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 'athletics-day', name: 'Athletics Day', count: 27, cover: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 'prize-distribution', name: 'Prize Distribution', count: 15, cover: 'https://images.unsplash.com/photo-1591946614720-90a587da4a36?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' }
    ];

    // Sample Photos Data
    const photos = [
        {
            id: 1,
            title: "CE vs ME Cricket Final - Toss",
            description: "CE captain winning the toss against ME in the thrilling final match",
            image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
            sport: "cricket",
            album: "cricket-finals",
            date: "2026-02-08",
            photographer: "Ali Raza",
            likes: 234,
            views: 1245,
            downloads: 56,
            tags: ["cricket", "final", "toss", "CE", "ME"],
            featured: true
        },
        {
            id: 2,
            title: "CE Batsman Hit Six",
            description: "CE batsman hitting a massive six during the final overs",
            image: "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
            sport: "cricket",
            album: "cricket-finals",
            date: "2026-02-08",
            photographer: "Sara Khan",
            likes: 189,
            views: 987,
            downloads: 43,
            featured: false
        },
        {
            id: 3,
            title: "ME Bowler Celebration",
            description: "ME bowler taking a crucial wicket",
            image: "https://images.unsplash.com/photo-1589802089446-9a4f5a4697b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1589802089446-9a4f5a4697b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
            sport: "cricket",
            album: "cricket-finals",
            date: "2026-02-08",
            photographer: "Ali Raza",
            likes: 145,
            views: 765,
            downloads: 32,
            featured: false
        },
        {
            id: 4,
            title: "EE vs CVE Football Match",
            description: "Intense action during the women's football semi-final",
            image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
            sport: "football",
            album: "football-tournament",
            date: "2026-02-07",
            photographer: "Bilal Ahmed",
            likes: 312,
            views: 1567,
            downloads: 78,
            featured: true
        },
        {
            id: 5,
            title: "Goal Celebration",
            description: "EE team celebrating their winning goal",
            image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
            sport: "football",
            album: "football-tournament",
            date: "2026-02-07",
            photographer: "Bilal Ahmed",
            likes: 267,
            views: 1342,
            downloads: 65,
            featured: false
        },
        {
            id: 6,
            title: "Vice Chancellor Inaugurates Sports Week",
            description: "Vice Chancellor lighting the ceremonial torch",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
            sport: "ceremony",
            album: "opening-ceremony",
            date: "2026-02-08",
            photographer: "Fatima Zafar",
            likes: 456,
            views: 2345,
            downloads: 123,
            featured: true
        },
        {
            id: 7,
            title: "March Past - CE Department",
            description: "Computer Engineering department's impressive march past",
            image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
            sport: "ceremony",
            album: "opening-ceremony",
            date: "2026-02-08",
            photographer: "Fatima Zafar",
            likes: 234,
            views: 1243,
            downloads: 67,
            featured: false
        },
        {
            id: 8,
            title: "100m Race Finals",
            description: "Close finish in the men's 100m race",
            image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
            sport: "athletics",
            album: "athletics-day",
            date: "2026-02-09",
            photographer: "Usman Chaudhry",
            likes: 189,
            views: 987,
            downloads: 45,
            featured: false
        },
        {
            id: 9,
            title: "High Jump Competition",
            description: "CE athlete clearing 1.8m in high jump",
            image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
            sport: "athletics",
            album: "athletics-day",
            date: "2026-02-09",
            photographer: "Usman Chaudhry",
            likes: 156,
            views: 876,
            downloads: 34,
            featured: true
        },
        {
            id: 10,
            title: "Basketball Semi Final",
            description: "AR vs CE intense basketball action",
            image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
            sport: "basketball",
            album: "sports-week-2026",
            date: "2026-02-09",
            photographer: "Hamza Ali",
            likes: 201,
            views: 1098,
            downloads: 52,
            featured: false
        },
        {
            id: 11,
            title: "CE Team With Trophy",
            description: "Computer Engineering department with the champions trophy",
            image: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
            sport: "ceremony",
            album: "prize-distribution",
            date: "2026-02-12",
            photographer: "Fatima Zafar",
            likes: 567,
            views: 3456,
            downloads: 234,
            featured: true
        },
        {
            id: 12,
            title: "Best Player Award",
            description: "CE captain receiving Best Player award",
            image: "https://images.unsplash.com/photo-1626280356901-8b29d5c0e2f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1626280356901-8b29d5c0e2f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
            sport: "ceremony",
            album: "prize-distribution",
            date: "2026-02-12",
            photographer: "Fatima Zafar",
            likes: 345,
            views: 2134,
            downloads: 98,
            featured: false
        }
    ];

    // Sample Videos Data
    const videos = [
        {
            id: 101,
            title: "Cricket Final: CE vs ME - Full Match Highlights",
            description: "All the action from the thrilling cricket final where CE defeated ME by 45 runs",
            thumbnail: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            duration: "12:34",
            sport: "cricket",
            type: "highlights",
            date: "2026-02-08",
            views: 3456,
            likes: 567,
            comments: 89,
            featured: true
        },
        {
            id: 102,
            title: "Women's Football: EE vs CVE - Semi Final",
            description: "Complete highlights of the women's football semi-final match",
            thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            duration: "15:21",
            sport: "football",
            type: "full-match",
            date: "2026-02-07",
            views: 2345,
            likes: 345,
            comments: 56,
            featured: false
        },
        {
            id: 103,
            title: "Opening Ceremony Highlights",
            description: "March past, torch lighting, and performances",
            thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            duration: "08:45",
            sport: "ceremony",
            type: "highlights",
            date: "2026-02-08",
            views: 4567,
            likes: 678,
            comments: 123,
            featured: true
        },
        {
            id: 104,
            title: "Basketball: AR vs CE - Best Moments",
            description: "Top 10 plays from the basketball semi-final",
            thumbnail: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            duration: "06:18",
            sport: "basketball",
            type: "highlights",
            date: "2026-02-09",
            views: 1876,
            likes: 234,
            comments: 45,
            featured: false
        },
        {
            id: 105,
            title: "100m Race Final - Finish Line Camera",
            description: "The closest finish in BZU sports history",
            thumbnail: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            duration: "03:22",
            sport: "athletics",
            type: "highlight",
            date: "2026-02-09",
            views: 2987,
            likes: 456,
            comments: 67,
            featured: true
        }
    ];

    // Filter photos
    const filteredPhotos = photos.filter(photo => {
        if (selectedAlbum !== 'all' && photo.album !== selectedAlbum) return false;
        if (selectedSport !== 'all' && photo.sport !== selectedSport) return false;
        if (searchQuery && !photo.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !photo.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    // Filter videos
    const filteredVideos = videos.filter(video => {
        if (selectedSport !== 'all' && video.sport !== selectedSport) return false;
        if (selectedType !== 'all' && selectedType !== 'videos' && video.type !== selectedType) return false;
        if (searchQuery && !video.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !video.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    const featuredPhotos = photos.filter(p => p.featured);
    const featuredVideos = videos.filter(v => v.featured);

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

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-purple-800 to-pink-900 text-white pt-20 pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <span className="inline-block border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium tracking-wide mb-5">
                             MEDIA GALLERY
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                            Moments That <br />Matter
                        </h1>
                        <p className="text-lg text-gray-200 max-w-2xl mx-auto">
                            Relive the excitement through photos and videos from all sports events, ceremonies, and celebrations.
                        </p>
                    </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400"></div>
            </section>

            {/* Media Type Tabs */}
            <section className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-2">
                        <div className="flex flex-wrap gap-1">
                            {mediaTypes.map(type => (
                                <button
                                    key={type.id}
                                    onClick={() => setSelectedType(type.id)}
                                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                                        selectedType === type.id
                                            ? 'bg-purple-600 text-white'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    <i className={`bx ${type.icon}`}></i>
                                    <span className="hidden sm:inline">{type.name}</span>
                                </button>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="relative w-full md:w-64">
                            <i className='bx bx-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'></i>
                            <input
                                type="text"
                                placeholder="Search media..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Albums Section */}
            {(selectedType === 'all' || selectedType === 'photos') && (
                <section className="py-8">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <i className='bx bx-folder-open text-purple-600'></i>
                            Photo Albums
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                            {albums.slice(1).map(album => (
                                <motion.div
                                    key={album.id}
                                    whileHover={{ y: -5 }}
                                    className={`relative rounded-lg overflow-hidden cursor-pointer group ${
                                        selectedAlbum === album.id ? 'ring-4 ring-purple-600' : ''
                                    }`}
                                    onClick={() => setSelectedAlbum(album.id === selectedAlbum ? 'all' : album.id)}
                                >
                                    <img
                                        src={album.cover}
                                        alt={album.name}
                                        className="w-full h-32 object-cover group-hover:scale-110 transition duration-300"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                                        <h3 className="font-semibold text-sm truncate">{album.name}</h3>
                                        <p className="text-xs text-gray-300">{album.count} photos</p>
                                    </div>
                                    {selectedAlbum === album.id && (
                                        <div className="absolute top-2 right-2 bg-purple-600 text-white p-1 rounded-full">
                                            <i className='bx bx-check'></i>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Featured Photos Section */}
            {(selectedType === 'all' || selectedType === 'photos') && featuredPhotos.length > 0 && (
                <section className="py-8 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <i className='bx bx-star text-yellow-500'></i>
                            Featured Photos
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {featuredPhotos.slice(0, 3).map(photo => (
                                <motion.div
                                    key={photo.id}
                                    whileHover={{ scale: 1.02 }}
                                    className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer group"
                                    onClick={() => {
                                        setSelectedImage(photo);
                                        setShowLightbox(true);
                                    }}
                                >
                                    <img
                                        src={photo.image}
                                        alt={photo.title}
                                        className="w-full h-64 object-cover"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition">
                                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                            <h3 className="font-bold truncate">{photo.title}</h3>
                                            <p className="text-sm text-gray-300">{photo.photographer}</p>
                                            <div className="flex items-center gap-3 mt-2 text-sm">
                                                <span className="flex items-center gap-1">
                                                    <i className='bx bx-heart'></i> {photo.likes}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <i className='bx bx-show'></i> {photo.views}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Videos Section */}
            {(selectedType === 'all' || selectedType === 'videos' || selectedType === 'highlights') && (
                <section className="py-8">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <i className='bx bx-video-recording text-red-600'></i>
                                {selectedType === 'highlights' ? 'Match Highlights' : 'Latest Videos'}
                            </h2>
                            <select
                                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={selectedSport}
                                onChange={(e) => setSelectedSport(e.target.value)}
                            >
                                <option value="all">All Sports</option>
                                {sports.slice(1).map(sport => (
                                    <option key={sport.id} value={sport.id}>{sport.icon} {sport.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredVideos.length > 0 ? (
                                filteredVideos.map(video => (
                                    <motion.div
                                        key={video.id}
                                        whileHover={{ y: -5 }}
                                        className="bg-white rounded-xl overflow-hidden shadow-md cursor-pointer group"
                                        onClick={() => {
                                            setSelectedVideo(video);
                                            setShowVideoModal(true);
                                        }}
                                    >
                                        <div className="relative">
                                            <img
                                                src={video.thumbnail}
                                                alt={video.title}
                                                className="w-full h-48 object-cover"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                                                    <i className='bx bx-play text-white text-3xl'></i>
                                                </div>
                                            </div>
                                            <span className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                                                {video.duration}
                                            </span>
                                            {video.featured && (
                                                <span className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs">
                                                    FEATURED
                                                </span>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">{video.title}</h3>
                                            <p className="text-sm text-gray-500 mb-3 line-clamp-2">{video.description}</p>
                                            <div className="flex items-center justify-between text-sm text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <i className='bx bx-show'></i> {video.views.toLocaleString()} views
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <i className='bx bx-heart'></i> {video.likes}
                                                </span>
                                                <span className="text-xs">{new Date(video.date).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-3 text-center py-12">
                                    <i className='bx bx-video-off text-5xl text-gray-400 mb-4'></i>
                                    <p className="text-gray-500">No videos found matching your filters.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Photo Grid */}
            {(selectedType === 'all' || selectedType === 'photos') && (
                <section className="py-8 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <i className='bx bx-images text-purple-600'></i>
                                Photo Gallery
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                <select
                                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    value={selectedSport}
                                    onChange={(e) => setSelectedSport(e.target.value)}
                                >
                                    <option value="all">All Sports</option>
                                    {sports.slice(1).map(sport => (
                                        <option key={sport.id} value={sport.id}>{sport.icon} {sport.name}</option>
                                    ))}
                                </select>
                                {selectedAlbum !== 'all' && (
                                    <button
                                        onClick={() => setSelectedAlbum('all')}
                                        className="text-purple-600 text-sm hover:text-purple-700 flex items-center gap-1"
                                    >
                                        <i className='bx bx-x'></i>
                                        Clear Album
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredPhotos.length > 0 ? (
                                filteredPhotos.map(photo => (
                                    <motion.div
                                        key={photo.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        whileHover={{ scale: 1.02 }}
                                        className="relative rounded-lg overflow-hidden cursor-pointer group aspect-square"
                                        onClick={() => {
                                            setSelectedImage(photo);
                                            setShowLightbox(true);
                                        }}
                                    >
                                        <img
                                            src={photo.thumbnail}
                                            alt={photo.title}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition">
                                            <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                                                <p className="text-sm font-semibold truncate">{photo.title}</p>
                                                <div className="flex items-center gap-2 text-xs mt-1">
                                                    <span className="flex items-center gap-1">
                                                        <i className='bx bx-heart'></i> {photo.likes}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <i className='bx bx-show'></i> {photo.views}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        {photo.featured && (
                                            <span className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs z-10">
                                                Featured
                                            </span>
                                        )}
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-4 text-center py-12">
                                    <i className='bx bx-image-alt text-5xl text-gray-400 mb-4'></i>
                                    <p className="text-gray-500">No photos found matching your filters.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Image Lightbox Modal ── */}
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
                            {/* Close Button */}
                            <button
                                onClick={() => setShowLightbox(false)}
                                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition z-10"
                            >
                                <i className='bx bx-x text-4xl'></i>
                            </button>

                            {/* Image */}
                            <img
                                src={selectedImage.image}
                                alt={selectedImage.title}
                                className="w-full max-h-[75vh] object-contain rounded-lg"
                            />

                            {/* Prev Button */}
                            <button
                                onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 text-white bg-black/50 p-3 rounded-full hover:bg-black/70 transition"
                            >
                                <i className='bx bx-chevron-left text-3xl'></i>
                            </button>

                            {/* Next Button */}
                            <button
                                onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 text-white bg-black/50 p-3 rounded-full hover:bg-black/70 transition"
                            >
                                <i className='bx bx-chevron-right text-3xl'></i>
                            </button>

                            {/* Caption */}
                            <div className="mt-4 text-white">
                                <div className="flex items-start justify-between gap-4 flex-wrap">
                                    <div>
                                        <h3 className="text-xl font-bold">{selectedImage.title}</h3>
                                        <p className="text-gray-400 text-sm mt-1">{selectedImage.description}</p>
                                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <i className='bx bx-camera'></i> {selectedImage.photographer}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <i className='bx bx-calendar'></i> {new Date(selectedImage.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm">
                                        <span className="flex items-center gap-1 text-pink-400">
                                            <i className='bx bx-heart'></i> {selectedImage.likes}
                                        </span>
                                        <span className="flex items-center gap-1 text-blue-400">
                                            <i className='bx bx-show'></i> {selectedImage.views}
                                        </span>
                                        <span className="flex items-center gap-1 text-green-400">
                                            <i className='bx bx-download'></i> {selectedImage.downloads}
                                        </span>
                                    </div>
                                </div>

                                {/* Image Counter */}
                                <p className="text-center text-gray-500 text-sm mt-3">
                                    {filteredPhotos.findIndex(p => p.id === selectedImage.id) + 1} / {filteredPhotos.length}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Video Modal ── */}
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
                            {/* Close Button */}
                            <button
                                onClick={() => setShowVideoModal(false)}
                                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition z-10"
                            >
                                <i className='bx bx-x text-4xl'></i>
                            </button>

                            {/* Video Player */}
                            <div className="relative w-full rounded-xl overflow-hidden bg-black" style={{ paddingTop: '56.25%' }}>
                                <iframe
                                    src={selectedVideo.videoUrl}
                                    title={selectedVideo.title}
                                    className="absolute inset-0 w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>

                            {/* Video Info */}
                            <div className="mt-4 text-white">
                                <div className="flex items-start justify-between gap-4 flex-wrap">
                                    <div>
                                        <h3 className="text-xl font-bold">{selectedVideo.title}</h3>
                                        <p className="text-gray-400 text-sm mt-1">{selectedVideo.description}</p>
                                        <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
                                            <i className='bx bx-calendar'></i>
                                            {new Date(selectedVideo.date).toLocaleDateString()}
                                            <span className="mx-2">•</span>
                                            <i className='bx bx-time'></i> {selectedVideo.duration}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm">
                                        <span className="flex items-center gap-1 text-blue-400">
                                            <i className='bx bx-show'></i> {selectedVideo.views.toLocaleString()}
                                        </span>
                                        <span className="flex items-center gap-1 text-pink-400">
                                            <i className='bx bx-heart'></i> {selectedVideo.likes}
                                        </span>
                                        <span className="flex items-center gap-1 text-green-400">
                                            <i className='bx bx-comment'></i> {selectedVideo.comments}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Media;
