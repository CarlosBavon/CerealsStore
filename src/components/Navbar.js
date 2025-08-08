import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar({onLogout}) {
  const location = useLocation();

  return (
    <nav className="navbar">
      <h2>Cereals Store</h2>
      <ul>
        <li><Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>Home</Link></li>
        <li><Link to="/products" className={`nav-link ${location.pathname === "/products" ? "active" : ""}`}>Products</Link></li>
        <li><Link to="/stock" className={`nav-link ${location.pathname === "/stock" ? "active" : ""}`}>Stock</Link></li>
        <li><Link to="/sales" className={`nav-link ${location.pathname === "/sales" ? "active" : ""}`}>Sales</Link></li>
        <button onClick={onLogout}>Logout</button>
      </ul>
    </nav>
  );
}

export default Navbar;
