import './App.css';
import { TeamPage } from './pages/TeamPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/teams/:teamName" element={<TeamPage />} />
                    <Route path="/" element={<TeamPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;