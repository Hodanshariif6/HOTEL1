const express = require("express");
const router = express.Router();
const { createAdmin, adminLogin, updateAdmin } = require("../controller/AdminController");
const { verifyToken, isAdmin } = require("../middleware/Auth"); 

router.post("/create/admin", createAdmin);       
router.post("/login/admin", adminLogin);
router.put("/admin/update", verifyToken, isAdmin, updateAdmin); 

module.exports = router;
