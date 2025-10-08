const db = require("../db/connection");


exports.getUsers = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const [result] = await db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email]);
    res.json({ id: result.insertId, name, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    await db.query("UPDATE users SET name=?, email=? WHERE id=?", [name, email, id]);
    res.json({ message: "User updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM users WHERE id=?", [id]);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
