const multer = require("multer");
const path = require("path");

// Storage configuration
const storeImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images"); // Folder images waa inuu project-ka ku jiraa
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

// Optional: File filter to accept only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"));
  }
};

// Multer configuration
const uploadStore = multer({
  storage: storeImage,
  fileFilter: fileFilter,
});

module.exports = uploadStore;
