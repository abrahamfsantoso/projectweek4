const mysql = require("../models"); // import connection

const getAll = (req, res) => {
  let sql =
    "SELECT * FROM pelanggan";

  mysql.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: err,
      });
    }

    return res.status(200).json({
      message: "Success",
      data: results,
    });
  });
};

const getOnePelanggan = (req, res) => {
    let sqlGetOne =
      "SELECT * FROM pelanggan WHERE id = ?";
  
    mysql.query(sqlGetOne, [req.params.id], (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Internal Server Error",
          error: err,
        });
      }
  
      return res.status(200).json({
        message: "Success",
        data: results[0],
      });
    });
  };
  
const createPelanggan = (req, res) => {

    let sqlCreate =
      "INSERT INTO pelanggan (nama) VALUES (?)";

    mysql.query(
      sqlCreate,
      [req.body.nama],
      (err, results) => {
        if (err) {
          return res.status(500).json({
            message: "Internal Server Error",
            error: err,
          });
        }

        let sqlSelect = `SELECT * FROM pelanggan WHERE id = ${results.insertId}`;
        mysql.query(sqlSelect, (err, results) => {
          if (err) {
            return res.status(500).json({
              message: "Internal Server Error",
              error: err,
            });
          }
          return res.status(201).json({
            message: "Success",
            data: results[0],
          });
        });
      }
    );
  };

const deletePelanggan = (req, res) => {
  let sqlDelete = "DELETE FROM pelanggan WHERE pelanggan.id = ?";

  mysql.query(sqlDelete, [req.params.id], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: err,
      });
    }
    return res.status(200).json({
      message: "Success",
    });
  });
};

const updatePelanggan = (req, res) => {
    let sqlUpdate =
      "UPDATE pelanggan SET nama = ? WHERE id = ?";

    mysql.query(
      sqlUpdate,
      [
        req.body.nama,
        req.params.id,
      ],
      (err, results) => {
        if (err) {
          return res.status(500).json({
            message: "Internal Server Error",
            error: err,
          });
        }
        let sqlGetOne =
        "SELECT * FROM pelanggan WHERE id = ?";
        mysql.query(sqlGetOne, [req.params.id], (err, results) => {
            if (err) {
              return res.status(500).json({
                message: "Internal Server Error",
                error: err,
              });
            }
        return res.status(201).json({
          message: "Success",
          data: results,
        });
      }
    );
  });
};

const alterPelanggan= (req, res) => {
  let sqlAlter = "ALTER TABLE pelanggan ADD UNIQUE (nama)";
    mysql.query(sqlAlter, (err, results) => {
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

module.exports = { createPelanggan, getAll, getOnePelanggan, deletePelanggan, updatePelanggan, alterPelanggan};
