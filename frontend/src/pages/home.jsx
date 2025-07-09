import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; //To Navigate

//import Layout from './layout.jsx';
import './home.css';
import About from './About.jsx';
import heroImage from '../assets/hero.jpg'; // Replace with your image path
import Open from './open.png';
//import LoginSignup from './LoginSignup.jsx';

function Homepage() {
  const [name, setName] = useState('');
  const [postResponse, setPostResponse] = useState('');
  const [getMessage, setGetMessage] = useState('');
  const navigate = useNavigate(); // ✅ This defines `navigate`

  // GET request when homepage loads
  useEffect(() => {
    async function fetchMessage() {
      const res = await fetch('http://localhost:5000/api/message');
      const data = await res.json();
      setGetMessage(data.message);
    }
    fetchMessage();
  }, []);

  // POST request to send name to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/send-name', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    setPostResponse(data.message);
  };

  return (

    /*
    <div>
      <h1>This is Home Page</h1>

      <p>Message from backend (GET): {getMessage}</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Send Name</button>
      </form>

      {postResponse && <p>Response from backend (POST): {postResponse}</p>}
    </div>

    */

<div className="homepage-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to <span>BOOKKARO</span></h1>
          <p>Your ultimate solution to plan, manage, and execute events effortlessly.</p>
          <button className="cta-button" onClick={() => navigate("/login")}>Get Started</button>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Event Planning" />
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <h2>Why Choose BOOKKARO?</h2>
        <div className="feature-cards">
          <div className="card">
            <img src="https://img.icons8.com/dusk/64/000000/calendar--v2.png" alt="Schedule" />
            <h3>Create & Manage Events</h3>
            <p>Easily set up events, schedules, and more in just a few clicks.</p>
          </div>
          <div className="card">
            <img src="https://img.icons8.com/dusk/64/000000/ticket.png" alt="Ticketing" />
            <h3>Online Ticketing</h3>
            <p>Generate and sell tickets securely with integrated payments.</p>
          </div>
          <div className="card">
            <img src={Open} alt="RSVP" />
            <h3>RSVP & Guest Management</h3>
            <p>Track attendees, send reminders, and manage check-ins smoothly.</p>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="gallery">
        <h2>Our App in Action</h2>
        <div className="gallery-grid">
          <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d" alt="Dashboard" />
          <img src="https://images.unsplash.com/photo-1746690052490-ed3bfbedb702?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRpY2tldGluZ3xlbnwwfHwwfHx8MA%3D%3D" alt="Ticketing" />
          <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2" alt="RSVP" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonials-list">
          <blockquote>
            “BOOKKARO streamlined our conference planning process—everything was seamless.”
            <footer>— Priya, Event Manager</footer>
          </blockquote>
          <blockquote>
            “Ticket sales and guest check-ins finally became hassle-free. Love this app!”
            <footer>— Rajesh, Corporate Events</footer>
          </blockquote>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} BOOKKARO. All rights reserved.</p>
        <div className="footer-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
        </div>
      </footer>

      
        
      
    </div>




  );
}

export default Homepage;
