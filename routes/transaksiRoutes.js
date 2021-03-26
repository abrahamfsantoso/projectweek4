const express = require("express"); // Import expresss
const router = express.Router(); // Make a router
const transaksiController = require("../controllers/transaksiController.js"); // Import TransaksiController

router.get("/", transaksiController.getAll);
router.post("/", transaksiController.create);
router.delete("/:id", transaksiController.deleteData);
router.put("/:id", transaksiController.update);
router.get("/:id", transaksiController.getOne);
router.patch("/", transaksiController.alterTransaksi);


module.exports = router; // Export router
