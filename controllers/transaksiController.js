// Import mysql connection
const connection = require("../models");

// get All data from transaksi
const getAll = (req, res) => {
  // Make a sql query
  let sql =
    "SELECT t.id, p.nama as nama_pelanggan, b.nama as nama_barang, b.harga, pem.nama as nama_pemasok, t.waktu, t.jumlah, t.total FROM transaksi t JOIN barang b ON t.id_barang = b.id JOIN pelanggan p ON p.id = t.id_pelanggan JOIN pemasok pem ON b.id_pemasok = pem.id";

  // Run the sql query
  connection.query(sql, (err, results) => {
    // If error, it will go to here
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: err,
      });
    }

    // If no error, it will go here
    return res.status(200).json({
      message: "Success",
      data: results,
    });
  });
};

const getOne = (req, res) => {
  let sqlGetOne =
    "SELECT t.id, p.nama as nama_pelanggan, b.nama as nama_barang, b.harga, pem.nama as nama_pemasok, t.waktu, t.jumlah, t.total FROM transaksi t JOIN barang b ON t.id_barang = b.id JOIN pelanggan p ON p.id = t.id_pelanggan JOIN pemasok pem ON b.id_pemasok = pem.id WHERE t.id = ?";

  connection.query(sqlGetOne, [req.params.id], (err, results) => {
    // If error, it will go to here
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: err,
      });
    }

    // If no error, it will go here
    return res.status(200).json({
      message: "Success",
      data: results[0],
    });
  });
};

// Create data
const create = (req, res) => {
  // Find price of barang
  let sqlFindBarang = "SELECT * FROM barang WHERE id = ?";

  // Run sqlFindBarang
  connection.query(sqlFindBarang, [req.body.id_barang], (err, results) => {
    let price = eval(results[0].harga);
    let total = eval(req.body.jumlah * price);

    // Make sql query
    let sqlCreate =
      "INSERT INTO transaksi(id_barang, id_pelanggan, jumlah, total) VALUES (?, ?, ?, ?)";

    // Run Query Create
    connection.query(
      sqlCreate,
      [req.body.id_barang, req.body.id_pelanggan, req.body.jumlah, total],
      (err, results) => {
        // If error
        if (err) {
          return res.status(500).json({
            message: "Internal Server Error",
            error: err,
          });
        }

        // If Success
        let sqlSelect = `SELECT t.id, p.nama as nama_pelanggan, b.nama as nama_barang, b.harga, pem.nama as nama_pemasok, t.waktu, t.jumlah, t.total FROM transaksi t JOIN barang b ON t.id_barang = b.id JOIN pelanggan p ON p.id = t.id_pelanggan JOIN pemasok pem ON b.id_pemasok = pem.id WHERE t.id = ${results.insertId}`;

        // Run Select Query
        connection.query(sqlSelect, (err, results) => {
          // If error
          if (err) {
            return res.status(500).json({
              message: "Internal Server Error",
              error: err,
            });
          }

          // If success
          return res.status(201).json({
            message: "Success",
            data: results[0],
          });
        });
      }
    );
  });
};

// Update
const update = (req, res) => {
  // Find barang
  let sqlFindBarang = "SELECT * FROM barang WHERE id = ?";

  // Run find query
  connection.query(sqlFindBarang, [req.body.id_barang], (err, results) => {
    let price = eval(results[0].harga);
    let total = eval(req.body.jumlah * price);

    let sqlUpdate =
      "UPDATE transaksi SET id_barang = ?, id_pelanggan = ?, jumlah = ?, total = ? WHERE id = ?";

    connection.query(
      sqlUpdate,
      [
        req.body.id_barang,
        req.body.id_pelanggan,
        req.body.jumlah,
        total,
        req.params.id,
      ],
      (err, results) => {
        // If error
        if (err) {
          return res.status(500).json({
            message: "Internal Server Error",
            error: err,
          });
        }

        // If success
        let sqlGetOne =
          "SELECT t.id, p.nama as nama_pelanggan, b.nama as nama_barang, b.harga, pem.nama as nama_pemasok, t.waktu, t.jumlah, t.total FROM transaksi t JOIN barang b ON t.id_barang = b.id JOIN pelanggan p ON p.id = t.id_pelanggan JOIN pemasok pem ON b.id_pemasok = pem.id WHERE t.id = ?";

        connection.query(sqlGetOne, [req.params.id], (err, results) => {
          // If error, it will go to here
          if (err) {
            return res.status(500).json({
              message: "Internal Server Error",
              error: err,
            });
          }

          // If no error, it will go here
          return res.status(200).json({
            message: "Success",
            data: results[0],
          });
        });
      }
    );
  });
};

// Delete data
const deleteData = (req, res) => {
  let sqlDelete = "DELETE FROM transaksi WHERE id = ?";

  connection.query(sqlDelete, [req.params.id], (err, results) => {
    // If error
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: err,
      });
    }

    // If success
    return res.status(200).json({
      message: "Success",
    });
  });
};

module.exports = { getAll, create, update, deleteData, getOne }; // Export getAll function
