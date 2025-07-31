import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar({onLogout}) {
  return (
    <nav className="navbar">
      <h2>Cereals Store</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/stock">Stock</Link></li>
        <li><Link to="/sales">Sales</Link></li>
        <button onClick={onLogout}>Logout</button>
      </ul>
    </nav>
  );
}

export default Navbar;
