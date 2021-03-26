//import mysql connection
const connection = require("../models");

//get All data from barang
const getAll = (req, res) => {
  let sql = "SELECT * FROM barang";

  //run the sql query
  connection.query(sql, (err, results) => {
    //if error
    if (err) {
      return res.status(500).json({
        message: "internal server error",
        error: err,
      });
    }
    //if success
    return res.status(200).json({
      message: "Success",
      data: results,
    });
  });
};

//get one
const getOne = (req, res) => {
  let sqlGetOne = "SELECT * FROM barang WHERE id = ?";

  connection.query(sqlGetOne, [req.params.id], (err, results) => {
    //if error
    if (err) {
      return res.status(500).json({
        message: "internal server error",
        error: err,
      });
    }
    //if succeed
    return res.status(200).json({
      message: "Success",
      data: results[0],
    });
  });
};

//Create data

const create = (req, res) => {


  //make sql query
  let sqlCreate = "INSERT INTO barang(nama, harga, id_pemasok) VALUES (?, ?, ?)";

  // let sqlCreate =
  //     "insert into transaksi (id_barang, id_pelanggan, jumlah, total) values (?, ?, ?, ?)";

  //run query create
  connection.query(sqlCreate, [req.body.nama, req.body.harga, req.body.id_pemasok], (err, results) => {
    //if error
    if (err) {
      return res.status(500).json({
        message: "Internal server Error",
        error: err,
      });
    }

    // if success
    let sqlSelect = `SELECT * FROM barang WHERE id = ${results.insertId}`;

    //run select query
    connection.query(sqlSelect, (err, results) => {
      //if error
      if (err) {
        return res.status(500).json({
          message: "internal server error",
          error: err,
        });
      }

      //if success
      return res.status(201).json({
        message: "success",
        data: results[0],
      });
    });
  });
};

//Update data
const update = (req, res) => {
  //make sql query
  let sqlUpdate = "UPDATE barang SET nama = ?, harga = ?, id_pemasok = ?  WHERE id = ?";
  connection.query(
    sqlUpdate,
    [
      req.body.nama,
      req.body.harga,
      req.body.id_pemasok, 
      req.params.id],
    (err, results) => {
      //if error
      if (err) {
        return res.status(500).json({
          message: "internal server error",
          error: err,
        });
      }
      //if success
      let sqlGetOne = "SELECT * FROM barang WHERE id=?";

      connection.query(sqlGetOne, [req.params.id], (err, results) => {
        //if error
        if (err) {
          return res.status(500).json({
            message: "internal server error",
            error: err,
          });
        }
        //if succeed
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
  let sqlDelete = "DELETE FROM barang WHERE id = ?";

  connection.query(sqlDelete, [req.params.id], (err, results) => {
    //if error
    if (err) {
      return res.status(500).json({
        message: "Internal server error",
        error: err,
      });
    }

    //if success
    return res.status(200).json({
      message: "success",
    });
  });
};

const alterBarang= (req, res) => {
    let sqlAlter = "ALTER TABLE barang ADD UNIQUE (nama)";
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
  
module.exports = { getAll, create, deleteData, update, getOne, alterBarang }; // export getAll function
