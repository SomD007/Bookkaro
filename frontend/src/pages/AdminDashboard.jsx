import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminDashboard.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function AdminDashboard() {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [view, setView] = useState("dashboard");

  useEffect(() => {
    fetch("http://localhost:5000/api/get-current-user", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then((data) => {
        setAdminData(data);
        setLoading(false);
      })
      .catch(() => {
        navigate("/");
      });
  }, [navigate]);

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Failed to fetch events", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/users", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Forbidden or not logged in as admin");
        return res.json();
      })
      .then((data) => {
        setOrganizers(data.organizers);
        setAttendees(data.attendees);
      })
      .catch((err) => {
        console.error("Failed to fetch users", err);
        setOrganizers([]);
        setAttendees([]);
      });
  }, []);

  const handleLogout = () => {
    fetch("http://localhost:5000/api/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then(() => navigate("/"))
      .catch((err) => alert("Logout failed"));
  };

  const chartData = [
    { name: "Organisers", count: organizers?.length || 0 },
    { name: "Attendees", count: attendees?.length || 0 },
    { name: "Events", count: events?.length || 0 },
  ];

  const Sidebar = () => (
    <div className="sidebar">
      <h4 className="text-white mb-4">Admin Panel</h4>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <button
            className="btn btn-outline-light w-100"
            onClick={() => setView("dashboard")}
          >
            Dashboard
          </button>
        </li>
        <li className="nav-item mb-2">
          <button
            className="btn btn-outline-light w-100"
            onClick={() => setView("events")}
          >
            Events
          </button>
        </li>
        <li className="nav-item mb-2">
          <button
            className="btn btn-outline-light w-100"
            onClick={() => setView("organizers")}
          >
            Organisers
          </button>
        </li>
        <li className="nav-item mb-2">
          <button
            className="btn btn-outline-light w-100"
            onClick={() => setView("attendees")}
          >
            Attendees
          </button>
        </li>
        <li className="nav-item mt-4">
          <button className="btn logout-btn w-100" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="admin-container d-flex">
      <Sidebar />
      <div className="main-content">
        <div className="admin-profile animate__animated animate__fadeInDown">
          <img src="https://i.pravatar.cc/150?img=32" alt="Admin" />
          <h3>{adminData?.name}</h3>
          <p>{adminData?.username}</p>
        </div>

        {view === "dashboard" && (
          <div className="section mt-5 animate__animated animate__fadeIn">
            <h4 className="section-title">📊 Dashboard Metrics</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {/* <Bar dataKey="count" fill="#cdb4db" barSize={40} animationDuration={1500} /> */}
                <Bar
                  dataKey="count"
                  barSize={40}
                  animationDuration={1500}
                  shape={({ x, y, width, height }) => (
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      rx={6}
                      ry={6}
                      fill="#9b5de5"
                      className="custom-bar"
                    />
                  )}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {view === "events" && (
          <div className="section mt-4 animate__animated animate__fadeIn">
            <h4 className="section-title">📅 Events</h4>
            {events.length > 0 ? (
              <ul className="list-group">
                {events.map((event, index) => (
                  <li key={index} className="list-group-item">
                    <strong>{event.eventName}</strong> — {event.date} at{" "}
                    {event.time}
                    <br />
                    <em>Location:</em> {event.location} | <em>Created by:</em>{" "}
                    {event.createdBy}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="alert alert-warning">No events available.</div>
            )}
          </div>
        )}

        {view === "organizers" && (
          <div className="section mt-4 animate__animated animate__fadeIn">
            <h4 className="section-title">🧑‍💼 Organisers</h4>
            {organizers.length > 0 ? (
              <ul className="list-group">
                {organizers.map((org, index) => (
                  <li key={index} className="list-group-item">
                    <strong>{org.name}</strong> — {org.username}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="alert alert-secondary">No organisers found.</div>
            )}
          </div>
        )}

        {view === "attendees" && (
          <div className="section mt-4 animate__animated animate__fadeIn">
            <h4 className="section-title">👥 Attendees</h4>
            {attendees.length > 0 ? (
              <ul className="list-group">
                {attendees.map((att, index) => (
                  <li key={index} className="list-group-item">
                    <strong>{att.name}</strong> — {att.username}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="alert alert-secondary">No attendees found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
