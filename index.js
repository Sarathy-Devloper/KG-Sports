// index.js (or server.js)
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
require('dotenv').config(); // Load environment variables from .env file

// --- Initialize MySQL Database Connection Pool ---
// This will create and expose the `pool` object,
// and also log connection status when the server starts.
// Make sure the path to your db.js (or config/db.js) is correct.
require('./db'); // Assuming db.js is in a 'config' folder at the root

// --- Import Routes ---
const turfRoutes = require("./routes/turfRoutes");
const userRoutes = require("./routes/userRoutes"); // Your updated user routes
const manualSlotsRouter = require('./routes/manualSlots');
const { router: bookingRoutes, setSocketIO } = require("./routes/Bookings");

const app = express();
const port = process.env.PORT || 5000; // Use environment variable for port, default to 5000

// --- Middleware ---
app.use(cors()); // Consider configuring origin for production: { origin: 'http://localhost:3000' }
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Good to have for form data
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- API Routes ---
app.use("/api/turfs", turfRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes); // Mount your updated user routes under /api/users 
app.use('/api/manual-slots', manualSlotsRouter);  

// --- Create HTTP Server ---
const server = http.createServer(app);

// --- Setup Socket.IO ---
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "*", // Use environment variable for frontend URL, default to all
    methods: ["GET", "POST"]
  }
});

// Inject io instance into booking routes AFTER io is defined
setSocketIO(io);

// --- Socket.IO Connection Handling ---
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("slotBooked", (data) => {
    console.log("Broadcasting new booking:", data);
    socket.broadcast.emit("slotBookedUpdate", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// --- Start the Server ---
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});