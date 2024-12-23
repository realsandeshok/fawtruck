const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../db/db')


const app = express();

// Directory to store uploaded images
const UPLOADS_DIR = path.join(__dirname, 'banner_uploads');

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
app.post('/upload-banner', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        const fileName = req.file.filename;
        const filePath = path.join('banner_uploads', fileName);

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

// GET ALL THE BANNERS
app.get('/banner', async (req, res) => {
    try {
        // Fetch all banner data from the database
        const query = `
            SELECT id, file_name, file_path, uploaded_at
            FROM images
            ORDER BY uploaded_at DESC;
        `;
        const result = await db.query(query);

        // Construct full image URLs
        const baseURL = `${req.protocol}://${req.get('host')}`;
        const banners = result.rows.map(banner => ({
            ...banner,
            image_url: `${baseURL}/${banner.file_path}`
        }));

        // console.log(banners)
        // Respond with the banner data
        res.status(200).json({
            message: 'Banners retrieved successfully.',
            banners,
        });
    } catch (err) {
        console.error('Error fetching banners:', err.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// DELETE a banner by ID
app.delete('/banner/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch the banner details to get the file path
        const selectQuery = `SELECT file_path FROM images WHERE id = $1;`;
        const selectResult = await db.query(selectQuery, [id]);

        if (selectResult.rows.length === 0) {
            return res.status(404).json({ message: 'Banner not found.' });
        }

        const { file_path: filePath } = selectResult.rows[0];
        const fullPath = path.join(__dirname, filePath);

        // Delete the file from the server
        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
        } else {
            console.warn(`File not found: ${fullPath}`);
        }

        // Delete the banner record from the database
        const deleteQuery = `DELETE FROM images WHERE id = $1;`;
        await db.query(deleteQuery, [id]);

        res.status(200).json({ message: 'Banner deleted successfully.' });
    } catch (err) {
        console.error('Error deleting banner:', err.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


module.exports = app;
