const express = require("express");
const router = express.Router();
const newsController = require("../controller/NewsController");
const uploadImage = require("../middleware/uploadImage");

// Create new news
router.post("/create/new", uploadImage.single("img"), newsController.createNew);

// Read all news
router.get("/read/new", newsController.readNew);

// Read single news by ID
router.get("/readSingle/New/:id", newsController.readSingleNew);

// Update news
router.put("/update/new/:id", uploadImage.single("img"), newsController.updateNew);

// Delete news
router.delete("/delete/new/:id", newsController.deleteNew);

module.exports = router;
