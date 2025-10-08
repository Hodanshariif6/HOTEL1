const RoomModel = require("../model/RoomModel");

// Create Room
const createRoom = async (req, res) => {
    try {
        const { name, price, desc, quantity, detail } = req.body;
        const newData = new RoomModel({
            name: name,
            price: price,
            desc: desc,
            quantity: quantity,
            prImage: req.file.filename,
            detail: detail
        });
        await newData.save();
        res.send(newData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Read all rooms
const readRoom = async (req, res) => {
    try {
        const readData = await RoomModel.find();
        res.send(readData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Read single room
const readSingleRoom = async (req, res) => {
    try {
        const getData = await RoomModel.findById(req.params.id);
        if (getData) {
            res.send(getData);
        } else {
            res.status(404).json({ message: "Room not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update room
const updateRoom = async (req, res) => {
    try {
        const { name, price, desc, quantity, detail } = req.body;
        const updateData = await RoomModel.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    name: name,
                    price: price,
                    desc: desc,
                    quantity: quantity,
                    prImage: req.file ? req.file.filename : undefined,
                    detail: detail
                }
            }
        );
        res.send("Successfully updated");
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete room
const deleteRoom = async (req, res) => {
    try {
        await RoomModel.deleteOne({ _id: req.params.id });
        res.send("Successfully deleted");
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createRoom, readRoom, readSingleRoom, updateRoom, deleteRoom };
