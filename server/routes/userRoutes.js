const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const userController = require("../controllers/userController");

const fs = require("fs");

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/";
    // Ensure uploads directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
      console.log("Created uploads directory");
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Multer file filter and limits
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error("Only JPG and PNG images are allowed."));
  },
});

// POST /api/users/create - Create new user with profile photo
router.post(
  "/create",
  upload.single("profilePhoto"),
  userController.createUser
);

// GET /api/users/check-username/:username - Check username availability
router.get(
  "/check-username/:username",
  userController.checkUsernameAvailability
);

// GET /api/users/latest - Get the most recently created user
router.get("/latest", async (req, res) => {
  try {
    const User = require("../models/user");
    const latestUser = await User.findOne().sort({ createdAt: -1 });
    if (!latestUser) {
      return res.status(404).json({ message: "No users found" });
    }
    res.json(latestUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/all", async (req, res) => {
  console.log("GET /api/users/all called");
  try {
    const User = require("../models/user");
    const users = await User.find();
    console.log("Users found:", users.length);
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
