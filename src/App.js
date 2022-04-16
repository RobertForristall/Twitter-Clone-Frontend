import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import Credentials from './pages/Credentials';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/signup" element={<Credentials page="signup"/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
