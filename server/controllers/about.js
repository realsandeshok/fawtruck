const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../db/db');

const app = express();

// Directory for storing uploaded images
const aboutUploadsDir = path.join(__dirname, 'about_uploads');
if (!fs.existsSync(aboutUploadsDir)) {
    fs.mkdirSync(aboutUploadsDir, { recursive: true });
}

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, aboutUploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const isMimeTypeValid = allowedTypes.test(file.mimetype);
        const isExtNameValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());

        if (isMimeTypeValid && isExtNameValid) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed (jpeg, jpg, png, gif).'));
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});


app.post('/about', upload.single('image'), async (req, res) => {
    try {
        const { title,description, visibility } = req.body;
        const file_name = req.file ? req.file.filename : null;

        // Validate input
        if (!title || !description || !file_name) {
            return res.status(400).json({ message: 'about and image are required.' });
        }

        // SQL query to insert a new truck model
        const query = `
            INSERT INTO about (title,description, file_name, visibility)
            VALUES ($1, $2, $3,$4) RETURNING *;
        `;

        const result = await db.query(query, [title,description, file_name, visibility || false]);

        res.status(201).json({
            message: 'about created successfully.',
            truck: result.rows[0],
        });
    } catch (err) {
        console.error('Error creating truck model:', err.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// API to add "About" content with an optional image
// app.post('/about', upload.single('image'), async (req, res) => {
//     try {
//         const { title, description } = req.body;

//         if (!req.file) {
//             return res.status(400).json({ message: 'No file uploaded.' });
//         }

//         if (!title || !description) {
//             return res.status(400).json({ message: 'Title and description are required.' });
//         }

//         const fileName = req.file.filename;
//         const filePath = path.join('banner_uploads', fileName);
//         const createdAt = new Date();

//         // Save file metadata, title, and description to the database
//         const query = `
//             INSERT INTO images (title, description, created_at, file_name, file_path)
//             VALUES ($1, $2, $3, $4, $5) RETURNING *;
//         `;
//         const result = await db.query(query, [title, description, createdAt, fileName, filePath]);

//         res.status(201).json({
//             message: 'Image uploaded successfully.',
//             image: result.rows[0],
//         });
//     } catch (err) {
//         console.error('Error uploading image:', err.message);
//         res.status(500).json({ message: 'Internal server error.' });
//     }
// });


// API to fetch all "About" content
app.get('/about', async (req, res) => {
    try {
        const query = 'SELECT * FROM about ORDER BY created_at DESC;';
        const result = await db.query(query);

        const aboutContent = result.rows.map((row) => {
            return {
                ...row,
                imageUrl: row.image ? `${req.protocol}://${req.get('host')}/about_uploads/${row.image}` : null,
            };
        });

        res.status(200).json({
            message: 'About content fetched successfully.',
            about: aboutContent,
        });
    } catch (err) {
        console.error('Error fetching About content:', err.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// API to update "About" content by ID with an optional image
app.put('/about/:id', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const image = req.file ? req.file.filename : null;

        // Validate input
        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required.' });
        }

        // Fetch existing data to delete the old image if a new one is uploaded
        const selectQuery = 'SELECT image FROM about WHERE id = $1';
        const selectResult = await db.query(selectQuery, [id]);

        if (selectResult.rowCount === 0) {
            return res.status(404).json({ message: 'About content not found.' });
        }

        const oldImage = selectResult.rows[0].image;

        // SQL query to update the "About" content in the database
        const updateQuery = `
            UPDATE about
            SET title = $1, description = $2, image = COALESCE($3, image), updated_at = NOW()
            WHERE id = $4 RETURNING *;
        `;

        const result = await db.query(updateQuery, [title, description, image, id]);

        // Delete the old image if a new one is uploaded
        if (image && oldImage) {
            const oldImagePath = path.join(aboutUploadsDir, oldImage);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
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

        // Fetch existing data to delete the image
        const selectQuery = 'SELECT image FROM about WHERE id = $1';
        const selectResult = await db.query(selectQuery, [id]);

        if (selectResult.rowCount === 0) {
            return res.status(404).json({ message: 'About content not found.' });
        }

        const image = selectResult.rows[0].image;

        // SQL query to delete the "About" content from the database
        const deleteQuery = 'DELETE FROM about WHERE id = $1 RETURNING *;';
        const result = await db.query(deleteQuery, [id]);

        // Delete the image file
        if (image) {
            const imagePath = path.join(aboutUploadsDir, image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
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
