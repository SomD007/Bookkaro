
import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
        <div className="footer-container">
      <div className="footer-top">
        <div className="footer-links">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Contact Us -</a>
          <a href="mailto:bookkaro.support@gmail.com">
            <i className="fas fa-envelope"></i> bookkaro.support@gmail.com
          </a>
          <a href="tel:+919999999999">
            <i className="fas fa-phone"></i> +91 99999 99999
          </a>
        </div>

        <div className="footer-socials">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} <strong>BookKaro</strong>. All rights reserved.</p>
        <p>Crafting seamless event experiences for organisers and attendees.</p>
      </div>
      </div>
    </footer>
  );
}

export default Footer;
