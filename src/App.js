import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Landing_Page from './pages/Landing_Page';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing_Page />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
