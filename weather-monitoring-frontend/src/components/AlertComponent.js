import React from 'react';

const AlertComponent = ({ city, temperature }) => (
  <div className="alert">
    <h2>Weather Alert</h2>
    <p>The temperature in {city} has exceeded {temperature}°C.</p>
  </div>
);

export default AlertComponent;
