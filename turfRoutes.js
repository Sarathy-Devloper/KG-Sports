const express = require("express");
const multer = require("multer");
const path = require("path");
const connection = require("../db.js");

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ✅ POST - Register a new turf
router.post("/", upload.array("images", 10), async (req, res) => {
  try {
    const { turf_name, turf_type, turf_pricing, turf_location, rating } = req.body;

    if (!req.files || req.files.length < 5) {
      return res.status(400).json({ error: "At least 5 images are required." });
    }

    const imagePaths = req.files.map((file) => file.path);
    const query = `
      INSERT INTO turf_details 
      (turf_name, turf_type, turf_pricing, turf_location, rating, images)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [
      turf_name,
      turf_type,
      turf_pricing,
      turf_location,
      rating,
      JSON.stringify(imagePaths),
    ];

    const [result] = await connection.query(query, params);
    res.status(201).json({ message: "Turf registered successfully", id: result.insertId });
  } catch (err) {
    console.error("Error inserting turf:", err);
    res.status(500).json({ error: "Failed to register turf" });
  }
});

// ✅ GET nearby turfs
router.get("/nearby", async (req, res) => {
  try {
    const { lat, lng } = req.query;
    if (!lat || !lng) {
      return res.status(400).json({ error: "Latitude and longitude required" });
    }

    const radius = 10;
    const query = `
      SELECT *,
        (6371 * acos(
          cos(radians(?)) * cos(radians(latitude)) *
          cos(radians(longitude) - radians(?)) +
          sin(radians(?)) * sin(radians(latitude))
        )) AS distance
      FROM registered_turfs
      HAVING distance < ?
      ORDER BY distance ASC;
    `;

    const [results] = await connection.query(query, [lat, lng, lat, radius]);
    res.json(results);
  } catch (err) {
    console.error("Error fetching nearby turfs:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// ✅ GET all turfs
router.get("/", async (req, res) => {
  try {
    const [results] = await connection.query("SELECT * FROM turf_details");
    results.forEach((row) => (row.images = row.images ? JSON.parse(row.images) : []));
    res.json(results);
  } catch (err) {
    console.error("Error fetching turfs:", err);
    res.status(500).json({ error: "Failed to fetch turfs" });
  }
});

// ✅ PUT - Update turf by ID
router.put("/:id", upload.array("images", 10), async (req, res) => {
  try {
    const { id } = req.params;
    const { turf_name, turf_type, turf_pricing, turf_location, rating } = req.body;
    const newImages = req.files.map((file) => file.path);

    const [rows] = await connection.query("SELECT images FROM turf_details WHERE id = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ error: "Turf not found" });

    const existingImages = rows[0].images ? JSON.parse(rows[0].images) : [];
    const finalImages = [...existingImages, ...newImages];
    if (finalImages.length < 5) {
      return res.status(400).json({ error: "A turf must have at least 5 images." });
    }

    const updateQuery = `
      UPDATE turf_details
      SET turf_name = ?, turf_type = ?, turf_pricing = ?, turf_location = ?, rating = ?, images = ?
      WHERE id = ?
    `;
    await connection.query(updateQuery, [
      turf_name,
      turf_type,
      turf_pricing,
      turf_location,
      rating,
      JSON.stringify(finalImages),
      id,
    ]);

    res.json({ message: "Turf updated successfully" });
  } catch (err) {
    console.error("Error updating turf:", err);
    res.status(500).json({ error: "Failed to update turf" });
  }
});

// ✅ DELETE - Delete turf by ID
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await connection.query("DELETE FROM turf_details WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Turf not found" });
    res.json({ message: "Turf deleted successfully" });
  } catch (err) {
    console.error("Error deleting turf:", err);
    res.status(500).json({ error: "Failed to delete turf" });
  }
});

// ✅ GET single turf
router.get("/:id", async (req, res) => {
  try {
    const [results] = await connection.query("SELECT * FROM turf_details WHERE id = ?", [req.params.id]);
    if (results.length === 0) return res.status(404).json({ message: "Turf not found" });
    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;