const apiKey = "a8581439b2989061a91721f9311fac93";
const weatherDataElement = document.getElementById("Weather-data");
const cityInput = document.getElementById("city-input");
const formElement = document.querySelector("form");

// Trigger a function
formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityInput.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`);
        
        if (!response.ok) { // Corrected this line
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);

        // Update the DOM with the weather data
        updateWeatherData(data);
    } catch (error) {
        console.error("Failed to fetch weather data:", error);
    }
}

function updateWeatherData(data) {
    // Assuming you want to display weather data like temperature, description, etc.
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const feelsLike = data.main.feels_like;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const iconCode = data.weather[0].icon;

    weatherDataElement.innerHTML = `
        <div class="icon">
            <img src="http://openweathermap.org/img/wn/${iconCode}.png" alt="Weather icon">
        </div>
        <div class="temperature">${temperature} &deg; C</div>
        <div class="description">${description.charAt(0).toUpperCase() + description.slice(1)}</div>
        <div class="details">
            <div>Feels like: ${feelsLike} &deg; C</div>
            <div>Humidity: ${humidity}%</div>
            <div>Wind speed: ${windSpeed} m/s</div>
        </div>
    `;
}
