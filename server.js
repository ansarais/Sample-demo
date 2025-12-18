const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('.')); // serve static files like html

// Create database
const db = new sqlite3.Database('./students.db');

// Create table
db.run(`CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    age INTEGER,
    address TEXT
)`);

// Route to handle form submission
app.post('/submit', (req, res) => {
    const { name, age, address } = req.body;
    db.run(`INSERT INTO students (name, age, address) VALUES (?, ?, ?)`, [name, age, address], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Student added successfully', id: this.lastID });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});