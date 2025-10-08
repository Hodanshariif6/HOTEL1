const express = require("express")
const router = express.Router()
const RoomController = require("../controller/RoomController")
const uploadImage = require("../middleware/uploadImage")

router.post("/create/Room", uploadImage.single("img"), RoomController.createRoom)

router.post("/read/Room", RoomController.readRoom)

router.get("/readSingle/Room/:id", RoomController.readSingleRoom)


router.put("/update/Room/:id",uploadImage.single("img"), RoomController.updateRoom)

router.delete("/delete/Room/:id", RoomController.deleteRoom)

module.exports = router
