// src/LoginSignup.jsx
import React, { useState } from 'react';
import './LoginSignup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setResponseMessage('');
  };

  
  const handleSubmit = async (e) => {
    
  e.preventDefault();
    console.log("🧪 Submitting form with:", { fullName, email, password });

  const endpoint = isLogin ? 'login' : 'signup';

  try {
    const res = await axios.post(`http://localhost:5000/api/${endpoint}`, {
      fullName,
      email,
      password,
    }, {
      withCredentials: true  // ✅ Send session cookie to backend
    });

    setResponseMessage(res.data.message);
    alert(res.data.message);

    if (isLogin && res.data.role) {
      // 🔁 Redirect based on role
      if (res.data.role === 'admin') navigate('/admin', {
        state: { receivedData: res.data.user.fullName }
      });
      else if (res.data.role === 'organiser') navigate('/org', {
        state: {
          receivedData: res.data.user.fullName,
          username: res.data.user.email // ✅ Pass email for future use
        }
      });
      else if (res.data.role === 'attendee') navigate('/atn');
      else navigate('/');
    }

  } catch (err) {
    const msg = err.response?.data?.error || 'Something went wrong';
    setResponseMessage(msg);
    alert(msg);
  }
};


  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Create Account"}</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        )}
        <div className="form-group">
          <label>Email (user@adm/org/atn)</label>
          <input
            type="email"
            placeholder="you@adm"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="auth-btn">
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      <p className="toggle-text">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <span onClick={toggleMode} className="toggle-link">
          {isLogin ? "Sign Up" : "Login"}
        </span>
      </p>
      {responseMessage && <p className="response-msg">{responseMessage}</p>}
    </div>
  );
}

export default LoginSignup;
