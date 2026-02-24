// src/utils/auth.js
// Utility functions for authentication

export const login = (token, userData) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("userData", JSON.stringify(userData));
};

export const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
};

export const isAuthenticated = () => {
    return !!localStorage.getItem("authToken");
};

export const getAuthToken = () => {
    return localStorage.getItem("authToken");
};

export const getUserData = () => {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
};