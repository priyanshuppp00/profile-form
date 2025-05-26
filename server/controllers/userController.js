const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  try {
    const {
      username,
      password,
      currentPassword,
      profession,
      companyName,
      addressLine1,
      country,
      state,
      city,
      subscriptionPlan,
      newsletter,
      isEditing,
    } = req.body;

    // Basic validation
    if (
      !username ||
      !password ||
      !profession ||
      !addressLine1 ||
      !country ||
      !state ||
      !city
    ) {
      console.log("Missing required fields");
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: "Username already taken" });
    }

    // If profession is Entrepreneur, companyName is required
    if (profession === "Entrepreneur" && !companyName) {
      return res
        .status(400)
        .json({ error: "Company name is required for Entrepreneurs" });
    }

    // Password validation: 8+ chars, 1 special char, 1 number
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error: "Password must be 8+ chars with 1 special char and 1 number",
      });
    }

    // If user is changing password, currentPassword must be provided and match
    if (isEditing === "true") {
      if (!currentPassword) {
        console.log("Current password required to change password");
        return res
          .status(400)
          .json({ error: "Current password is required to change password" });
      }
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        console.log("Current password incorrect");
        return res.status(401).json({ error: "Current password is incorrect" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const profilePhoto = req.file?.path;

    const user = new User({
      profilePhoto,
      username,
      password: hashedPassword,
      profession,
      companyName,
      addressLine1,
      country,
      state,
      city,
      subscriptionPlan,
      newsletter,
    });

    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    console.error("Error in createUser:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.checkUsernameAvailability = async (req, res) => {
  const { username } = req.params;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(409).json({ available: false });
  }
  res.json({ available: true });
};
