import './App.scss';
import { TeamPage } from './pages/TeamPage'
import { MatchPage } from './pages/MatchPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/teams/:teamName" element={<TeamPage />} />
                    <Route path="/" element={<TeamPage />} />
                    <Route path="/teams/:teamName/matches/:year" element={<MatchPage />} />
                    <Route path="/" element={<MatchPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;