
const axios = require('axios');
const WeatherSummary = require('../models/weatherSummary');
const sendEmail = require('../utils/sendEmail');
const config = require('../config');

const cities = ['New Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

exports.fetchWeatherData = async () => {
  for (const city of cities) {
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${config.weatherApiKey}&q=${city}`);
      
      const temperature = response.data.current.temp_c; // Temperature in Celsius
      const condition = response.data.current.condition.text; // Weather condition text

      console.log(`Fetched weather for ${city}: ${temperature}°C, Condition: ${condition}`);
      await processWeatherData(city, temperature, condition);

    } catch (err) {
      console.error(`Error fetching weather for ${city}: ${err.message}`);
    }
  }
};

const processWeatherData = async (city, temperature, condition) => {
  let summary = await WeatherSummary.findOne({ city, date: { $gte: new Date().setHours(0, 0, 0, 0) } });

  if (!summary) {
    summary = new WeatherSummary({ city, temperatures: [temperature], conditions: [condition] });
  } else {
    summary.temperatures.push(temperature);
    summary.conditions.push(condition);
  }

  summary.avgTemp = calculateAverage(summary.temperatures);
  summary.maxTemp = Math.max(...summary.temperatures);
  summary.minTemp = Math.min(...summary.temperatures);
  summary.dominantCondition = getDominantCondition(summary.conditions);

  await summary.save();

  if (summary.maxTemp > config.alertThreshold) {
    sendEmail(city, summary.maxTemp);
  }
};

const calculateAverage = (temperatures) => {
  if (temperatures.length === 0) return 0;
  return temperatures.reduce((sum, t) => sum + t, 0) / temperatures.length;
};

const getDominantCondition = (conditions) => {
  const freqMap = conditions.reduce((acc, condition) => {
    acc[condition] = (acc[condition] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(freqMap).reduce((a, b) => (freqMap[a] > freqMap[b] ? a : b));
};
