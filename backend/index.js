// index.js
const express = require("express");
const cors = require("cors");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const orgDetail = require("./models/orgSchema.js");
const admDetail = require("./models/adminSchema.js");
const atnDetail = require("./models/attendeeSchema.js");
const Event = require("./models/eventSchema.js");

const app = express();
const PORT = 5000;

//  Enable CORS and allow cookies from frontend
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true         // important to send/get cookies
}));

//  Parse JSON request bodies
app.use(express.json());

// 🔗 Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/bookkaro', {
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

//  Setting up session middleware, storing sessions in MongoDB
app.use(session({
  secret: 'replace_with_env_var',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/bookkaro',
    collectionName: 'sessions'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    secure: false
  }
}));

//  Utility to check user role from username suffix 
function getRoleFromUsername(username) {
  if (username.endsWith('@adm')) return 'admin';
  if (username.endsWith('@org')) return 'organiser';
  if (username.endsWith('@atn')) return 'attendee';
  return null;
}

// 🛡️ Middleware to allow only admin access
function requireAdmin(req, res, next) {
  if (req.session.username?.endsWith('@adm')) return next();
  return res.status(403).json({ error: 'Unauthorized admin access' });
}

//  Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { fullName, email, password } = req.body;
  const role = getRoleFromUsername(email);
  if (!role) return res.status(400).json({ error: 'Invalid email format (@adm/org/atn).' });

  try {
    const Model = role === 'admin' ? admDetail :
                  role === 'organiser' ? orgDetail : atnDetail;
    const existingUser = await Model.findOne({ username: email });
    if (existingUser) return res.status(409).json({ error: 'User already exists.' });

    const newUser = new Model({ name: fullName, username: email, password });
    await newUser.save();
    console.log(`✅ ${role} saved to MongoDB:`, newUser);

    res.json({ message: `Signup successful as ${role}` });
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ error: 'Server error during signup' });
  }
});

//  Login endpoint with scessions
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("Test Value: ",email);

  const role = getRoleFromUsername(email);
  if (!role) return res.status(400).json({ error: 'Invalid email format.' });

  try {
    const Model = role === 'admin' ? admDetail :
                  role === 'organiser' ? orgDetail : atnDetail;

    const user = await Model.findOne({ username: email, password });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    req.session.username = user.username;
    req.session.name = user.name;
    console.log(`🧾 ${role} logged in:`, user.username);

    res.json({
      message: `Login successful as ${role}`,
      role,
      user: {
        fullName: user.name,
        email: user.username
      }
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

//  Get current username and name from session
app.get("/api/get-current-user", (req, res) => {
  if (req.session.username && req.session.name) {
    res.json({ username: req.session.username, name: req.session.name });
  } else {
    res.status(401).json({ error: "User not logged in" });
  }
});

//  Send messages
app.post('/api/send-name', (req, res) => {
  const { name } = req.body;
  console.log("received:", name);
  res.json({ message: `Hello, ${name}!` });
});

app.get('/api/send-name', (req, res) => res.json({}));
app.get("/api/message", (req, res) => {
  res.json({ message: "Hello From Express!" });
});

//To Receive event data
app.post('/api/create-event', async (req, res) => {
  try{
    const eventData = req.body;
    const newEvent = new Event(eventData);
    await newEvent.save();
    console.log("🎉 New Event Received:", newEvent);
    res.status(200).json({ message: "Event created successfully" });
  }catch(err){
    console.log("❌ Error saving event:", err);
    res.status(500).json({error : "❌ Failed to save event"});
  }
});

app.post("/events", async (req, res)=>{
  const {username} = req.body;
  try{
    const userEvents = await Event.find({createdBy: username});
    res.json(userEvents);
  }catch(error){
    console.error("Error fetching Events", error);
    res.status(500).json({error: "Something Went Wrong"});
  }
});

// GET /api/events - get all events
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find({});
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// 🔐 Admin-only: Get all users
app.get('/api/admin/users', requireAdmin, async (req, res) => {
  try {
    const organizers = await orgDetail.find({}, 'name username');
    const attendees = await atnDetail.find({}, 'name username');
    res.json({ organizers, attendees });
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// 🔐 Admin-only: Get all events
app.get('/api/admin/events', requireAdmin, async (req, res) => {
  try {
    const events = await Event.find({});
    res.json(events);
  } catch (err) {
    console.error("❌ Error fetching events:", err);
    res.status(500).json({ error: 'Error fetching events' });
  }
});

// 🔐 Admin-only: Delete event
app.delete('/api/admin/event/:id', requireAdmin, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error("❌ Error deleting event:", err);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

// logout route
app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("❌ Error during logout:", err);
      return res.status(500).json({ error: "Logout failed" });
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out' });
  });
});

//Starting the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
