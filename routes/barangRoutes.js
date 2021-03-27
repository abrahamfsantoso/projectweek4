const express = require("express"); // import express
const router = express.Router(); //make router

//import controller
const barangController = require("../controllers/barangController");

//define routes
router.get("/", barangController.getAll);
router.post("/", barangController.create);
router.delete("/:id", barangController.deleteData);
router.put("/:id", barangController.update);
router.get("/:id", barangController.getOne);
router.patch("/", barangController.alterBarang);

module.exports = router; //to export router
