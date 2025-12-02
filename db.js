// db.js
const mysql = require("mysql2/promise"); // Correctly imports the promise-based version

// Create promise-based connection pool
const pool = mysql.createPool({
    host: "localhost", // your MySQL host
    user: "root", // your MySQL username
    password: "", // your MySQL password
    database: "turf_booking", // your database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Test connection (This part is fine, but it should be placed after the pool is fully configured
// and if you want to use it for initial check. The error wasn't coming from this block directly
// but from the promisify line and then this block.
// With mysql2/promise, pool.query is already promise-based, so no need for util.promisify)
(async () => {
  try {
    const connection = await pool.getConnection(); // getConnection is a promise-based method
    console.log("* MySQL connected successfully!");
    connection.release();
  } catch (err) {
    console.error("* Error connecting to MySQL:", err.message);
    // You might want to exit the process or handle this more gracefully in production
    process.exit(1); // Exit if database connection fails at startup
  }
})();

// Remove this line as mysql2/promise already provides promise-based query method
// pool.query = util.promisify(pool.query); // THIS LINE IS NO LONGER NEEDED WITH "mysql2/promise"

module.exports = pool;