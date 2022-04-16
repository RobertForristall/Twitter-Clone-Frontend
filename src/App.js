import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Landing_Page from './pages/Landing_Page';
import Credentials from './pages/Credentials';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing_Page />}/>
          <Route path="/signup" element={<Credentials page="signup"/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
