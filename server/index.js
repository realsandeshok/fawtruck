const cors = require('cors');
const express = require("express");
// const multer = require('multer');
const dotenv = require("dotenv");
const registerRoutes = require("./controllers/register");
const loginRoutes = require("./controllers/login");
const bannerRoutes = require("./controllers/banner");
const truckRoutes = require("./controllers/truck");
const aboutRoutes = require("./controllers/about");
// const uaRoutes= require('./UARoutes');
const db = require("./db/db");
const { verifyAdmin } = require("./middleware/authMiddleware"); // Updated import

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Public route
// app.get('/api/public', (req, res) => {
//     res.status(200).json({ message: 'Welcome to the public route!' });
// });

// Protected route (requires login)
// app.get('/api/admin/protected', verifyToken, (req, res) => {
//     res.status(200).json({ message: `Hello, ${req.user.username}!` });
// });

// Admin-only route
// app.get('/api/admin-panel/', verifyAdmin, (req, res) => {
//     res.status(200).json({ message: 'Welcome, admin!' });
// });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())  // if name of your backend is app

// Routes
app.use("/api/admin", loginRoutes); // Ready
app.use("/api/admin", verifyAdmin, registerRoutes); // Add base paths // Ready
app.use("/api/admin", verifyAdmin, bannerRoutes); // Ready
app.use("/api/admin", verifyAdmin, aboutRoutes); // Ready
app.use("/api/admin", verifyAdmin, truckRoutes); // Ready
// app.use(uaRoutes);

// Test Database Connection
(async () => {
  try {
    await db.query("SELECT NOW()");
    console.log("Database connection successful.");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
})();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
