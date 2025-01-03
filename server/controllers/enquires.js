const express = require("express");
const app = express();
const db = require("../db/db");
const nodemailer = require("nodemailer");

// Middleware to parse JSON request bodies
app.use(express.json());

// API to add a new enquiry
app.post("/enquiries", async (req, res) => {
    try {
      const { name, country, contact, email, message } = req.body;
  
      // Validate input
      if (!name || !country || !contact || !email || !message) {
        return res.status(400).json({
          message: "Name, country, contact, email, and message are required.",
        });
      }
  
      // SQL query to insert the enquiry into the database
      const query = `
        INSERT INTO enquiries (name, country, contact, email, message, created_at)
        VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *;
      `;
  
      const result = await db.query(query, [
        name,
        country,
        contact,
        email,
        message,
      ]);
  
      const insertedEnquiry = result.rows[0];
  
      // Send an email to the user using nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail", // Use your email service
        auth: {
          user: process.env.EMAIL_USER, // Your email
          pass: process.env.EMAIL_PASS, // Your email password
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to: email, // Recipient's email
        subject: "Thank you for your enquiry at FAWTRUCK",
        text: `
          Hi ${name},
          
          Thank you for reaching out to us. We have received your enquiry with the following details:
          
          Name: ${name}
          Country: ${country}
          Contact: ${contact}
          Message: ${message}
          
          Our team will review your enquiry and get back to you shortly.
          
          Best regards,
          FAWTRUCK
        `,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(201).json({
        message: "Enquiry added successfully and confirmation email sent.",
        enquiry: insertedEnquiry,
      });
    } catch (err) {
      console.error("Error adding enquiry or sending email:", err.message);
      res.status(500).json({ message: "Internal server error." });
    }
  });

// API to fetch all enquiries
app.get("/enquiries", async (req, res) => {
  try {
    const query = "SELECT * FROM enquiries ORDER BY created_at DESC;";
    const result = await db.query(query);

    res.status(200).json({
      message: "Enquiries fetched successfully.",
      enquiries: result.rows,
    });
  } catch (err) {
    console.error("Error fetching enquiries:", err.message);
    res.status(500).json({ message: "Internal server error." });
  }
});

// API to update an enquiry by ID
app.put("/enquiries/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, country, contact, email, message } = req.body;

    // Validate input
    if (!name || !country || !contact || !email || !message) {
      return res
        .status(400)
        .json({
          message: "Name, country, contact, email, and message are required.",
        });
    }

    // SQL query to update the enquiry in the database
    const query = `
            UPDATE enquiries
            SET name = $1, country = $2, contact = $3, email = $4, message = $5, updated_at = NOW()
            WHERE id = $6 RETURNING *;
        `;

    const result = await db.query(query, [
      name,
      country,
      contact,
      email,
      message,
      id,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Enquiry not found." });
    }

    res.status(200).json({
      message: "Enquiry updated successfully.",
      enquiry: result.rows[0],
    });
  } catch (err) {
    console.error("Error updating enquiry:", err.message);
    res.status(500).json({ message: "Internal server error." });
  }
});

// API to delete an enquiry by ID
app.delete("/enquiries/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const query = "DELETE FROM enquiries WHERE id = $1 RETURNING *;";
    const result = await db.query(query, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Enquiry not found." });
    }

    res.status(200).json({
      message: "Enquiry deleted successfully.",
      enquiry: result.rows[0],
    });
  } catch (err) {
    console.error("Error deleting enquiry:", err.message);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = app;
