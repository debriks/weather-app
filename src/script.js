function formatDate(date) {
  let dayIndex = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[dayIndex];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let month = months[date.getMonth()];

  let currentDate = date.getDate();

  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `<strong>${day} ${month} ${currentDate}</strong> <br/> ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

// Building the function that will update the weather elements on the page

function updateWeather(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let localWeatherDescription = response.data.weather[0].description;
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = localWeatherDescription;
  let localTemperature = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${localTemperature}°`;
  let localHighest = Math.round(response.data.main.temp_max);
  let highest = document.querySelector("#highest");
  highest.innerHTML = `${localHighest}°`;
  let localLowest = Math.round(response.data.main.temp_min);
  let lowest = document.querySelector("#lowest");
  lowest.innerHTML = `${localLowest}°`;
  let localHumidity = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${localHumidity} %`;
  let localWindspeed = Math.round(response.data.wind.speed);
  let windspeed = document.querySelector("#windspeed");
  windspeed.innerHTML = `${localWindspeed} km/h`;
}

// Building the weather API url for the input location

function updateCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let key = "fd4ffa3dde63cf28819767f2d6c16744";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${key}&units=metric`;
  city.innerHTML = cityInput.value;

  axios.get(url).then(updateWeather);
}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", updateCity);

// Building the weather API url for the current location

function showCurrentCity(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let key = "fd4ffa3dde63cf28819767f2d6c16744";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let url = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${key}&units=${units}`;

  axios.get(url).then(updateWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentCity);
}

let currentLocationBtn = document.querySelector("#current-location");
currentLocationBtn.addEventListener("click", getCurrentLocation);

function convertCelsius() {
  let celsiusTemp = document.querySelector("#temperature");
  let celsiusBtn = document.querySelector("#celsius-link");
  celsiusTemp.innerHTML = `29°`;
  celsiusBtn.innerHTML = `<strong>°C</strong>`;
  farenheitBtn.innerHTML = `°F`;
}

let celsiusBtn = document.querySelector("#celsius-link");
celsiusBtn.addEventListener("click", convertCelsius);

function convertFarenheit() {
  let farenheitTemp = document.querySelector("#temperature");
  let farenheitBtn = document.querySelector("#farenheit-link");
  farenheitTemp.innerHTML = `84°`;
  farenheitBtn.innerHTML = `<strong>°F</strong>`;
  celsiusBtn.innerHTML = `°C`;
}

let farenheitBtn = document.querySelector("#farenheit-link");
farenheitBtn.addEventListener("click", convertFarenheit);
