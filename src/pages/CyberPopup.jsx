import React from "react";
import { useNavigate } from "react-router-dom";

const CyberPopup = () => {
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate("/createaccount");
    };

    const handleLogin = () => {
        navigate("/login");
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
            <div className="bg-gradient-to-r from-purple-700 via-pink-600 to-fuchsia-600 p-6 rounded-3xl shadow-2xl w-[90%] max-w-md animate-pulse">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-white text-xl font-bold tracking-wide">
                        🔐 Access Restricted
                    </h2>
                </div>
                <p className="text-white/90 mb-4">
                    You need an account to access this blog. Join the cyber club now!
                </p>
                <button
                    onClick={handleRegister}
                    className="w-full text-center bg-black/20 hover:bg-black/40 text-white font-bold py-2 rounded-lg transition mb-2"
                >
                    Register for Free
                </button>
                <button
                    onClick={handleLogin}
                    className="w-full text-center bg-white/20 hover:bg-white/40 text-white font-bold py-2 rounded-lg transition"
                >
                    Login to Existing Account
                </button>
                <p className="text-white/50 mt-2 text-xs">
                    No spam, just cyber goodness 🛸
                </p>
            </div>
        </div>
    );
};

export default CyberPopup;