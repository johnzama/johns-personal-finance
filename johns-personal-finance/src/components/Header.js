// src/components/Header.js
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-title">October 2024</div>
      <div className="header-user">
        <span>John Zama</span> {/* Update the name here */}
        <img src="https://via.placeholder.com/40" alt="User Profile" className="user-avatar" />
      </div>
    </header>
  );
};

export default Header;

