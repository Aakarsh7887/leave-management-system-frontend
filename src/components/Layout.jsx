import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Theme toggle state
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    useEffect(() => {
        if (theme === 'light') {
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        }
    }, [theme]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-brand">
                    <Link to="/">LMS & Reimbursements</Link>
                </div>
                <div className="nav-links">
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="btn btn-outline"
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem', marginRight: '1rem', border: 'none', background: 'transparent', cursor: 'pointer' }}
                        title="Toggle Theme"
                    >
                        {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
                    </button>
                    {user ? (
                        <>
                            <span className="nav-link" style={{ cursor: 'default' }}>
                                {user.name} <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>({user.role})</span>
                            </span>
                            <button
                                onClick={handleLogout}
                                className="btn btn-outline"
                                style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="nav-link">Register</Link>
                        </>
                    )}
                </div>
            </nav>
            <main className="container mt-4 mb-4">
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
