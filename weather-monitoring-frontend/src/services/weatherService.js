import axios from 'axios';

const API_KEY =a1d107c3c3274e0ab36101532241910; // Replace with your actual API key

export const fetchWeatherData = async (city) => {
  try {
    const response = await axios.get(`http://localhost:5002/summaries`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching weather data: ${error.message}`);
  }
};
