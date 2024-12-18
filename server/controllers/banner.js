const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../db/db')


const app = express();

// Directory to store uploaded images
const UPLOADS_DIR = path.join(__dirname, 'uploads');

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
})

// Upload Image Endpoint
app.post('/upload-image', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        const fileName = req.file.filename;
        const filePath = path.join('uploads', fileName);

        // Generate a unique ID for the image
        // const actual_id = Date.now() // You can use UUID for more robust unique ID generation
        // const id = parseInt(actual_id.toString().slice(0, 2), 10);
        // Add uploaded_at timestamp
        const uploadedAt = new Date();

        // Save file metadata to the database
        const query = `
            INSERT INTO images (file_name, file_path, uploaded_at)
            VALUES ($1, $2, $3) RETURNING *;
        `;
        const result = await db.query(query, [fileName, filePath, uploadedAt]);

        res.status(201).json({
            message: 'Image uploaded successfully.',
            image: result.rows[0],
        });
    } catch (err) {
        console.error('Error uploading image:', err.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = app;
