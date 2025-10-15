const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3500;

// ✅ CORS configuration
app.use(
  cors({
    origin: "http://localhost:3000", // React app’s URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// ✅ Serve uploaded files statically (optional but useful)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "node_app_db",
});

connection.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database");
  }
});

// ======================= ROUTES =======================

// ✅ Root route
app.get("/", (req, res) => {
  res.send("NIC Validation Backend Running 🚀");
});

// ✅ Signup route
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  connection.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password],
    (err) => {
      if (err) {
        console.error("❌ Signup error:", err);
        return res.status(500).json({ message: "Database error" });
      }
      res.status(201).json({ message: "User signed up successfully!" });
    }
  );
});

// ✅ Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  connection.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) {
        console.error("❌ Login error:", err);
        return res.status(500).json({ message: "Database error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const user = results[0];

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || "secret123",
        { expiresIn: "1h" }
      );

      res.status(200).json({
        message: "Login successful",
        token,
        user,
      });
    }
  );
});

//File Upload 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.post(
  "/upload",
  upload.fields([
    { name: "file1", maxCount: 1 },
    { name: "file2", maxCount: 1 },
    { name: "file3", maxCount: 1 },
    { name: "file4", maxCount: 1 },
  ]),
  (req, res) => {
    console.log("✅ Uploaded files:", req.files);

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    res.json({
      message: "Files uploaded successfully",
      files: req.files,
    });
  }
);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
