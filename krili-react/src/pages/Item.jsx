import React, { useState, useEffect } from "react";
import "../styles/Item.css";
import Header from "../Components/Header";

function ItemGallery({ mainImage, setMainImage }) {
  const thumbnails = [
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
  ];

  return (
    <div className="item-gallery">
      <img src={mainImage} alt="Main" className="main-image" />
      <div className="thumbnail-grid">
        {thumbnails.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Thumbnail ${index + 1}`}
            className="thumbnail"
            onClick={() => setMainImage(src)}
          />
        ))}
      </div>
    </div>
  );
}

function ItemInfo({ selectedPeriod, setSelectedPeriod, showNotification }) {
  const periods = ["1 Day", "3 Days", "1 Week", "2 Weeks", "1 Month"];

  const handleRent = () => {
    showNotification("Rental request sent! Owner will contact you shortly.", "success");
  };

  const contactOwner = () => {
    showNotification("Opening chat with owner...", "info");
    setTimeout(() => {
      window.location.href = "chat.html";
    }, 1000);
  };

  return (
    <div className="item-info">
      <h1 className="item-title">MacBook Pro 2023</h1>
      <div className="item-price">500 MAD/day</div>
      <div className="item-location">
        <i className="fas fa-map-marker-alt"></i>
        <span>Casablanca, MA</span>
      </div>
      <p className="item-description">
        Brand new MacBook Pro 2023 with M2 Pro chip, 16GB RAM, and 512GB SSD. Perfect for professional work, video editing, and development. Comes with all original accessories and warranty. Available for rent in Casablanca and surrounding areas.
      </p>
      <div className="item-features">
        <div className="feature">
          <i className="fas fa-microchip"></i><span>M2 Pro Chip</span>
        </div>
        <div className="feature">
          <i className="fas fa-memory"></i><span>16GB RAM</span>
        </div>
        <div className="feature">
          <i className="fas fa-hdd"></i><span>512GB SSD</span>
        </div>
        <div className="feature">
          <i className="fas fa-battery-full"></i><span>18h Battery</span>
        </div>
      </div>
      <div className="rental-period">
        <h3 className="period-title">Select Rental Period</h3>
        <div className="period-options">
          {periods.map((period, index) => (
            <button
              key={index}
              className={`period-option ${selectedPeriod === period ? "active" : ""}`}
              onClick={() => {
                setSelectedPeriod(period);
                showNotification(`Selected ${period} rental period`, "info");
              }}
            >
              {period}
            </button>
          ))}
        </div>
      </div>
      <button className="rent-btn" onClick={handleRent}>Rent Now</button>
      <div className="owner-info">
        <div className="owner-header">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
            alt="Owner"
            className="owner-avatar"
          />
          <div>
            <div className="owner-name">John Doe</div>
            <div className="owner-rating">
              <i className="fas fa-star"></i>
              <span>4.9 (120 reviews)</span>
            </div>
          </div>
        </div>
        <div className="owner-stats">
          <div>
            <div className="stat-value">98%</div>
            <div className="stat-label">Response Rate</div>
          </div>
          <div>
            <div className="stat-value">2h</div>
            <div className="stat-label">Avg. Response</div>
          </div>
          <div>
            <div className="stat-value">50+</div>
            <div className="stat-label">Rentals</div>
          </div>
        </div>
        <button className="contact-btn" onClick={contactOwner}>
          <i className="fas fa-envelope"></i> Contact Owner
        </button>
      </div>
    </div>
  );
}

function Notification({ message, type, visible }) {
  return (
    <div className={`notification ${type} ${visible ? "show" : ""}`}>
      {message}
    </div>
  );
}

function Item() {
  const [mainImage, setMainImage] = useState("https://images.unsplash.com/photo-1496181133206-80ce9b88a853");
  const [selectedPeriod, setSelectedPeriod] = useState("1 Day");
  const [notification, setNotification] = useState({ message: "", type: "info", visible: false });
  const [theme, setTheme] = useState("dark");

  const showNotification = (message, type = "info", duration = 3000) => {
    setNotification({ message, type, visible: true });
    setTimeout(() => setNotification((prev) => ({ ...prev, visible: false })), duration);
  };

  const toggleTheme = () => {
    const isLight = theme === "light";
    setTheme(isLight ? "dark" : "light");
    document.body.setAttribute("data-theme", isLight ? "dark" : "light");
    showNotification(`Switched to ${isLight ? "dark" : "light"} theme`, "success");
  };



  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === "t") toggleTheme();
      if (e.key === "Escape") setNotification((prev) => ({ ...prev, visible: false }));
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [theme]);

  return (
    <div className="App">
      <Header onToggleTheme={toggleTheme} isLightTheme={theme === "light"} activePage={"item"} />
      <main className="item-container">
        <div className="item-grid">
          <ItemGallery mainImage={mainImage} setMainImage={setMainImage} />
          <ItemInfo
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
            showNotification={showNotification}
          />
        </div>
      </main>
      <Notification {...notification} />
    </div>
  );
}

export default Item;
