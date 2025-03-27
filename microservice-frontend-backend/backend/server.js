require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise"); // Use promise-based MySQL
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOSTNAME || "localhost",
  user: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "90123456",
  database: process.env.DB_NAME || "k8test",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Function to initialize the database and create table
async function initDB() {
  try {
    const connection = await pool.getConnection();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        task VARCHAR(255) NOT NULL
      )
    `);
    connection.release();
    console.log("Database initialized: todos table is ready.");
  } catch (err) {
    console.error("DB Initialization Failed!", err);
  }
}

// Call database initialization
initDB();

// GET all todos
app.get("/todos", async (req, res) => {
  try {
    const [todos] = await pool.query("SELECT * FROM todos");
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new todo
app.post("/todos", async (req, res) => {
  try {
    const { task } = req.body;
    const [result] = await pool.query("INSERT INTO todos (task) VALUES (?)", [task]);
    res.json({ id: result.insertId, task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
