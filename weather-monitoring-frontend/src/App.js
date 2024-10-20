import React from 'react';
import WeatherSummary from './components/WeatherSummary';
import AlertComponent from './components/AlertComponent';

function App() {
  return (
    <div className="App">
      <h1>Weather Monitoring System</h1>
      <WeatherSummary />
      <AlertComponent />
    </div>
  );
}

export default App;
