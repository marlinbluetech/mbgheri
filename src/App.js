// App.js
import React from 'react';
import './App.css';
import Indexpage from './Indexpage';
import Sign from './Sign';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loginn from './Loginn';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Sign />} />
          <Route path="/loginn" element={<Loginn/>} />
          <Route path="/indexpage/*" element={<Indexpage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
