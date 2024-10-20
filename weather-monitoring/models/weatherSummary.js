// models/weatherSummary.js
const mongoose = require("mongoose");

const weatherSummarySchema = new mongoose.Schema({
  city: { type: String, required: true },
  temperatures: { type: [Number], required: true },
  conditions: { type: [String], required: true },
  avgTemp: { type: Number, required: true },
  maxTemp: { type: Number, required: true },
  minTemp: { type: Number, required: true },
  dominantCondition: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("WeatherSummary", weatherSummarySchema);
