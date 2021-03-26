const express = require("express"); // Import express
const router = express.Router(); // Make a router

// Import controller
const pemasokController = require("../controllers/pemasokController");

// Define routes
router.get("/", pemasokController.getAll);
router.post("/", pemasokController.create);
router.get("/:id", pemasokController.getOne);
router.put("/:id", pemasokController.update);
router.delete("/:id", pemasokController.deleteData);
router.patch("/", pemasokController.alterPemasok);

module.exports = router; // Export router
