const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db/db')

const app = express();
app.use(express.json());

// User Registration Endpoint
app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Check if user already exists
        const checkUserQuery = 'SELECT * FROM login WHERE username = $1 OR email = $2';
        const userExists = await db.query(checkUserQuery, [username, email]);

        if (userExists.rows.length > 0) {
            return res.status(409).json({ message: 'User already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into database
        const insertUserQuery = `
            INSERT INTO login (username, password, email, hashedpassword)
            VALUES ($1, $2, $3, $4)
        `;
        await db.query(insertUserQuery, [username, password, email, hashedPassword]);

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = app;


