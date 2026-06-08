import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FiUser, FiLock, FiMail } from "react-icons/fi";
import zxcvbn from "zxcvbn";

// ✅ ADDED LOGIN FUNCTION DIRECTLY
const login = (token, userData) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("hasAccount", "true");
    localStorage.setItem("isLoggedIn", "true");
};

const API = import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.MODE === 'development' ? "http://localhost:5000" : "https://portfolio-backend-cwuf.onrender.com");

const CreateAccount = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [passwordStrength, setPasswordStrength] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError("Please fill in all fields!");
            return;
        }

        try {
            const res = await fetch(`${API}/api/auth/createaccount`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    full_name: name,
                    email,
                    password
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Something went wrong!");
                return;
            }

            // ✅ Use the login function (now defined directly in this file)
            login(data.token, data.user);

            // Mailchimp API call
            const mailchimpAPIKey = import.meta.env.VITE_MAILCHIMP_API_KEY;
            const mailchimpListId = import.meta.env.VITE_MAILCHIMP_AUDIENCE_ID;

            if (mailchimpAPIKey && mailchimpListId) {
                const serverPrefix = mailchimpAPIKey.split('-').pop();
                fetch(`https://${serverPrefix}.api.mailchimp.com/3.0/lists/${mailchimpListId}/members/`, {
                    method: "POST",
                    headers: {
                        Authorization: `apikey ${mailchimpAPIKey}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email_address: email,
                        status: "subscribed",
                        merge_fields: { FNAME: name },
                    }),
                }).catch((err) => console.error("Mailchimp error:", err));
            }

            toast.success(`🎉 Congrats ${name}! Your account has been created. Enjoy your cyber journey!`, {
                style: {
                    background: "#1a1a2e",
                    color: "#ffcc00",
                    fontWeight: "bold",
                    border: "2px solid #ffcc00",
                },
                iconTheme: {
                    primary: "#ffcc00",
                    secondary: "#1a1a2e",
                },
                duration: 2000,
            });

            // ✅ AUTO-REDIRECT TO BLOG AFTER 2 SECONDS
            setTimeout(() => {
                navigate("/blog");
            }, 2000);

            // Reset form
            setName("");
            setEmail("");
            setPassword("");
            setError("");
            setPasswordStrength(0);

        } catch (err) {
            console.error(err);
            setError("Network error, please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2c3550] via-[#3d2f60] to-[#503668] p-4">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-8 w-[90%] max-w-md text-white">
                <h2 className="text-2xl font-bold mb-6 text-center">Create Your Account</h2>

                {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center gap-2 border border-gray-400 rounded-lg p-2">
                        <FiUser className="text-white text-xl" />
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-transparent outline-none w-full text-white placeholder-gray-300"
                        />
                    </div>

                    <div className="flex items-center gap-2 border border-gray-400 rounded-lg p-2">
                        <FiMail className="text-white text-xl" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-transparent outline-none w-full text-white placeholder-gray-300"
                        />
                    </div>

                    <div className="flex items-center gap-2 border border-gray-400 rounded-lg p-2">
                        <FiLock className="text-white text-xl" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                const strength = zxcvbn(e.target.value).score;
                                setPasswordStrength(strength);
                            }}
                            className="bg-transparent outline-none w-full text-white placeholder-gray-300"
                        />
                    </div>

                    {/* Password Strength Meter */}
                    {password && (
                        <div className="mt-1">
                            <div className="h-2 w-full bg-gray-700 rounded-full">
                                <div
                                    className="h-2 rounded-full"
                                    style={{
                                        width: `${(passwordStrength + 1) * 20}%`,
                                        backgroundColor: ["#ff3e36", "#ff691f", "#ffda36", "#0be881", "#05c46b"][passwordStrength],
                                        transition: "width 0.3s ease-in-out"
                                    }}
                                ></div>
                            </div>
                            <p className="text-xs mt-1 text-gray-300">
                                {["Very Weak", "Weak", "Fair", "Good", "Strong"][passwordStrength]}
                            </p>
                        </div>
                    )}

                    {/* Simple security note instead of reCAPTCHA */}
                    <div className="text-center text-sm text-gray-300 mt-4">
                        🔒 Your security is important to us
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 mt-2 rounded-lg bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 font-semibold hover:scale-105 transition text-white shadow-md"
                    >
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateAccount;