import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // On app load — verify token still valid
  useEffect(() => {
    const token = localStorage.getItem("bzu_token");
    const saved = localStorage.getItem("bzu_user");

    if (token && saved) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const isExpired = payload.exp * 1000 < Date.now();

        if (isExpired) {
          localStorage.removeItem("bzu_user");
          localStorage.removeItem("bzu_token");
          setUser(null);
        } else {
          setUser(JSON.parse(saved));
        }
      } catch (err) {
        localStorage.removeItem("bzu_user");
        localStorage.removeItem("bzu_token");
        setUser(null);
      }
    }
  }, []);

  const login = async (email, password) => {
    localStorage.clear();

    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });

    if (res.data.success) {
      const userData = res.data.user;
      const token = res.data.token;

      localStorage.setItem("bzu_user", JSON.stringify(userData));
      localStorage.setItem("bzu_token", token);

      setUser(userData);
      return userData.role;
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
