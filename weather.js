const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const APIKey = "YOUR_KEY";
  const cityInput = document.querySelector(".search-box input");
  const city = cityInput.value.trim();
  if (city === "") {
    console.error("City input is empty.");
    return;
  }
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((json) => {
      console.log("Fetched JSON data:", json);
      if (json.cod === "404") {
        // Container.style.height = '400px';
        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        error404.classList.add("active");
        return;
      }
      // Container.style.height = '500px';  

      weatherBox.classList.add("active");
      weatherDetails.classList.add("active");
      error404.classList.remove("active");
      // Update weather information on the page
      const img = weatherBox.querySelector("img");
      const temperature = weatherBox.querySelector(".temperature");
      const description = weatherBox.querySelector(".description");
      const humidity = weatherDetails.querySelector(".humidity span");
      const wind = weatherDetails.querySelector(".wind span");

      // Update image src based on weather condition
      switch (json.weather[0].main) {
        case "Clear":
          img.src = "images/clear.png";
          break;
        case "Rain":
          img.src = "images/rain.png";
          break;
        case "Snow":
          img.src = "images/snow.png";
          break;
        case "Mist":
          img.src = "images/mist.png";
          break;
        case "Haze":
          img.src = "images/haze.png";
          break;
        default:
          img.src = "images/cloud.png";
      }

      // Update temperature and description
      temperature.textContent = `${json.main.temp} °C`;
      description.textContent = json.weather[0].description;

      // Update humidity and wind speed
      humidity.textContent = `${json.main.humidity}%`;
      wind.textContent = `${json.wind.speed} Km/h`;

      // Hide the error message if it was previously shown
      error404.style.display = "none";
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      // Display error message
      error404.style.display = "block";
    });
});
