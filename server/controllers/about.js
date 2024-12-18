const express = require('express');
const app = express();
const db = require('../db/db')

// API to add "About" content
app.post('/about', async (req, res) => {
    try {
        const { title, description } = req.body;

        // Validate input
        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required.' });
        }

        // SQL query to insert the "About" content into the database
        const query = `
            INSERT INTO about (title, description, created_at)
            VALUES ($1, $2, NOW()) RETURNING *;
        `;

        const result = await db.query(query, [title, description]);

        res.status(201).json({
            message: 'About content added successfully.',
            about: result.rows[0],
        });
    } catch (err) {
        console.error('Error adding About content:', err.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// API to fetch all "About" content
app.get('/about', async (req, res) => {
    try {
        const query = 'SELECT * FROM about ORDER BY created_at DESC;';
        const result = await db.query(query);

        res.status(200).json({
            message: 'About content fetched successfully.',
            about: result.rows,
        });
    } catch (err) {
        console.error('Error fetching About content:', err.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// API to update "About" content by ID
app.put('/about/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        // Validate input
        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required.' });
        }

        // SQL query to update the "About" content in the database
        const query = `
            UPDATE about
            SET title = $1, description = $2, updated_at = NOW()
            WHERE id = $3 RETURNING *;
        `;

        const result = await db.query(query, [title, description, id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'About content not found.' });
        }

        res.status(200).json({
            message: 'About content updated successfully.',
            about: result.rows[0],
        });
    } catch (err) {
        console.error('Error updating About content:', err.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// API to delete "About" content by ID
app.delete('/about/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const query = 'DELETE FROM about WHERE id = $1 RETURNING *;';
        const result = await db.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'About content not found.' });
        }

        res.status(200).json({
            message: 'About content deleted successfully.',
            about: result.rows[0],
        });
    } catch (err) {
        console.error('Error deleting About content:', err.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = app;
