const express = require("express");
const pool = require("../db.js"); // Changed 'connection' to 'pool' for clarity, as it exports the pool

const router = express.Router();
let io; // will hold Socket.IO instance

// ✅ This function lets index.js inject the io instance
function setSocketIO(socketInstance) {
  io = socketInstance;
}

/**
 * POST - Create a new booking
 */
router.post("/", async (req, res) => { // Make the route handler async
  const {
    turf_id,
    turf_name,
    booked_by_name,
    booked_by_email,
    booked_by_number,
    booked_game,
    booking_date,
    booking_slot,
  } = req.body;

  if (
    !turf_id ||
    !turf_name ||
    !booked_by_name ||
    !booked_by_email ||
    !booked_by_number ||
    !booked_game ||
    !booking_date ||
    !booking_slot
  ) {
    return res.status(400).json({ error: "All booking fields are required." });
  }

  try { // Use a try-catch block for async operations
    const checkDuplicateQuery =
      "SELECT * FROM booked_turfs WHERE turf_id = ? AND booking_date = ? AND booking_slot = ? AND is_cancelled = FALSE"; // Only check active bookings
    
    // Await the promise returned by pool.query()
    const [results] = await pool.query(checkDuplicateQuery, [
      turf_id,
      booking_date,
      booking_slot,
    ]);

    if (results.length > 0) {
      return res
        .status(409)
        .json({ error: "This slot is already booked for the selected date." });
    }

    const insertQuery =
      "INSERT INTO booked_turfs (turf_id, turf_name, booked_by_name, booked_by_email, booked_by_number, booked_game, booking_date, booking_slot, is_cancelled) VALUES (?, ?, ?, ?, ?, ?, ?, ?, FALSE)"; // Add payment_amount and is_cancelled
    const params = [
      turf_id,
      turf_name,
      booked_by_name,
      booked_by_email,
      booked_by_number,
      booked_game,
      booking_date,
      booking_slot,
    ];

    // Await the promise for the insert query
    const [insertResults] = await pool.query(insertQuery, params);

    // ✅ Emit socket event when a new slot is booked
    if (io) {
      io.emit("slotBookedUpdate", {
        turf_id,
        booking_date,
        booking_slot,
      });
    }

    res.status(201).json({
      message: "Booking created successfully",
      id: insertResults.insertId,
    });
  } catch (err) {
    console.error("Error creating booking:", err);
    return res.status(500).json({ error: "Database error" });
  }
});

/**
 * GET - Fetch all bookings
 */
router.get("/", async (req, res) => { // Make the route handler async
  try {
    const [results] = await pool.query("SELECT * FROM booked_turfs"); // Await the promise
    res.json(results);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    return res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

/**
 * GET - Fetch booked slots for a specific turf and date (no change)
 */
router.get("/turf/:turfId/date/:bookingDate", async (req, res) => { // Make async
  const { turfId, bookingDate } = req.params;
  try {
    const [results] = await pool.query( // Await the promise
      "SELECT booking_slot FROM booked_turfs WHERE turf_id = ? AND booking_date = ? AND is_cancelled = FALSE", // Only show non-cancelled slots
      [turfId, bookingDate]
    );
    res.json(results.map((r) => r.booking_slot));
  } catch (err) {
    console.error("Error fetching booked slots:", err);
    return res.status(500).json({ error: "Failed to fetch booked slots" });
  }
});

// New routes for Edit, Delete, Cancel
/**
 * PATCH - Cancel a booking by ID
 * This route marks a booking as cancelled instead of deleting it.
 */
router.patch("/:id/cancel", async (req, res) => { // Make async
  const { id } = req.params;
  const cancelQuery = "UPDATE booked_turfs SET is_cancelled = TRUE WHERE id = ?";
  try {
    const [results] = await pool.query(cancelQuery, [id]); // Await the promise
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Booking not found." });
    }

    // Emit socket event for cancellation
    if (io) {
      io.emit("bookingCancelled", { bookingId: id });
    }

    res.json({ message: "Booking cancelled successfully." });
  } catch (err) {
    console.error("Error cancelling booking:", err);
    return res.status(500).json({ error: "Failed to cancel booking" });
  }
});

/**
 * PUT - Update a booking by ID (Edit)
 * This route allows modification of booking details.
 * You'll need to send all updatable fields in the request body.
 */
router.put("/:id", async (req, res) => { // Make async
  const { id } = req.params;
  const {
    turf_id,
    turf_name,
    booked_by_name,
    booked_by_email,
    booked_by_number,
    booked_game,
    booking_date,
    booking_slot,
    is_cancelled // Allow updating this if needed, but 'cancel' route is preferred for that
  } = req.body;

  // Basic validation for required fields
  if (
    !turf_id || !turf_name || !booked_by_name || !booked_by_email ||
    !booked_by_number || !booked_game || !booking_date || !booking_slot
  ) {
    return res.status(400).json({ error: "All booking fields are required for update." });
  }

  const updateQuery = `
    UPDATE booked_turfs
    SET
      turf_id = ?,
      turf_name = ?,
      booked_by_name = ?,
      booked_by_email = ?,
      booked_by_number = ?,
      booked_game = ?,
      booking_date = ?,
      booking_slot = ?,
      is_cancelled = ?
    WHERE id = ?
  `;
  const params = [
    turf_id,
    turf_name,
    booked_by_name,
    booked_by_email,
    booked_by_number,
    booked_game,
    booking_date,
    booking_slot,
    is_cancelled === undefined ? false : is_cancelled, // Ensure it's a boolean, default to false if not provided
    id,
  ];

  try {
    const [results] = await pool.query(updateQuery, params); // Await the promise
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Booking not found." });
    }

    // Emit socket event for booking update
    if (io) {
      io.emit("bookingUpdated", { bookingId: id, updatedFields: req.body });
    }

    res.json({ message: "Booking updated successfully." });
  } catch (err) {
    console.error("Error updating booking:", err);
    return res.status(500).json({ error: "Failed to update booking" });
  }
});

/**
 * DELETE - Delete a booking by ID
 * This route permanently removes a booking from the database.
 */
router.delete("/:id", async (req, res) => { // Make async
  const { id } = req.params;
  const deleteQuery = "DELETE FROM booked_turfs WHERE id = ?";
  try {
    const [results] = await pool.query(deleteQuery, [id]); // Await the promise
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Booking not found." });
    }

    // Emit socket event for booking deletion
    if (io) {
      io.emit("bookingDeleted", { bookingId: id });
    }

    res.json({ message: "Booking deleted successfully." });
  } catch (err) {
    console.error("Error deleting booking:", err);
    return res.status(500).json({ error: "Failed to delete booking" });
  }
});

module.exports = { router, setSocketIO };