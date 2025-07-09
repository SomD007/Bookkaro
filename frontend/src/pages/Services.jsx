// src/pages/Services.jsx

import React from 'react';
import './layout.css'; // Ensure your global styles are available

const Services = () => {
  const services = [
    {
      icon: '🎟️',
      title: 'Event Booking',
      desc: 'Easily browse and register for events tailored to your interests.',
    },
    {
      icon: '🧾',
      title: 'Role Management',
      desc: 'Separate dashboards and access levels for Admins, Organisers, and Attendees.',
    },
    {
      icon: '🗓️',
      title: 'Create & Manage Events',
      desc: 'Organisers can create, publish, and manage events in real-time.',
    },
    {
      icon: '🔐',
      title: 'Secure Login',
      desc: 'Session-based authentication ensures your privacy and data safety.',
    },
  ];

  return (
    <div className="layout">
     <div className="services-heading-wrapper">
  <h1 className="page-heading services-header">💼 Our Services</h1>
  <p className="page-subtext services-subtext">
    Empowering event experiences for admins, organisers, and attendees alike.
  </p>
</div>
 <div className="services-grid">
        {services.map((service, idx) => (
          <div className="service-card" key={idx}>
            <div className="service-icon">{service.icon}</div>
            <h2 className="service-title">{service.title}</h2>
            <p className="service-desc">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
