import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AtnDashboard.css';
import { useNavigate } from 'react-router-dom';

const AtnDashboard = () => {
  const [greeting, setGreeting] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [events, setEvents] = useState([]);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [expandedEventId, setExpandedEventId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/api/events', { withCredentials: true })
      .then(res => {
        if (Array.isArray(res.data)) {
          setEvents(res.data);
        } else {
          console.error('Unexpected event data format', res.data);
        }
      })
      .catch(err => {
        console.error('Error fetching events:', err);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/api/get-current-user', { withCredentials: true })
      .then(res => {
        setUserName(res.data.name);
        setUserEmail(res.data.username);
      })
      .catch(err => {
        console.error('Error fetching user info:', err);
        navigate('/login');
      });
  }, [navigate]);

  const handleRegister = (eventId) => {
    alert(`You have registered for event ID: ${eventId}`);
  };

  const handleLogout = () => {
    axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true })
      .then(() => {
        alert('Logged out successfully');
        setUserName('');
        setUserEmail('');
        setEvents([]);
        navigate('/login');
      })
      .catch(err => {
        console.error('Logout error:', err);
      });
  };

  const toggleEventDetails = (id) => {
    setExpandedEventId(prevId => (prevId === id ? null : id));
  };

  const displayedEvents = showAllEvents ? events : events.slice(0, 4);

  return (
    <div className="atn-dashboard">
      <h1 className="dashboard-title">{greeting}, <span>{userName || 'Attendee'}!</span></h1>

      <button onClick={handleLogout} className="logout-btn">Logout</button>

      <div className="section">
        <h2 className="section-title">✨ New Events to Register</h2>
        <div className="new-events">
          {displayedEvents.map(event => (
            <div key={event._id || event.id} className="event-card new">
              {event.eventBanner && (
                <img src={event.eventBanner} alt={event.eventName} className="event-banner" />
              )}
              <div className="event-info">
                <h3>{event.eventName}</h3>
                <p>🎟 Tickets Left: <strong>Coming Soon</strong></p>
                <button onClick={() => toggleEventDetails(event._id || event.id)}>
                  {expandedEventId === (event._id || event.id) ? 'Hide Details' : 'View Details'}
                </button>
                <button onClick={() => handleRegister(event._id || event.id)}>Register</button>
              </div>

              {expandedEventId === (event._id || event.id) && (
                <div className="event-details">
                  <p><strong>Description:</strong> {event.description || 'No description provided.'}</p>
                  <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
                  <p><strong>Location:</strong> {event.location || 'To be announced'}</p>
                  {event.organizer && <p><strong>Organizer:</strong> {event.organizer}</p>}
                  {event.category && <p><strong>Category:</strong> {event.category}</p>}
                  {/* Add more fields here if needed */}
                </div>
              )}

            </div>
          ))}
        </div>

        {events.length > 4 && (
          <button className="show-more-btn" onClick={() => setShowAllEvents(!showAllEvents)}>
            {showAllEvents ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>
    </div>
  );
};

export default AtnDashboard;
