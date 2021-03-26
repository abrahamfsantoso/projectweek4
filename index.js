const express = require("express"); // Import express
const app = express(); // Create express app

// Import routes
const transaksiRoutes = require("./routes/transaksiRoutes");
const pemasokRoutes = require("./routes/pemasokRoutes");

// Use to read req.body
app.use(express.urlencoded({ extended: true }));

// Define route
app.use("/transaksi", transaksiRoutes);
app.use("/pemasok", pemasokRoutes);

// Server running on port 3000
app.listen(3000, () => console.log("Server running on 3000!"));
