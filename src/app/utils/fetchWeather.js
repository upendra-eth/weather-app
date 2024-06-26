import axios from 'axios';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const fetchWeather = async (latitude, longitude, apiKey) => {
  try {
    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);
    console.log("API Key:", apiKey);
    const url = `${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default fetchWeather;
