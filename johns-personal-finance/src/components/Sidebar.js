// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // We’ll create this CSS file next for styling

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Cashflow Dojo</h2>
      <nav className="sidebar-nav">
        <Link to="/overview" className="sidebar-link">Overview</Link>
        <Link to="/expenses" className="sidebar-link">Expenses</Link>
        <Link to="/analytics" className="sidebar-link">Analytics</Link>
      </nav>
      <button className="logout-button">Log out</button>
    </div>
  );
};

export default Sidebar;

