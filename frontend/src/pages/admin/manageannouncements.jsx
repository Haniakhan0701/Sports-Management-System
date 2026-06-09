// src/pages/admin/manageannouncements.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import 'boxicons/css/boxicons.min.css';

const API = `${import.meta.env.VITE_API_URL}/api`;

// ✅ FIX: Use correct token key 'bzu_token'
const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem('bzu_token')}`
    }
});

const ManageAnnouncements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingAnnouncement, setEditingAnnouncement] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        type: 'INFO',
        category: 'General',
        departments: ['All'],
        pinned: false,
        link: '',
        linkText: 'View Details'
    });

    const departments = ['CE', 'ME', 'EE', 'CVE', 'AR', 'All'];
    
    const types = [
        { id: 'IMPORTANT', name: 'IMPORTANT', color: 'red' },
        { id: 'INFO', name: 'INFO', color: 'blue' },
        { id: 'MATCH', name: 'MATCH', color: 'green' },
        { id: 'GENERAL', name: 'GENERAL', color: 'gray' }
    ];
    
    const categories = ["Men's", "Women's", 'General'];

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            // GET is public — no auth header needed
            const res = await axios.get(`${API}/announcements`);
            setAnnouncements(res.data.announcements || res.data || []);
        } catch (error) {
            console.error("Failed to fetch:", error);
        } finally {
            setLoading(false);
        }
    };

    // ✅ FIX: Added getAuthHeaders() to POST and PUT
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingAnnouncement) {
                await axios.put(
                    `${API}/announcements/${editingAnnouncement._id}`,
                    formData,
                    getAuthHeaders()  // ✅
                );
            } else {
                await axios.post(
                    `${API}/announcements`,
                    formData,
                    getAuthHeaders()  // ✅
                );
            }
            fetchAnnouncements();
            resetForm();
            alert(editingAnnouncement ? 'Announcement updated!' : 'Announcement created!');
        } catch (error) {
            console.error("Save failed:", error);
            alert("Failed to save announcement: " + (error.response?.data?.error || error.message));
        }
    };

    // ✅ FIX: Added getAuthHeaders() to DELETE
    const handleDelete = async (id) => {
        if (window.confirm("Delete this announcement?")) {
            try {
                await axios.delete(`${API}/announcements/${id}`, getAuthHeaders()); // ✅
                fetchAnnouncements();
            } catch (error) {
                console.error("Delete failed:", error);
                alert("Failed to delete: " + (error.response?.data?.error || error.message));
            }
        }
    };

    const handleEdit = (announcement) => {
        setEditingAnnouncement(announcement);
        setFormData({
            title: announcement.title,
            body: announcement.body,
            type: announcement.type || 'INFO',
            category: announcement.category || 'General',
            departments: announcement.departments || ['All'],
            pinned: announcement.pinned || false,
            link: announcement.link || '',
            linkText: announcement.linkText || 'View Details'
        });
        setShowForm(true);
    };

    const resetForm = () => {
        setShowForm(false);
        setEditingAnnouncement(null);
        setFormData({
            title: '',
            body: '',
            type: 'INFO',
            category: 'General',
            departments: ['All'],
            pinned: false,
            link: '',
            linkText: 'View Details'
        });
    };

    const handleDepartmentChange = (dept) => {
        if (formData.departments.includes(dept)) {
            setFormData({ ...formData, departments: formData.departments.filter(d => d !== dept) });
        } else {
            setFormData({ ...formData, departments: [...formData.departments, dept] });
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    const typeColors = {
        IMPORTANT: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' },
        INFO:      { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
        MATCH:     { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' },
        GENERAL:   { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300' }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Manage Announcements</h1>
                        <p className="text-gray-600 text-sm">Create and manage announcements that users will see as popups</p>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
                    >
                        <i className='bx bx-plus'></i>
                        {showForm ? 'Cancel' : 'New Announcement'}
                    </button>
                </div>

                <AnimatePresence>
                    {showForm && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white rounded-xl p-6 shadow-md mb-6 border border-gray-200"
                        >
                            <h2 className="font-bold text-lg mb-4">
                                {editingAnnouncement ? 'Edit Announcement' : 'Create New Announcement'}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white focus:border-blue-500 focus:outline-none"
                                        value={formData.title}
                                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
                                    <textarea
                                        required
                                        rows="4"
                                        className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white focus:border-blue-500 focus:outline-none"
                                        value={formData.body}
                                        onChange={(e) => setFormData({...formData, body: e.target.value})}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                        <select
                                            className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white focus:border-blue-500 focus:outline-none"
                                            value={formData.type}
                                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                                        >
                                            {types.map(type => (
                                                <option key={type.id} value={type.id}>{type.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                        <select
                                            className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white focus:border-blue-500 focus:outline-none"
                                            value={formData.category}
                                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                                        >
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Departments (Select multiple)</label>
                                        <div className="flex flex-wrap gap-2 border-2 border-gray-300 rounded-lg p-3 bg-white">
                                            {departments.map(dept => (
                                                <label key={dept} className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.departments.includes(dept)}
                                                        onChange={() => handleDepartmentChange(dept)}
                                                        className="w-4 h-4 text-blue-600"
                                                    />
                                                    <span className="text-sm text-gray-700">{dept}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 pt-6">
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={formData.pinned}
                                                onChange={(e) => setFormData({...formData, pinned: e.target.checked})}
                                                className="w-4 h-4 text-blue-600"
                                            />
                                            <span className="text-sm text-gray-700">Pin this announcement</span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Link URL (optional)</label>
                                    <input
                                        type="text"
                                        className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white focus:border-blue-500 focus:outline-none"
                                        placeholder="/schedule or https://..."
                                        value={formData.link}
                                        onChange={(e) => setFormData({...formData, link: e.target.value})}
                                    />
                                </div>

                                {formData.link && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Link Button Text</label>
                                        <input
                                            type="text"
                                            className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white focus:border-blue-500 focus:outline-none"
                                            value={formData.linkText}
                                            onChange={(e) => setFormData({...formData, linkText: e.target.value})}
                                        />
                                    </div>
                                )}

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                                    >
                                        {editingAnnouncement ? 'Update' : 'Create'} Announcement
                                    </button>
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {loading ? (
                    <div className="text-center py-12">
                        <i className='bx bx-loader-alt bx-spin text-4xl text-blue-500'></i>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {announcements.length === 0 ? (
                            <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
                                <i className='bx bx-bell-off text-4xl text-gray-400'></i>
                                <p className="text-gray-500 mt-2">No announcements yet. Create your first announcement!</p>
                            </div>
                        ) : (
                            announcements.map(ann => (
                                <div key={ann._id} className={`bg-white rounded-xl p-4 shadow-sm border ${typeColors[ann.type]?.border || 'border-gray-200'}`}>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                {ann.pinned && (
                                                    <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                                                        <i className='bx bxs-pin'></i> PINNED
                                                    </span>
                                                )}
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${typeColors[ann.type]?.bg} ${typeColors[ann.type]?.text}`}>
                                                    {ann.type}
                                                </span>
                                                <span className="text-xs text-gray-500">{formatDate(ann.createdAt)}</span>
                                            </div>
                                            <h3 className="font-bold text-gray-800 mb-1">{ann.title}</h3>
                                            <p className="text-gray-600 text-sm mb-2">{ann.body}</p>
                                            <div className="flex flex-wrap gap-2 text-xs">
                                                <span className="bg-gray-100 px-2 py-1 rounded">{ann.category}</span>
                                                {ann.departments?.map(dept => (
                                                    <span key={dept} className="bg-gray-100 px-2 py-1 rounded">{dept}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex gap-2 ml-4">
                                            <button
                                                onClick={() => handleEdit(ann)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                            >
                                                <i className='bx bx-edit'></i>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(ann._id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                            >
                                                <i className='bx bx-trash'></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageAnnouncements;
