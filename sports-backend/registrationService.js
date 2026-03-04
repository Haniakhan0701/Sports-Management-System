// src/services/registrationService.js
// Add this file to your React frontend project

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ── Submit registration form ──────────────────────────────────────────────────
export const submitRegistration = async (formData) => {
    const response = await fetch(`${API_URL}/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Registration failed. Please try again.');
    }

    return data;
};

// ── Check if already registered ──────────────────────────────────────────────
export const checkRegistration = async (rollNumber, sport, category) => {
    const params = new URLSearchParams({ rollNumber, sport, category });
    const response = await fetch(`${API_URL}/registrations/check?${params}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Check failed');
    }

    return data;
};

// ── Admin login ───────────────────────────────────────────────────────────────
export const adminLogin = async (email, password) => {
    const response = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Login failed');
    }

    // Save token to localStorage
    localStorage.setItem('adminToken', data.token);
    localStorage.setItem('adminInfo', JSON.stringify(data.admin));

    return data;
};

// ── Get dashboard stats (protected) ──────────────────────────────────────────
export const getDashboardStats = async () => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_URL}/admin/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
};

// ── Get all registrations with optional filters (protected) ──────────────────
export const getAllRegistrations = async (filters = {}) => {
    const token  = localStorage.getItem('adminToken');
    const params = new URLSearchParams(filters);
    const response = await fetch(`${API_URL}/admin/registrations?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
};

// ── Update registration status (protected) ───────────────────────────────────
export const updateStatus = async (id, status, adminNote = '') => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_URL}/admin/registrations/${id}/status`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status, adminNote }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
};

// ── Delete registration (protected) ──────────────────────────────────────────
export const deleteRegistration = async (id) => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_URL}/admin/registrations/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
};

// ── Admin logout ──────────────────────────────────────────────────────────────
export const adminLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
};
