const mysql = require("mysql2"); // Import mysql

// Make mysql connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "fikrilubis",
  password: "F30_$ecret",
  database: "penjualan",
  multipleStatements: true
});


module.exports = connection; // export connection