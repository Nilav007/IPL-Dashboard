import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { TeamPage } from './pages/TeamPage';
import { MatchPage } from './pages/MatchPage';
import './App.scss';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/teams/:teamName" element={<TeamPage />} />
                    <Route path="/teams/:teamName/matches/:year" element={<MatchPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;