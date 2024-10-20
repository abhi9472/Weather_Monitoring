// routes/weatherRoutes.js
const express = require("express");
const weatherController = require("../controllers/weatherController");

const router = express.Router();


router.post("/fetch", weatherController.fetchWeatherData);


router.get("/daily-summary", weatherController.getDailySummary);

module.exports = router;
