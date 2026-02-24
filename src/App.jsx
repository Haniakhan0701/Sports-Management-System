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
import Dashboard from './pages/admin/Dashboard';
import ManageGames from './pages/admin/ManageGames';
import Scores from './pages/admin/Scores';
import Support from './pages/admin/Support';
import Register from './pages/Register';

function App() {
  return (
    <Router>
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
         <Route path="/admin/dashboard" element={<Dashboard />} />
<Route path="/admin/games" element={<ManageGames />} />
<Route path="/admin/scores" element={<Scores />} />
<Route path="/contact" element={<Support />} />
<Route path="/register" element={<Register/>} />

      </Routes>
      <Footer /> {/* Always visible */}
    </Router>
  );
}

export default App;
