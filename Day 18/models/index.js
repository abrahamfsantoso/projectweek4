const mysql = require("mysql2"); // Import mysql

// Make mysql connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "abie",
  password: "Tonystark0203",
  database: "penjualan",
  multipleStatements: true
});


module.exports = connection; // export connection
