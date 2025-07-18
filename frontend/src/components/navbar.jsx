import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyNavbar = () => {

  useEffect(() => {
    const navbarCollapse = document.getElementById('navbarNav');
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        // Check if navbar is open
        if (navbarCollapse.classList.contains('show')) {
          // Collapse it
          const bsCollapse = new window.bootstrap.Collapse(navbarCollapse, {
            toggle: true
          });
          bsCollapse.hide();
        }
      });
    });

    // Cleanup event listeners on unmount
    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('click', () => {});
      });
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">GoldRates</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MyNavbar;
