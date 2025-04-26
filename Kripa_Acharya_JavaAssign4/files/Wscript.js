const apiKey = "1b6f94906a3c5806227e1389ec483f69";

// Fetch weather by city
function getWeatherByCity(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data, 'city-weather');
            } else {
                document.getElementById('city-weather').innerHTML = `<p>City not found. Please try again.</p>`;
            }
        })
        .catch(error => console.error('Error:', error));
}

// Fetch weather by geolocation
function getWeatherByLocation(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data, 'location-weather');
            } else {
                document.getElementById('location-weather').innerHTML = `<p>Unable to fetch weather for your location.</p>`;
            }
        })
        .catch(error => console.error('Error:', error));
}

// Display weather data
function displayWeather(data, elementId) {
    const weatherHTML = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        <img class="weather-icon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
    document.getElementById(elementId).innerHTML = weatherHTML;
}

// Event Listeners
document.getElementById('city-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value.trim();
    if (city) {
        getWeatherByCity(city);
    }
});

document.getElementById('location-btn').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                getWeatherByLocation(latitude, longitude);
            },
            () => {
                document.getElementById('location-weather').innerHTML = "<p>Permission denied or location unavailable.</p>";
            }
        );
    } else {
        document.getElementById('location-weather').innerHTML = "<p>Your browser doesn't support geolocation.</p>";
    }
});
