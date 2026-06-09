// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./components/Home";
import Games from "./pages/Games";
import GameDetail from "./pages/GameDetail";
import Schedule from "./pages/schedule";
import Standings from "./pages/Standings";
import Announcements from "./pages/Announcements";
import Media from "./pages/Media";
import About from './pages/About';
import Login from "./pages/Login";
import Register from './pages/register';
import ScrollToTop from "./components/ScrollToTop";
import Live from './pages/live';
import AdminRoute from "./components/AdminRoute";
import Dashboard from './pages/admin/Dashboard';
import AdminGames from './pages/admin/AdminGames';
import Scores from './pages/admin/Scores';
import ManageAnnouncements from "./pages/admin/manageannouncements";
import AnnouncementPopup from "./components/AnnouncementPopup";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <AnnouncementPopup />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Games" element={<Games />} />
        <Route path="/games/:gameName" element={<GameDetail />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/standings" element={<Standings />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/media" element={<Media />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/live" element={<Live />} />
        <Route path="/admin/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
        <Route path="/admin/games" element={<AdminRoute><AdminGames /></AdminRoute>} />
        <Route path="/admin/scores" element={<AdminRoute><Scores /></AdminRoute>} />
        <Route path="/admin/announcements" element={<AdminRoute><ManageAnnouncements /></AdminRoute>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
