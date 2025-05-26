// config/multerConfig.js
const multer = require("multer");
const path = require("path");

// Generate a random lowercase string
const randomString = (length) => {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${randomString(10)}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PNG, JPG and JPEG are allowed."), false);
  }
};

module.exports = { storage, fileFilter };
