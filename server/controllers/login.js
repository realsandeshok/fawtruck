const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const db = require('../db/db')
require('dotenv').config();

const app = express();
app.use(express.json());

// Login Endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        // Fetch user from database
        const query = 'SELECT * FROM login WHERE username = $1';
        const result = await db.query(query, [username]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password, pahela err' });
        }

        const user = result.rows[0];
        const hashedPassword = user.hashedpassword; // Adjust to match your database schema

        // Compare the hashed password
        const isPasswordValid = await bcrypt.compare(password, hashedPassword);
        // const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password, dusra err' });
        }

        // Generate JWT token with role
            const token = jwt.sign(
                { id: user.id, username: user.username, role: user.role }, // Add user role here
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );


        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = app;
