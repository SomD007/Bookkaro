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

  const navigate = useNavigate(); // initialize navigation

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
        navigate('/login'); //auto-redirect to login if not logged in
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
        navigate('/login'); // Redirect to login after logout
      })
      .catch(err => {
        console.error('Logout error:', err);
      });
  };

  const displayedEvents = showAllEvents ? events : events.slice(0, 4);

  return (
    <div className="atn-dashboard">
      <h1 className="dashboard-title">{greeting}, <span>{userName || 'Attendee'}!</span></h1>

      <button onClick={handleLogout} className="logout-btn" style={{ marginBottom: '20px' }}>Logout</button>

      <div className="section">
        <h2 className="section-title">✨ New Events to Register</h2>
        <div className="new-events">
          {displayedEvents.map(event => (
            <div key={event._id || event.id} className="event-card new">
              {event.imgLink && <img src={event.imgLink} alt={event.eventName} />}
              <div className="event-info">
                <h3>{event.eventName}</h3>
                <p>{new Date(event.date).toLocaleDateString()}</p>
                <button onClick={() => handleRegister(event._id || event.id)}>Register</button>
              </div>
            </div>
          ))}
        </div>
        {events.length > 4 && (
          <button className="show-more-btn" onClick={() => setShowAllEvents(!showAllEvents)} style={{ marginTop: '10px' }}>
            {showAllEvents ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>
    </div>
  );
};

export default AtnDashboard;
