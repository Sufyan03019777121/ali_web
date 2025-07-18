import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyNavbar from './components/navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    // If not logged in, show only Login page
    return <Login setLoggedIn={setLoggedIn} />;
  }

  // If logged in, show Navbar and Routes
  return (
    <Router>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
