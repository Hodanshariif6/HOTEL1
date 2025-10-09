const Cabasho = require("../model/Cabasho");

// POST — Add new complaint
exports.addCabasho = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newCabasho = new Cabasho({ name, email, message });
    await newCabasho.save();

    res.status(201).json({ message: "Message received successfully ✅", data: newCabasho });
  } catch (error) {
    res.status(500).json({ message: "Error saving cabasho", error: error.message });
  }
};

// GET — View all complaints
exports.getCabasho = async (req, res) => {
  try {
    const cabasho = await Cabasho.find().sort({ createdAt: -1 });
    res.status(200).json(cabasho);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cabashos", error: error.message });
  }
};

// DELETE — Remove complaint
exports.deleteCabasho = async (req, res) => {
  try {
    const { id } = req.params;
    await Cabasho.findByIdAndDelete(id);
    res.status(200).json({ message: "Cabasho deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting", error: error.message });
  }
};
