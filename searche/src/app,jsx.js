import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import ItemCard from './components/ItemCard';
import Notification from './components/Notification';

import itemsData from './assets/mockData'; // optional: you can move items into a separate file

function App() {
  const [theme, setTheme] = useState('dark');
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [items, setItems] = useState(itemsData);
  const [filteredItems, setFilteredItems] = useState(itemsData);
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });

  // Toggle light/dark theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.setAttribute('data-theme', newTheme);
    showNotification(`Switched to ${newTheme} theme`, 'success');
  };

  // Show notification
  const showNotification = (message, type = 'info') => {
    setNotification({ show: true, type, message });
    setTimeout(() => setNotification({ show: false }), 3000);
  };

  // Handle category filtering
  const handleFilter = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  // Search + filter logic
  useEffect(() => {
    const search = searchTerm.toLowerCase();
    const filtered = itemsData.filter((item) => {
      const matchesCategory = category === 'all' || item.category === category;
      const matchesSearch =
        item.title.toLowerCase().includes(search) ||
        item.tags.some((tag) => tag.toLowerCase().includes(search));
      return matchesCategory && matchesSearch;
    });
    setFilteredItems(filtered);
  }, [searchTerm, category]);

  return (
    <div className="App">
      <Header onToggleTheme={toggleTheme} />
      <main className="search-container">
        <div className="search-header">
          <h1 className="search-title">Search Results</h1>
          <p className="search-subtitle">
            Found {filteredItems.length} items matching your search
          </p>
        </div>

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <Filters category={category} setCategory={handleFilter} />

        <div className="results-grid">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} showNotification={showNotification} />
            ))
          ) : (
            <div className="no-results">
              <i className="fas fa-search no-results-icon"></i>
              <p className="no-results-text">No results found for your search</p>
            </div>
          )}
        </div>
      </main>

      {notification.show && (
        <Notification type={notification.type} message={notification.message} />
      )}
    </div>
  );
}

export default App;
