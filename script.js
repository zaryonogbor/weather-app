import { apiKey } from "./config.js";

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric`;

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');


async function checkWeather(city) {
  const response = await fetch(apiUrl + `&q=${city}` + `&appid=${apiKey}`);

  if (response.status === 404) {
    document.querySelector('.error').style.display = 'block';
    document.querySelector('.weather').style.display = 'none';
  } else {
    let data = await response.json();

    console.log(data.weather[0].main);
    console.log(data);

    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp, 1) + '°c';
    document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
    document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';

    document.querySelector('.weather-icon')
      .src = `images/${data.weather[0].main}.png`

    document.querySelector('.weather').style.display = 'block';
    document.querySelector('.error').style.display = 'none';
  }
}

searchBtn.addEventListener('click', () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    checkWeather(searchBox.value);
  }
});




