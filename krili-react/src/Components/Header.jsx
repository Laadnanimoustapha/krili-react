import React, { useEffect } from 'react'

function Header({ onToggleTheme, isLightTheme, activePage }) {
    useEffect(() => {
        // Handle active page logic
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.textContent.toLowerCase() === activePage?.toLowerCase()) {
                link.classList.add('active');
            }
        });
    }, [activePage]);

    const logout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");
        showNotification("Successfully logged out", "success");
        setTimeout(() => (window.location.href = "login-test1.html"), 1500);
    };
    
    return (
        <header>
            <div className="header-content">
                <div className="logo">
                    <img src="/public/logo.png" alt="KRILI Logo" />
                </div>
                <nav className="nav-links">
                    <a href="/">Home</a>
                    <a href="search-test1.html">Search</a>
                    <a href="/profile">Profile</a>
                    <a href="/">Item</a>
                    <a href="register-test1.html">Register</a>
                    <a href="#" onClick={logout}>Logout</a>
                </nav>
                <button className="theme-toggle" onClick={onToggleTheme}>
                    <i id="theme-icon" className={`fas ${isLightTheme ? "fa-sun" : "fa-moon"}`}></i>
                    <span>Theme</span>
                </button>
            </div>
        </header>
    );
}

export default Header