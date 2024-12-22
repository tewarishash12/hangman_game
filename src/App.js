import './App.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Hangman from './pages/Hangman';
import HighScore from './pages/HighScore';
import HomePage from './pages/Homepage';
import { useState } from 'react';

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />} />
        <Route path="/playgame" element={<Hangman isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />} />
        <Route path="/highscore" element={<HighScore isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />} />
      </Routes>
    </Router>
  );
}

export default App;