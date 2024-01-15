const http = require('http');
const apiKey = 'bca93a1830e038fa10f8e33a65765963';

const city = 'Gabes';

const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

const options = {
  host: 'api.openweathermap.org',
  path: `/data/2.5/weather?q=${city}&appid=${apiKey}`,
  method: 'GET'
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    const weatherData = JSON.parse(data);
    // console.log(weatherData);
    // const temp = weatherData.main.temp;
    const tempKelvin = weatherData.main.temp;
    const tempCelsius = tempKelvin - 273.15;
    const humidity = weatherData.main.humidity;
    const description = weatherData.weather[0].description;
    const wind = weatherData.wind;
    console.log(`Weather conditions for ${weatherData.name}:`);
    console.log(`- Temperature: ${tempCelsius.toFixed(2)}°C`);
    console.log(`- Humidity: ${humidity}%`);
    console.log(`- Wind: ${wind.speed}%`);
    console.log(`- Description: ${description}`);
  });
});

req.on('error', (err) => {
  console.error(err);
});

req.end();