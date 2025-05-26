const express = require("express");
const router = express.Router();

// Dummy data
const countries = ["India", "USA", "Canada", "Mexico"];
const states = {
  India: ["Delhi", "UP", "Maharashtra", "Chattisgarh"],
  USA: ["California", "Texas", "New York"],
  Canada: ["Ontario", "Quebec", "British Columbia"],
  Mexico: ["Jalisco", "Nuevo Leon", "Puebla"],
};
const cities = {
  Delhi: ["New Delhi", "Dwarka", "Rohini"],
  UP: ["Bareilly", "Lucknow", "Noida", "Agra"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  Chattisgarh: ["Raipur", "Bilaspur", "Durg"],

  California: ["Los Angeles", "San Francisco", "San Diego"],
  Texas: ["Houston", "Dallas", "Austin"],
  "New York": ["New York City", "Buffalo", "Rochester"],

  Ontario: ["Toronto", "Ottawa", "Hamilton"],
  Quebec: ["Montreal", "Quebec City", "Laval"],
  "British Columbia": ["Vancouver", "Victoria", "Richmond"],

  Jalisco: ["Guadalajara", "Zapopan", "Tlaquepaque"],
  "Nuevo Leon": ["Monterrey", "Guadalupe", "San Nicolas"],
  Puebla: ["Puebla City", "Tehuacan", "Atlixco"],
};

// Routes
router.get("/countries", (req, res) => {
  res.json(countries);
});

router.get("/states/:country", (req, res) => {
  const country = req.params.country;
  const result = states[country];
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ message: "Country not found" });
  }
});

router.get("/cities/:state", (req, res) => {
  const state = req.params.state;
  const result = cities[state];
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ message: "State not found" });
  }
});

module.exports = router;
