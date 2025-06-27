import React, { useEffect } from 'react';
import '../styles/Profile.css';
import Header from '../Components/Header';
// import Chart from 'chart.js/auto';

function Profile() {
    const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'light');
    useEffect(() => {
        initializeCharts();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="App" onContextMenu={(e) => e.preventDefault()}>
            <Header onToggleTheme={toggleTheme} isLightTheme={theme === "light"} activePage={"profile"} />


            {/* Loader, Scroll Button, Quick Actions */}
            <div className="loading-overlay" id="loading-overlay">
                <div className="loading-spinner"></div>
            </div>

            <button className="scroll-to-top" id="scrollToTop" onClick={scrollToTop}>
                <i className="fas fa-arrow-up"></i>
            </button>

            <button className="floating-action-btn" onClick={toggleQuickActions}>
                <i className="fas fa-plus"></i>
            </button>

            <div className="quick-actions" id="quickActions">
                <button className="quick-action-btn" onClick={addNewListing} title="Add New Listing">
                    <i className="fas fa-plus"></i>
                </button>
                <button className="quick-action-btn" onClick={refreshData} title="Refresh Data">
                    <i className="fas fa-sync"></i>
                </button>
                <button className="quick-action-btn" onClick={exportData} title="Export Data">
                    <i className="fas fa-download"></i>
                </button>
            </div>

            {/* Main Content */}
            <main className="profile-container">
                <section className="profile-header">
                    <div className="profile-info">
                        <img
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                            alt="Profile"
                            className="profile-avatar"
                        />
                        <h1 className="profile-name">John Doe</h1>
                        <div className="profile-rating">
                            <i className="fas fa-star"></i>
                            <span>4.9 (120 reviews)</span>
                        </div>
                        <div className="profile-location">
                            <i className="fas fa-map-marker-alt"></i>
                            <span>Casablanca, MA</span>
                        </div>
                        <p className="profile-bio">
                            Trusted renter and owner in Casablanca. I love sharing my items with the
                            community and ensuring a great rental experience for everyone.
                        </p>
                        <div className="profile-stats">
                            <div className="stat-item">
                                <div className="stat-value">98%</div>
                                <div className="stat-label">Response Rate</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value">2h</div>
                                <div className="stat-label">Avg. Response</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value">50+</div>
                                <div className="stat-label">Rentals</div>
                            </div>
                        </div>
                        <button className="edit-profile-btn" onClick={() => showNotification('Opening profile editor...')}>Edit Profile</button>
                    </div>
                </section>

                {/* Other Sections (Listings, Rental History, Earnings, Verification, Reviews, Settings) */}
                <section className="section-title">
                    <h2>My Listings</h2>
                    {/* You can break this into separate components */}
                </section>

                {/* Add more sections here like Rentals, Earnings, Reviews, etc. */}
            </main>

            <footer>
                <div className="footer-content">
                    <p className="footer-text">&copy; 2025 KRILI. All rights reserved. Created by LAADNANI</p>
                </div>
            </footer>

            <div className="notification" id="notification"></div>
        </div>
    );
}

function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    const currentTheme = body.getAttribute('data-theme');

    if (currentTheme === 'light') {
        body.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-moon';
        showNotification('Switched to dark theme', 'success');
    } else {
        body.setAttribute('data-theme', 'light');
        themeIcon.className = 'fas fa-sun';
        showNotification('Switched to light theme', 'success');
    }
}

function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    if (!notification) return;
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function toggleQuickActions() {
    const quickActions = document.getElementById('quickActions');
    quickActions.classList.toggle('show');
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleScroll() {
    const btn = document.getElementById('scrollToTop');
    if (!btn) return;
    if (window.scrollY > 300) {
        btn.classList.add('show');
    } else {
        btn.classList.remove('show');
    }
}

function addNewListing() {
    showNotification('Opening new listing form...', 'info');
}

function refreshData() {
    showNotification('Data refreshed successfully', 'success');
}

function exportData() {
    showNotification('Data exported successfully', 'success');
}

function initializeCharts() {
    // Stub for initializing Chart.js charts
    // Move to chart components later
}

export default Profile;
