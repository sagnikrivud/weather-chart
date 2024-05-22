// src/WeatherBarChart.js
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RechartBar = ({ latitude, longitude }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (latitude && longitude) {
        const API = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=2b144ed66c94782b99a3d9465633b082&units=metric`;
        const response = await fetch(API);
        const weatherData = await response.json();

        const data = [
          { name: 'Humidity', value: weatherData.main.humidity },
          { name: 'Temperature', value: weatherData.main.temp }, // Converting Kelvin to Celsius
          { name: 'Pressure', value: weatherData.main.pressure/100 },
        ];

        setChartData(data);
      }
    };

    fetchData();
  }, [latitude, longitude]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RechartBar;