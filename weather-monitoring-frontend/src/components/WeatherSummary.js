import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherSummary = () => {
  const [weatherData, setWeatherData] = useState(null);
  const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const responses = await Promise.all(
          cities.map(city =>
            axios.get(`http://localhost:5002/`)
          )
        );
        setWeatherData(responses.map(response => response.data));
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div>
      <h2>Weather Summary</h2>
      {weatherData ? (
        weatherData.map((data, index) => (
          <div key={index}>
            <h3>{data.name}</h3>
            <p>Temperature: {(data.main.temp - 273.15).toFixed(2)}°C</p>
            <p>Condition: {data.weather[0].main}</p>
          </div>
        ))
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherSummary;
