import logo from './logo.svg';
import './App.css';
import { TeamPage } from './pages/TeamPage'
import {BrowserRouter as Router} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <TeamPage/>
    </div>
  );
}

export default App;
