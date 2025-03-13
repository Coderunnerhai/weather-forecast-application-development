const button = document.querySelector(".search-button");

button.addEventListener('click', () => fetchWeatherByCity());

function fetchWeatherByCity() {

    const item = document.querySelector('.city-input').value;
    if (item) {
        const promiseObject = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${item}&appid=6fe4299753c1beaf69dbcb76711d350b&units=metric`);
        promiseObject.then(response => {
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(result => updateWeatherUI(result.name, result.main.temp, result.weather[0].icon, result.main.humidity, result.wind.speed))
        .catch(error => alert('err'));
    }
    else {
        alert('Please enter a city name.');
    }
}

function geolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}
function showPosition(data) {
    let lat = data.coords.latitude;
    let lon = data.coords.longitude;
    
    const url = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6fe4299753c1beaf69dbcb76711d350b&units=metric`);
    url.then(response => {
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(result => updateWeatherUI(result.name, result.main.temp, result.weather[0].icon, result.main.humidity, result.wind.speed))
    .catch(error => alert('err'));
}

function updateWeatherUI(location, temperature, iconCode, a, mg) {
    document.querySelector("#vb").innerHTML = location;

    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}.png`;
    document.getElementById('weather-icon').classList.remove('hidden');
    document.querySelector('#weatherid').innerHTML = `Temperature: ${temperature} °C`;
    document.querySelector('#ap').innerHTML = `Humidity: ${a}%`;
    document.querySelector('#bg').innerHTML = `Wind Speed: ${mg} m/s`;
}
