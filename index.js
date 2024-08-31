const axios = require("axios");
const readline = require("readline");

// Create an interface for reading user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Replace with your Weatherstack API key
const API_KEY = "d37eee4cd52727e3fc7cf7519f3d3714";

// Function to fetch and display weather information
rl.question("Enter your city name: ", async (city) => {
  if (!city) {
    console.log("Please provide a city name");
    rl.close();
    return;
  }

  // API endpoint with the city name and API key
  const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`;

  try {
    // Making a GET request to the Weatherstack API
    const response = await axios.get(url);
    const data = response.data;

    if (data.error) {
      console.log("Error:", data.error.info);
    } else {
      // Display the fetched weather information
      console.log(`Location: ${data.location.name}`);
      console.log(`Temperature: ${data.current.temperature}°C`);
      console.log(`Weather: ${data.current.weather_descriptions[0]}`);
    }
  } catch (error) {
    console.log("Unable to fetch weather data");
  }

  // Close the input stream
  rl.close();
});
