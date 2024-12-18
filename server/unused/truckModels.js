const express = require('express');
const app = express();
const db = require('./db'); // Ensure your db module is configured to connect to PostgreSQL

// API to add a new truck model
app.post('/api/admin/truck-models', async (req, res) => {
    try {
        const { modelName, manufacturer, capacity, engineType } = req.body;

        // Validate input
        if (!modelName || !manufacturer || !capacity || !engineType) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // SQL query to insert the truck model into the database
        const query = `
            INSERT INTO truck_models (model_name, manufacturer, capacity, engine_type, created_at)
            VALUES ($1, $2, $3, $4, NOW()) RETURNING *;
        `;

        const result = await db.query(query, [modelName, manufacturer, capacity, engineType]);

        res.status(201).json({
            message: 'Truck model added successfully.',
            truckModel: result.rows[0],
        });
    } catch (err) {
        console.error('Error adding truck model:', err.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// API to fetch all truck models
app.get('/api/admin/truck-models', async (req, res) => {
    try {
        const query = 'SELECT * FROM truck_models ORDER BY created_at DESC;';
        const result = await db.query(query);

        res.status(200).json({
            message: 'Truck models fetched successfully.',
            truckModels: result.rows,
        });
    } catch (err) {
        console.error('Error fetching truck models:', err.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// API to update a truck model by ID
app.put('/api/admin/truck-models/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { modelName, manufacturer, capacity, engineType } = req.body;

        // Validate input
        if (!modelName || !manufacturer || !capacity || !engineType) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // SQL query to update the truck model in the database
        const query = `
            UPDATE truck_models
            SET model_name = $1, manufacturer = $2, capacity = $3, engine_type = $4, updated_at = NOW()
            WHERE id = $5 RETURNING *;
        `;

        const result = await db.query(query, [modelName, manufacturer, capacity, engineType, id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Truck model not found.' });
        }

        res.status(200).json({
            message: 'Truck model updated successfully.',
            truckModel: result.rows[0],
        });
    } catch (err) {
        console.error('Error updating truck model:', err.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// API to delete a truck model by ID
app.delete('/api/admin/truck-models/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const query = 'DELETE FROM truck_models WHERE id = $1 RETURNING *;';
        const result = await db.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Truck model not found.' });
        }

        res.status(200).json({
            message: 'Truck model deleted successfully.',
            truckModel: result.rows[0],
        });
    } catch (err) {
        console.error('Error deleting truck model:', err.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = app;
