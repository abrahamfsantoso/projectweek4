const express = require("express"); // Import expresss
const router = express.Router(); // Make a router
const pelangganController = require("../controllers/pelangganController"); // Import TransaksiController

router.get("/", pelangganController.getAll);
router.post("/", pelangganController.createPelanggan);
router.delete("/:id", pelangganController.deletePelanggan);
router.put("/:id", pelangganController.updatePelanggan);
router.get("/:id", pelangganController.getOnePelanggan);
router.patch("/", pelangganController.alterPelanggan);

module.exports = router; // Export router