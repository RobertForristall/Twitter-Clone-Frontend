import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import Credentials from './pages/Credentials';
import Dashboard from './pages/Dashboard';
import DashboardTest from './pages/DashboardTest';
import ClassWrapper from './pages/ClassWrapper';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/signup" element={<Credentials page="signup"/>}/>
          <Route path="/login/:from_signup" element={<Credentials page="login"/>}/>
          <Route path='/dashboard' element = {<Dashboard/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
