const mysql = require("../models"); // import connection

const getAll = (req, res) => {
  let sql =
    "SELECT t.id, p.nama as nama_pelanggan, b.nama as nama_barang, b.harga, pem.nama as nama_pemasok, t.waktu, t.jumlah, t.total FROM transaksi t JOIN barang b ON t.id_barang = b.id JOIN pelanggan p ON t.id_pelanggan = p.id JOIN pemasok pem ON b.id_pemasok = pem.id";

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

const create = (req, res) => {
  let sqlFindBarang = "SELECT * FROM barang WHERE id = ?";

  mysql.query(sqlFindBarang, [req.body.id_barang], (err, results) => {
    let price = eval(results[0].harga);
    let total = eval(req.body.jumlah * price);

    let sqlCreate =
      "INSERT INTO transaksi (id_barang, id_pelanggan, jumlah, total) VALUES (?,?,?,?)";

    mysql.query(
      sqlCreate,
      [req.body.id_barang, req.body.id_pelanggan, req.body.jumlah, total],
      (err, results) => {
        if (err) {
          return res.status(500).json({
            message: "Internal Server Error",
            error: err,
          });
        }

        let sqlSelect = `SELECT t.id, p.nama as nama_pelanggan, b.nama as nama_barang, b.harga, pem.nama as nama_pemasok, t.waktu, t.jumlah, t.total FROM transaksi t JOIN barang b ON t.id_barang = b.id JOIN pelanggan p ON t.id_pelanggan = p.id JOIN pemasok pem ON b.id_pemasok = pem.id WHERE t.id = ${results.insertId}`;
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
  });
};

const deleteData = (req, res) => {
  let sqlDelete = "DELETE FROM transaksi WHERE id = ?";

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

const update = (req, res) => {
  let sqlFindBarang = "SELECT * FROM barang WHERE id = ?";

  mysql.query(sqlFindBarang, [req.body.id_barang], (err, results) => {
    let price = eval(results[0].harga);
    let total = eval(req.body.jumlah * price);
   
    let sqlUpdate =
      "UPDATE transaksi SET id_barang = ?, id_pelanggan = ?, jumlah = ?, total = ? WHERE id = ?";

    mysql.query(
      sqlUpdate,
      [
        req.body.id_barang,
        req.body.id_pelanggan,
        req.body.jumlah,
        total,
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
        "SELECT t.id, p.nama as nama_pelanggan, b.nama as nama_barang, b.harga, pem.nama as nama_pemasok, t.waktu, t.jumlah, t.total FROM transaksi t JOIN barang b ON t.id_barang = b.id JOIN pelanggan p ON t.id_pelanggan = p.id JOIN pemasok pem ON b.id_pemasok = pem.id WHERE t.id = ?";
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
});
}

const getOne = (req, res) => {
  let sqlGetOne =
    "SELECT t.id, p.nama as nama_pelanggan, b.nama as nama_barang, b.harga, pem.nama as nama_pemasok, t.waktu, t.jumlah, t.total FROM transaksi t JOIN barang b ON t.id_barang = b.id JOIN pelanggan p ON t.id_pelanggan = p.id JOIN pemasok pem ON b.id_pemasok = pem.id WHERE t.id = ?";

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

const alterTransaksi= (req, res) => {
  let sqlAlter = "ALTER TABLE transaksi DROP FOREIGN KEY transaksi_ibfk_1, DROP FOREIGN KEY transaksi_ibfk_2; ALTER TABLE transaksi ADD FOREIGN KEY (id_pelanggan) REFERENCES pelanggan(id) ON DELETE CASCADE ON UPDATE CASCADE; ALTER TABLE transaksi ADD FOREIGN KEY (id_barang) REFERENCES barang(id) ON DELETE CASCADE ON UPDATE CASCADE";
    mysql.query(sqlAlter, (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Internal Server Error",
          error: err,
        });
      }
      return res.status(201).json({
        message: "Table Altered",
        data: results[0],
      });
    });
  };

module.exports = { create, getAll, deleteData, update, getOne, alterTransaksi };
