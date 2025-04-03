const apiKey = '2c0140646d1ed86c6c5ab8f575a6ff6a'; // Замените YOUR_API_KEY на ваш ключ API OpenWeatherMap
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const loadingIndicator = document.getElementById('loading');
const weatherData = document.getElementById('weather-data');
const errorMessage = document.getElementById('error-message');

const fetchWeatherData = async (city) => {
    try {
        loadingIndicator.classList.remove('hidden');
        errorMessage.classList.add('hidden');
        weatherData.classList.add('hidden');

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);

        if (!response.ok) {
            throw new Error('Город не найден');
        }

        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        displayError(error.message);
    } finally {
        loadingIndicator.classList.add('hidden');
    }
};

const displayWeatherData = (data) => {
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');

    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = `Описание: ${data.weather[0].description}`;
    humidity.textContent = `Влажность: ${data.main.humidity}%`;
    windSpeed.textContent = `Ветер: ${data.wind.speed} м/с`;

    weatherData.classList.remove('hidden');
};

const displayError = (message) => {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
};

// Обработчик для кнопки "Поиск"
searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherData(city);
    } else {
        displayError('Введите название города');
    }
});

// Обработчик для нажатия клавиши Enter
cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeatherData(city);
        } else {
            displayError('Введите название города');
        }
    }
});

