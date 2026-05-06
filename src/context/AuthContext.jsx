import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Remember login after page refresh
    const saved = localStorage.getItem("bzu_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email, password) => {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });

    if (res.data.success) {
      const userData = res.data.user;
      const token = res.data.token;

      // Save to localStorage
      localStorage.setItem("bzu_user", JSON.stringify(userData));
      localStorage.setItem("bzu_token", token);

      setUser(userData);
      return userData.role; // returns "admin" or "user"
    } else {
      throw new Error("Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("bzu_user");
    localStorage.removeItem("bzu_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
