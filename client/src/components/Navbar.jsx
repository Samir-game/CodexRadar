import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">CodexRadar</div>
      
      <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <span></span><span></span><span></span>
      </div>

      <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/contesthistory">Contest History</Link></li>
        <li><Link to="/problemhistory">Problem History</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
