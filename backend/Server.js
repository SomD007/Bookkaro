const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'school'
};

// Create database connection
async function createConnection() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    return connection;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}

// API endpoint to get student data
app.get('/api/student', async (req, res) => {
  const studentId = parseInt(req.query.id);

  // Validate student ID
  if (!studentId || studentId <= 0) {
    return res.json({
      status: 'error',
      message: 'Invalid student ID'
    });
  }

  let connection;

  try {
    // Create database connection
    connection = await createConnection();

    // Prepare and execute query
    const [rows] = await connection.execute(
      'SELECT * FROM students WHERE id = ?',
      [studentId]
    );

    if (rows.length > 0) {
      res.json({
        status: 'success',
        data: rows[0]
      });
    } else {
      res.json({
        status: 'error',
        message: 'Student not found'
      });
    }

  } catch (error) {
    console.error('Database error:', error);
    res.json({
      status: 'error',
      message: 'Database connection failed'
    });
  } finally {
    // Close connection
    if (connection) {
      await connection.end();
    }
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Student API endpoint: http://localhost:${PORT}/api/student?id=1`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nServer shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\nServer shutting down gracefully...');
  process.exit(0);
});