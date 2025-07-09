import { useState, useEffect } from 'react';
import React from 'react';
import './About.css';
//import Layout from './layout.jsx';

function About() {
  const [getMessage, setGetMessage] = useState('');

  useEffect(() => {
    async function fetchMessage() {
      const res = await fetch('http://localhost:5000/api/message');
      const data = await res.json();
      setGetMessage(data.message);
    }
    fetchMessage();
  }, []);

  return (
    /*
    <div>
      <h1>This is About Page</h1>
      <p>Message from backend (GET): {getMessage}</p>

    </div>
    */




    <div className="about-container">
      {/* Title Section */}
      <section className="about-header">
        <h1>Welcome to BOOKKARO</h1>
        <p>Your One-Stop Solution for All Event Management Needs</p>
      </section>

      {/* Description Section */}
      <section className="about-description">
        <h2>Who Are We?</h2>
        <p>
          BOOKKARO is an innovative Event Management System designed to simplify and elevate your event planning experience.
          From birthdays and weddings to corporate functions, we make event planning smooth, seamless, and stress-free.
        </p>
      </section>

      {/* Founders Section */}
      <section className="about-founders">
        <h2>Meet Our Founders</h2>
        <div className="founders-grid">
          {/* Founder Cards */}
          {['Astha', 'Anjali', 'Soum', 'Kaushal', 'Jibak', 'Disha', 'Ankush'].map((name, index) => (
            <div key={index} className="founder-card">
              <div className="founder-avatar">{name.charAt(0)}</div>
              <h3>{name}</h3>
              <p>BCA Student<br />Arka Jain University</p>
            </div>
          ))}
        </div>
      </section>

{/* Enhanced Interactive Section */}
<section className="about-interactive">
  <h2>Why Choose BOOKKARO?</h2>
  <div className="features-grid">
    <div className="feature-card">
      <span className="feature-icon">🎯</span>
      <h3>Targeted Planning</h3>
      <p>Plan events tailored to your unique needs and audience with precision.</p>
    </div>
    <div className="feature-card">
      <span className="feature-icon">💼</span>
      <h3>All-in-One Solution</h3>
      <p>Manage venues, vendors, budgets, and schedules — all from one dashboard.</p>
    </div>
    <div className="feature-card">
      <span className="feature-icon">⚡</span>
      <h3>Instant Booking</h3>
      <p>Real-time availability and fast confirmations with our smart booking system.</p>
    </div>
    <div className="feature-card">
      <span className="feature-icon">📱</span>
      <h3>Mobile Friendly</h3>
      <p>Access and manage events anytime, anywhere — right from your phone.</p>
    </div>
  </div>
  <button className="explore-button" onClick={() => alert("Let's get your event started!")}>
    Explore Now
  </button>
</section>

    </div>




  );
}

export default About;
