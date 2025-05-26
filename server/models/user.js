const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  profilePhoto: {
    type: String,
    default: null,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  currentPassword: String,
  profession: String,
  companyName: String,
  addressLine1: String,
  country: String,
  state: String,
  city: String,
  subscriptionPlan: {
    type: String,
    default: "Basic",
  },
  newsletter: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
