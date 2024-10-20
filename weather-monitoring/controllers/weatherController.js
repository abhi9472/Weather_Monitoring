
const axios = require("axios");
const WeatherSummary = require("../models/weatherSummary");
const sendEmail = require("../utils/sendEmail");
const config = require("../config");

const cities = [
  "New Delhi",
  "Mumbai",
  "Chennai",
  "Bangalore",
  "Kolkata",
  "Hyderabad",
];

exports.fetchWeatherData = async () => {
  // for (const city of cities) {
  const city = "New Delhi";
  try {
    console.log("Fetching weather data for:", city);
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${config.weatherApiKey}&q=${city}`
    );
    console.log(response);

    const temperature = response.data.current.temp_c; 
    const condition = response.data.current.condition.text; 

    console.log(
      `Fetched weather for ${city}: ${temperature}°C, Condition: ${condition}`
    );

    await processWeatherData(city, temperature, condition);
  } catch (err) {
    console.error(`Error fetching weather for ${city}: ${err.message}`);
  }
  // }
};

const processWeatherData = async (city, temperature, condition) => {
  let summary = await WeatherSummary.findOne({
    city,
    date: { $gte: new Date().setHours(0, 0, 0, 0) },
  });

  if (!summary) {
    summary = new WeatherSummary({
      city,
      temperatures: [temperature],
      conditions: [condition],
    });
  } else {
    summary.temperatures.push(temperature);
    summary.conditions.push(condition);
  }

  summary.avgTemp =
    summary.temperatures.reduce((sum, t) => sum + t, 0) /
    summary.temperatures.length;
  summary.maxTemp = Math.max(...summary.temperatures);
  summary.minTemp = Math.min(...summary.temperatures);
  summary.dominantCondition = getDominantCondition(summary.conditions);

  await summary.save();

  if (summary.maxTemp > config.alertThreshold) {
    sendEmail(city, summary.maxTemp);
  }
};

const getDominantCondition = (conditions) => {
  const freqMap = conditions.reduce((acc, condition) => {
    acc[condition] = (acc[condition] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(freqMap).reduce((a, b) =>
    freqMap[a] > freqMap[b] ? a : b
  );
};

exports.getDailySummary = async (req, res) => {
  try {
    const summaries = await WeatherSummary.find(); 
    res.status(200).json(summaries);
  } catch (err) {
    console.error("Error fetching daily summaries:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
