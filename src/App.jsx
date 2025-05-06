import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import './index.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <h1>| ~ Forum Cinema ~ |</h1>
        </header>
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking/:id" element={<Booking />} />
          </Routes>
        </main>
        
        <footer className="footer">
          <p>Кінотеатр Форум. Наше розташування: вулиця Під Дубом, 7Б, Львів, Львівська область</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;