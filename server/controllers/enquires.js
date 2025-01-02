const express = require('express');
const app = express();
const db = require('../db/db');

// Middleware to parse JSON request bodies
app.use(express.json());

// API to add a new enquiry
app.post('/enquiries', async (req, res) => {
    try {
        const { name, country, contact, message } = req.body;

        // Validate input
        if (!name || !country || !contact || !message) {
            return res.status(400).json({ message: 'Name, country, contact, and message are required.' });
        }

        // SQL query to insert the enquiry into the database
        const query = `
            INSERT INTO enquiries (name, country, contact, message, created_at)
            VALUES ($1, $2, $3, $4, NOW()) RETURNING *;
        `;

        const result = await db.query(query, [name, country, contact, message]);

        res.status(201).json({
            message: 'Enquiry added successfully.',
            enquiry: result.rows[0],
        });
    } catch (err) {
        console.error('Error adding enquiry:', err.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// API to fetch all enquiries
app.get('/enquiries', async (req, res) => {
    try {
        const query = 'SELECT * FROM enquiries ORDER BY created_at DESC;';
        const result = await db.query(query);

        res.status(200).json({
            message: 'Enquiries fetched successfully.',
            enquiries: result.rows,
        });
    } catch (err) {
        console.error('Error fetching enquiries:', err.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// API to update an enquiry by ID
app.put('/enquiries/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, country, contact, message } = req.body;

        // Validate input
        if (!name || !country || !contact || !message) {
            return res.status(400).json({ message: 'Name, country, contact, and message are required.' });
        }

        // SQL query to update the enquiry in the database
        const query = `
            UPDATE enquiries
            SET name = $1, country = $2, contact = $3, message = $4, updated_at = NOW()
            WHERE id = $5 RETURNING *;
        `;

        const result = await db.query(query, [name, country, contact, message, id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Enquiry not found.' });
        }

        res.status(200).json({
            message: 'Enquiry updated successfully.',
            enquiry: result.rows[0],
        });
    } catch (err) {
        console.error('Error updating enquiry:', err.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// API to delete an enquiry by ID
app.delete('/enquiries/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const query = 'DELETE FROM enquiries WHERE id = $1 RETURNING *;';
        const result = await db.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Enquiry not found.' });
        }

        res.status(200).json({
            message: 'Enquiry deleted successfully.',
            enquiry: result.rows[0],
        });
    } catch (err) {
        console.error('Error deleting enquiry:', err.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = app;
