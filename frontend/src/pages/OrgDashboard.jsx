import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './orgDashboard.css';
import { useNavigate } from 'react-router-dom';

const OrgDashboard = () => {
  const [greeting, setGreeting] = useState('');
  const [userName, setUserName] = useState('');
  const [username, setUsername] = useState('');
  const [events, setEvents] = useState([]);
  
  const navigate = useNavigate();

  //  Logout handler
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/logout", {}, { withCredentials: true });
      navigate("/login"); // Redirect to login page
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  //  Get user info from session on mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/get-current-user', { withCredentials: true })
      .then((response) => {
        if (response.data.username && response.data.name) {
          setUsername(response.data.username);
          setUserName(response.data.name);
        } else {
          console.error("User not logged in.");
          navigate("/login"); // 🔁 Redirect if user info is not valid
          
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        navigate("/login"); //  Redirect on error (not authenticated)
      });

    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good Morning 🌞');
    } else if (hour < 18) {
      setGreeting('Good Afternoon ☀️');
    } else {
      setGreeting('Good Evening 🌙');
    }
  }, []);

  // ✅ Fetch events by username
  useEffect(() => {
    const fetchEvents = async () => {
      if (!username) return; // Avoid unnecessary call on initial render
      try {
        const response = await axios.post('http://localhost:5000/events', { username });
        console.log("📦 Events received from backend:", response.data);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, [username]);

  const newEventForm = () => {
    navigate("/org/newevent");
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="greeting-container">
          <h1>
            {greeting}, {userName ? <span>{userName}</span> : <span>Loading...</span>} 👋
          </h1>
          <p>Here’s what’s happening with your events today.</p>
          <p>Your username: {username}</p>
        </div>

        <div className="profile-section">
          <button className="profile-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="create-event-section">
        <button className="create-event-button" onClick={newEventForm}>
          + Create New Event
        </button>
      </div>

      <section className="events-list">
        <h2>All Events</h2>
        <table className="events-table">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Status</th>
              <th>Tickets</th>
              <th>Date/Time</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event._id || event.id}>
                <td>{event.eventName}</td>
                <td className={`status ${event.status?.toLowerCase()}`}>{event.status}</td>
                <td>{event.ticketsSold} / {event.totalTickets}</td>
                <td>{event.date} @ {event.time}</td>
                <td>{event.location}</td>
                <td>
                  <button className="action-btn edit">Edit</button>
                  <button className="action-btn cancel">Cancel</button>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                  No events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default OrgDashboard;
