import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Stock from './pages/Stock';
import Sales from './pages/Sales';
import './App.css';

function App() {
    const [products, setProducts] = useState(() => {
        const saved = localStorage.getItem('products');
        return saved ? JSON.parse(saved) : [];
    });
    
    const [sales, setSales] = useState(() => {
        const saved = localStorage.getItem('sales');
        return saved ? JSON.parse(saved) : [];
    });
    
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const saved = localStorage.getItem('isLoggedIn');
        return saved ? JSON.parse(saved) : false;
    });

    // Hardcoded credentials (replace with your own)
    const USERNAME = "bavon";
    const PASSWORD = "bavon123";

    // Load from LocalStorage on initial render
    useEffect(() => {
        const storedProducts = localStorage.getItem('products');
        const storedSales = localStorage.getItem('sales');
        const storedLogin = localStorage.getItem('isLoggedIn');

        if (storedProducts) setProducts(JSON.parse(storedProducts));
        if (storedSales) setSales(JSON.parse(storedSales));
        if (storedLogin) setIsLoggedIn(JSON.parse(storedLogin));
    }, []);

    // Save to LocalStorage when products change
    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    // Save to LocalStorage when sales change
    useEffect(() => {
        localStorage.setItem('sales', JSON.stringify(sales));
    }, [sales]);

    // Save login state
    useEffect(() => {
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    }, [isLoggedIn]);

    const handleLogin = (username, password) => {
        if (username === USERNAME && password === PASSWORD) {
            setIsLoggedIn(true);
            return true;
        }
        return false;
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    if (!isLoggedIn) {
        return (
            <div className="login-container">
                <h2>Login</h2>
                <LoginForm onLogin={handleLogin} />
            </div>
        );
    }

    return (
        <Router>
            <Navbar onLogout={handleLogout} />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/products"
                        element={<Products products={products} setProducts={setProducts} />}
                    />
                    <Route
                        path="/stock"
                        element={<Stock products={products} setProducts={setProducts} />}
                    />
                    <Route
                        path="/sales"
                        element={<Sales products={products} setProducts={setProducts} sales={sales} setSales={setSales} />}
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
}

// Login Form Component
function LoginForm({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Please enter both username and password');
            return;
        }
        
        const success = onLogin(username, password);
        if (!success) {
            setError('Invalid credentials');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
}

export default App;
