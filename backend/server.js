require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Welcome to NIC Validation System!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
