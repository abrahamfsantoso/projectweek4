const express = require("express"); // Import Express
const app = express(); // Create app from express
const transaksiRoutes = require("./routes/transaksiRoutes"); // Import transaksiRoutes
const pelangganRoutes = require("./routes/pelangganRoutes"); // Import pelangganRoutes
const pemasokRoutes = require("./routes/pemasokRoutes"); // Import pemasokRoutes
const barangRoutes = require("./routes/barangRoutes"); // Import barangRoutes

app.use(express.urlencoded({ extended: true }));

app.use("/transaksi", transaksiRoutes); 
app.use("/pelanggan", pelangganRoutes);
app.use("/pemasok", pemasokRoutes);
app.use("/barang", barangRoutes);


const PORT = 3000 || process.env.PORT
app.listen(3000, () => console.log(`This server is running on port ${PORT}`));
