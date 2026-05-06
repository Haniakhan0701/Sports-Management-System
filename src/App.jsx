// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./components/Home";
import Games from "./pages/Games";
import GameDetail from "./pages/GameDetail";
import Schedule from "./pages/schedule";
import Standings from "./pages/Standings";
import Announcements from "./pages/announcements";
import Media from "./pages/media";
import About from './pages/About';
 
import Login from "./pages/Login";
import Register from './pages/Register';
import ScrollToTop from "./components/ScrollToTop";
import Live from './pages/live';  // 👈 small 'l' to match your filename
 
import AdminRoute from "./components/AdminRoute";

import Dashboard from './pages/admin/Dashboard';
import ManageGames from './pages/admin/ManageGames';
import Scores from './pages/admin/Scores';
import Support from './pages/admin/Support';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header /> {/* Always visible */}
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

{/* Protected routes or private routes of Admin */}
 
<Route path="/admin/dashboard" element={
  <AdminRoute>
    <Dashboard />
  </AdminRoute>
} />

<Route path="/admin/games" element={
  <AdminRoute>
    <ManageGames />
  </AdminRoute>
} />

<Route path="/admin/scores" element={
  <AdminRoute>
    <Scores />
  </AdminRoute>
} />


<Route path="/contact" element={<Support />} /> 

      </Routes>
      <Footer /> {/* Always visible */}
    </Router>
  );
}

export default App;
