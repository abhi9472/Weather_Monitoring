// config.js
require('dotenv').config();

module.exports = {
  weatherApiKey: process.env.weatherApiKey,
  alertThreshold: process.env.alertThreshold,
  mongoURI: process.env.MONGODB_URI
};
