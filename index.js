const express = require("express"); //import express
const app = express(); //create express app

//import routes
const transaksiRoutes = require("./routes/transaksiRoutes");
const pemasokRoutes = require("./routes/pemasokRoutes");
const barangRoutes = require("./routes/barangRoutes");
app.use(express.urlencoded({ extended: true })); // used to read req.body

//define route
app.use("/transaksi", transaksiRoutes);
app.use("/pemasok", pemasokRoutes);
app.use("/barang", barangRoutes);
app.listen(3000, () => console.log("nyala at 3000!")); //running on port 3000
