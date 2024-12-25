import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hangman from './pages/Hangman';
import HighScore from './pages/HighScore';
import HomePage from './pages/Homepage';
import { useState } from 'react';
import Sidebar from './components/Sidebar';

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        {/* Main Content */}
        <div className="flex-grow h-full transition-all duration-300">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/playgame" element={<Hangman />} />
            <Route path="/highscore" element={<HighScore />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
