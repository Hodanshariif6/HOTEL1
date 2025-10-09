const express = require("express");
const router = express.Router();
const {
  addCabasho,
  getCabasho,
  deleteCabasho,
} = require("../controller/CabashoController");

router.post("/Cabasho/add", addCabasho);
router.get("/Cabasho", getCabasho);
router.delete("/Cabasho/:id", deleteCabasho);

module.exports = router;
