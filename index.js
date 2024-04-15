const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for requests from Vite app
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Route to fetch data from the provided API endpoint
app.get("/api/cities", async (req, res) => {
  try {
    const response = await axios.get(
      "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100"
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.get("/weather/city", async (req, res) => {
  const { lat, lon } = req.query;
  console.log(req.query)

  // You need to replace 'YOUR_API_KEY' with your actual API key from OpenWeatherMap
  const apiKey = "926b6a749b8e9b5958fae3f4469fabac";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  try {
    console.log("first")
    const response = await axios.get(apiUrl);
    const data = response.data;
    // console.log(data);

    res.json(data);

     
  } catch (error) {
    console.log("sec")
    console.error("Error fetching weather data:", error);
    throw error;
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
