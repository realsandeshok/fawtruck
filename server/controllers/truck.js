const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const db = require('../db/db'); // Ensure this is your database connection file

const app = express();

// Directory to store uploaded images
const UPLOADS_DIR = path.join(__dirname, 'truck_uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only image files are allowed.'));
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

// API to create a truck model with image upload
app.post('/trucks', upload.single('image'), async (req, res) => {
    try {
        const { truck_name, truck_name_ar, visibility } = req.body;
        const image = req.file ? req.file.filename : null;

        // Validate input
        if (!truck_name || !truck_name_ar || !image) {
            return res.status(400).json({ message: 'Truck name and image are required.' });
        }

        // SQL query to insert a new truck model
        const query = `
            INSERT INTO truck_models (truck_name, truck_name_ar, image, visibility)
            VALUES ($1, $2, $3, $4) RETURNING *;
        `;

        const result = await db.query(query, [truck_name, truck_name_ar, image, visibility || false]);

        res.status(201).json({
            message: 'Truck model created successfully.',
            truck: result.rows[0],
        });
    } catch (err) {
        console.error('Error creating truck model:', err.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// API to fetch all truck models
app.get('/trucks', async (req, res) => {
    try {
        const query = 'SELECT * FROM truck_models ORDER BY id;';
        const result = await db.query(query);

        // Map image paths to accessible URLs
        const trucks = result.rows.map(truck => ({
            ...truck,
            image_url: `${req.protocol}://${req.get('host')}/truck_uploads/${truck.image}`, // Construct the image URL
        }));

        res.status(200).json({
            message: 'Truck models fetched successfully.',
            trucks: trucks,
        });
    } catch (err) {
        console.error('Error fetching truck models:', err.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


// API to fetch a single truck model by ID
app.get('/trucks/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const query = 'SELECT * FROM truck_models WHERE id = $1;';
        const result = await db.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Truck model not found.' });
        }

        res.status(200).json({
            message: 'Truck model fetched successfully.',
            truck: result.rows[0],
        });
    } catch (err) {
        console.error('Error fetching truck model:', err.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// API to update a truck model by ID
app.put('/trucks/:id', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const { truck_name, truck_name_ar, visibility } = req.body;
        const image = req.file ? req.file.filename : null;

        // Validate input
        if (!truck_name || !truck_name_ar) {
            return res.status(400).json({ message: 'Truck name is required.' });
        }

        let query, params;
        if (image) {
            query = `
                UPDATE truck_models
                SET truck_name = $1, truck_name_ar = $2, image = $3, visibility = $4
                WHERE id = $5 RETURNING *;
            `;
            params = [truck_name, truck_name_ar, image, visibility, id];
        } else {
            query = `
                UPDATE truck_models
                SET truck_name = $1, truck_name_ar = $2, visibility = $3
                WHERE id = $4 RETURNING *;
            `;
            params = [truck_name, truck_name_ar, visibility, id];
        }

        const result = await db.query(query, params);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Truck model not found.' });
        }

        res.status(200).json({
            message: 'Truck model updated successfully.',
            truck: result.rows[0],
        });
    } catch (err) {
        console.error('Error updating truck model:', err.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// API to delete a truck model by ID
app.delete('/trucks/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Get the truck to delete the image file
        const selectQuery = 'SELECT image FROM truck_models WHERE id = $1;';
        const selectResult = await db.query(selectQuery, [id]);

        if (selectResult.rowCount === 0) {
            return res.status(404).json({ message: 'Truck model not found.' });
        }

        const image = selectResult.rows[0].image;

        // Delete the truck model
        const deleteQuery = 'DELETE FROM truck_models WHERE id = $1 RETURNING *;';
        const result = await db.query(deleteQuery, [id]);

        if (image) {
            const imagePath = path.join(UPLOADS_DIR, image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        res.status(200).json({
            message: 'Truck model deleted successfully.',
            truck: result.rows[0],
        });
    } catch (err) {
        console.error('Error deleting truck model:', err.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = app;
