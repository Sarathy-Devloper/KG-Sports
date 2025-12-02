// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise"); // Use mysql2/promise for async/await
const bcrypt = require("bcryptjs");      // Use bcryptjs, generally preferred over bcrypt for Node
const jwt = require("jsonwebtoken");     // For creating tokens
const { v4: uuidv4 } = require("uuid");  // For generating UUIDs
require('dotenv').config();              // Load environment variables

// Use a connection pool for better performance and resource management
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '', // Use environment variable or default empty
  database: process.env.DB_NAME || 'turf_booking',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection pool (optional, but good practice)
pool.getConnection()
  .then(connection => {
    console.log('Connected to MySQL database via pool!');
    connection.release(); // Release the connection immediately after testing
  })
  .catch(err => {
    console.error('Error connecting to MySQL database:', err.message);
    process.exit(1); // Exit if DB connection fails
  });

// Secret key for JWT (load from environment variables)
const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_jwt_key"; // Fallback for development (CHANGE THIS IN PRODUCTION!)

// Middleware to check for valid JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    console.warn("Authentication attempt without token.");
    return res.sendStatus(401); // No token
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.warn("Invalid or expired token:", err.message);
      return res.sendStatus(403); // Invalid token
    }
    req.user = user;
    next();
  });
};

// --- POST - Google Login ---
router.post("/google-login", async (req, res) => {
  const { name, email, googleId, photo } = req.body;
  let connection;

  try {
    connection = await pool.getConnection();

    // Check if user already exists
    const [rows] = await connection.execute("SELECT id, uuid, username, email, role FROM users WHERE email = ?", [email]);

    let user;
    if (rows.length > 0) {
      user = rows[0]; // Existing user
      // Optional: Update Google ID or photo if it has changed
      // Ensure 'google_id' and 'photo' columns exist in your 'users' table
      await connection.execute("UPDATE users SET google_id = ?, photo = ? WHERE id = ?", [googleId, photo, user.id]);
    } else {
      // Insert new user if not exists
      const userUuid = uuidv4(); // Generate a UUID for the new user
      const [result] = await connection.execute(
        "INSERT INTO users (uuid, username, email, google_id, photo, role) VALUES (?, ?, ?, ?, ?, ?)",
        [userUuid, name, email, googleId, photo, "user"]
      );
      user = { id: result.insertId, uuid: userUuid, username: name, email, googleId, photo, role: "user" }; // Use username for consistency
    }

    // Generate your own JWT for session
    const token = jwt.sign(
      { id: user.id, uuid: user.uuid, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Google login successful", token, user: {
        id: user.id,
        uuid: user.uuid,
        username: user.username, // Send username back
        email: user.email,
        role: user.role,
      }
    });
  } catch (err) {
    console.error("Error during Google login:", err);
    res.status(500).json({ message: "Google login failed", error: err.message });
  } finally {
    if (connection) connection.release(); // Always release the connection
  }
});

// --- POST /api/auth/register ---
// --- POST /api/auth/register ---
router.post("/register", async (req, res) => {
  const { name, email, password, mobile, role } = req.body;
  let connection;

  try {
    connection = await pool.getConnection();

    if (!name || !email || !password || !mobile) {
      return res.status(400).json({ message: 'Name, email, password, and mobile are required.' });
    }

    const [existingUsers] = await connection.execute("SELECT id FROM users WHERE email = ?", [email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userUuid = uuidv4();

    const query = `
  INSERT INTO users (uuid, username, email, password, phoneNumber, role)
  VALUES (?, ?, ?, ?, ?, ?)
`;
    const params = [userUuid, name, email, hashedPassword, mobile, role || 'user'];

    const [result] = await connection.execute(query, params);


    const [newUserRows] = await connection.execute(
      'SELECT id, uuid, username, email, phoneNumber, role, createdAt FROM users WHERE id = ?', // Include photo
      [result.insertId]
    );
    const newUser = newUserRows[0];

    const token = jwt.sign(
      { id: newUser.id, uuid: newUser.uuid, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ message: "User registered successfully!", user: newUser, token });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Registration failed. Please try again.", error: error.message });
  } finally {
    if (connection) connection.release();
  }
});

// --- POST /api/auth/login ---
// --- POST /api/auth/login ---
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let connection;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    connection = await pool.getConnection();

    // Select 'photo' as well
    const [users] = await connection.execute("SELECT id, uuid, username, email, password, role FROM users WHERE email = ?", [email]);

    if (users.length === 0) {
      console.log(`Login attempt for non-existent email: ${email}`);
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const user = users[0];
    const hashedPasswordFromDB = user.password;

    if (!hashedPasswordFromDB) {
      console.error(`User found (${email}) but no hashed password in DB. User object:`, user);
      return res.status(500).json({ message: 'Internal server error: User data incomplete.' });
    }

    const isMatch = await bcrypt.compare(password, hashedPasswordFromDB);
    if (!isMatch) {
      console.log(`Failed login for ${email}: Password mismatch.`);
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: user.id, uuid: user.uuid, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id: user.id,
        uuid: user.uuid,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Login failed. Please try again.", error: error.message });
  } finally {
    if (connection) connection.release();
  }
});

// --- GET /api/auth/profile (Example of a protected route) ---
// This route can only be accessed by authenticated users
router.get("/profile", authenticateToken, async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    // req.user will contain the decoded JWT payload (id, uuid, email, role)
    const [rows] = await connection.execute(
      "SELECT id, uuid, username, email, phoneNumber, role, createdAt FROM users WHERE id = ?", // Select username
      [req.user.id]
    );

    if (rows.length === 0) {
      console.warn(`Profile request for user ID ${req.user.id} but user not found in DB.`);
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ user: rows[0] });

  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Failed to fetch profile.", error: error.message });
  } finally {
    if (connection) connection.release();
  }
});

module.exports = router;