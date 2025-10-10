const db = require("../db/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ✅ Create new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into DB
    await db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
      name,
      email,
      hashedPassword,
    ]);

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt with email:", email); // Log the email being used

    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    console.log("Database query result:", rows); // Log the query result

    if (rows.length === 0) {
      console.log("No user found with this email"); // Log when user not found
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch); // Log password comparison result

    if (!isMatch) {
      console.log("Password does not match"); // Log when password is incorrect
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("JWT token created:", token); // Log the generated token

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error); // Already present, keeps error logging
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ Get all users
exports.getUsers = async (req, res) => {
  try {
    const [users] = await db.query("SELECT id, name, email FROM users");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get all emails
exports.getEmails = async (req, res) => {
  try {
    const [emails] = await db.query("SELECT email FROM users");
    res.json(emails.map((e) => e.email));
  } catch (error) {
    console.error("Error fetching emails:", error);
    res.status(500).json({ message: "Server error" });
  }
};
