// Import mysql connection
const connection = require("../models");

// get All data from transaksi
const getAll = (req, res) => {
  // Make a sql query
  let sql = "select * from pemasok";

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
  let sqlGetOne = "select * from pemasok where id = ?";

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
  // Make sql query
  let sqlCreate = "INSERT INTO pemasok(nama) VALUES (?)";

  // Run Query Create
  connection.query(sqlCreate, [req.body.nama], (err, results) => {
    // If error
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: err,
      });
    }

    // If Success
    let sqlSelect = `select * from pemasok WHERE id = ${results.insertId}`;

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
  });
};

// Update
const update = (req, res) => {
  let sqlUpdate = "UPDATE pemasok SET nama = ? WHERE id = ?";
  connection.query(
    sqlUpdate,
    [req.body.nama, req.params.id],
    (err, results) => {
      // If error
      if (err) {
        return res.status(500).json({
          message: "Internal Server Error",
          error: err,
        });
      }

      // If success
      let sqlGetOne = "SELECT * from pemasok WHERE id = ?";

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
};

// Delete data
const deleteData = (req, res) => {
  let sqlDelete = "DELETE FROM pemasok WHERE id = ?";

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

const alterPemasok= (req, res) => {
  let sqlAlter = "ALTER TABLE pemasok ADD UNIQUE (nama)";
    connection.query(sqlAlter, (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Internal Server Error",
          error: err,
        });
      }
      return res.status(201).json({
        message: "Name Altered",
        data: results[0],
      });
    });
  };

module.exports = { getAll, create, update, deleteData, getOne, alterPemasok }; // Export getAll function
