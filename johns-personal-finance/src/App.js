// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Overview from './pages/Overview'; // Import Overview component
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Header />
          <Routes>
            <Route path="/" element={<Overview />} /> {/* Set Overview as default */}
            <Route path="/overview" element={<Overview />} />
            <Route path="/expenses" element={<div>Expenses Page</div>} />
            <Route path="/analytics" element={<div>Analytics Page</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

