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

  return (
    <Router>
      {loggedIn && <MyNavbar />}
      
      <Routes>
        {!loggedIn ? (
          <Route path="*" element={<Login setLoggedIn={setLoggedIn} />} />
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
