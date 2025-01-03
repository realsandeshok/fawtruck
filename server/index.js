const cors = require('cors');
const express = require("express");
const path = require('path');
const dotenv = require("dotenv");
const registerRoutes = require("./controllers/register");
const loginRoutes = require("./controllers/login");
const bannerRoutes = require("./controllers/banner");
const truckRoutes = require("./controllers/truck");
const aboutRoutes = require("./controllers/about");
const enquiryRoutes = require("./controllers/enquires")
// const uaRoutes= require('./UARoutes');
const db = require("./db/db");
const { verifyAdmin } = require("./middleware/authMiddleware"); // Updated import

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())  // if name of your backend is app
app.use('/truck_uploads', express.static(path.join(__dirname, 'controllers/truck_uploads')));
app.use('/banner_uploads', express.static(path.join(__dirname, 'controllers/banner_uploads')));


// Routes
app.use("/api/admin",  loginRoutes); // Ready
app.use("/api/admin",  registerRoutes); // Ready

//adminn protected routes
// app.use("/api/admin",verifyAdmin,  bannerRoutes); // Ready
// app.use("/api/admin",verifyAdmin,  aboutRoutes); // Ready
// app.use("/api/admin",verifyAdmin,  truckRoutes); // Ready
// app.use("/api/admin",verifyAdmin,  enquiryRoutes); // Ready

//web public routes
app.use("/api",  bannerRoutes); // Ready
app.use("/api",  aboutRoutes); // Ready
app.use("/api",  truckRoutes); // Ready
app.use("/api",  enquiryRoutes); // Ready

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
