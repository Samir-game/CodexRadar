import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/home">CodexRadar</Link>
        </div>
        <ul className='nav-links'>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/problem-history">Problem History</Link></li>
          <li><Link to="/contest-history">Contest History</Link></li>
          <li><Link to="/aboutus">About Us</Link></li>
          <li><Link to="/contact-us">Contact Us</Link></li>
          <li><Link to="/setting">Setting</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
