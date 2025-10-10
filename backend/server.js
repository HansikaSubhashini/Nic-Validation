// server.js
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt"); // for password hashing
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3500;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
});

// Connect to MySQL
connection.connect(err => {
  if (err) throw err;
  console.log("✅ Connected to MySQL database");
});

// Signup route
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if email exists
  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ message: err.message });

      if (results.length > 0) {
        return res.status(400).json({ message: "Email already registered" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user
      connection.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword],
        (err, results) => {
          if (err) return res.status(500).json({ message: err.message });

          res.json({ message: "User registered successfully!" });
        }
      );
    }
  );
});

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt with email:", email); // log the email

  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        console.log("Database error:", err); // log database errors
        return res.status(500).json({ message: err.message });
      }

      if (results.length === 0) {
        console.log("No user found with this email"); // log if user not found
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log("Password match:", passwordMatch); // log password comparison result

      if (!passwordMatch) {
        console.log("Password incorrect"); // log incorrect password
        return res.status(401).json({ message: "Invalid credentials" });
      }

      console.log("Login successful for user:", email); // log successful login
      res.json({ message: "Login successful", token: "mock-jwt-token-1234" });
    }
  );
});


// Start server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
