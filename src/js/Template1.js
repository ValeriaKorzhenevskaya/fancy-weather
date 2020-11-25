import { renderDate, clockStart, getWeekDay } from './Date';
import {
  ZERO,
  NEXT_DAY,
  AFTER_ONE_DAY,
  AFTER_TWO_DAY,
  NEXT_DAY_WEATHER,
  AFTER_ONE_DAY_WEATHER,
  AFTER_TWO_DAY_WEATHER,
  INFO,
  COORDS,
} from './Constants';
import { setFahrenheit } from './Temperature';

class Template {
  constructor(data, country) {
    this.data = data;
    this.country = country;
  }

  render() {
    const { data, country } = this;

    const weatherTemp = `
    <p class="weather-info__location">${country}</p>
    <p class="weather-info__time">${renderDate(new Date())} <span class="hour">Hh</span>:<span class="min">mm</span>:<span class="sec">ss</span></p>    
    <p class="weather-info__temperature">${Math.round(data.list[ZERO].main.temp)}</p>
    <img class="weather-info__icon" src="http://openweathermap.org/img/wn/${data.list[ZERO].weather[ZERO].icon}@2x.png">
    <div class="weather-info__data">
        <p class="weather-info__condition">${data.list[ZERO].weather[ZERO].main}</p>
        <div class="block-weather-info__feels"><span>Feels Like:</span><p class="weather-info__feels">${Math.round(data.list[ZERO].main.feels_like)}</p></div>
        <p class="weather-info__wind">Wind: ${Math.round(data.list[ZERO].wind.speed)} m/c</p>
        <p class="weather-info__humidity">Humidity: ${Math.round(data.list[ZERO].main.humidity)}%</p>
    </div>
    <div class="forecast">
        <p class="forecast__day">${getWeekDay(new Date(), NEXT_DAY)}</p>
        <p class="forecast__temperature">${Math.round(data.list[NEXT_DAY_WEATHER].main.temp)}</p>
        <img class="forecast__icon_first" src="http://openweathermap.org/img/wn/${data.list[NEXT_DAY_WEATHER].weather[ZERO].icon}@2x.png">
    </div>
    <div class="forecast">
        <p class="forecast__day">${getWeekDay(new Date(), AFTER_ONE_DAY)}</p>
        <p class="forecast__temperature">${Math.round(data.list[AFTER_ONE_DAY_WEATHER].main.temp)}</p>
        <img class="forecast__icon_second" src="http://openweathermap.org/img/wn/${data.list[AFTER_ONE_DAY_WEATHER].weather[ZERO].icon}@2x.png">
    </div>
    <div class="forecast">
        <p class="forecast__day">${getWeekDay(new Date(), AFTER_TWO_DAY)}</p>
        <p class="forecast__temperature">${Math.round(data.list[AFTER_TWO_DAY_WEATHER].main.temp)}</p>
        <img class="forecast__icon_third" src="http://openweathermap.org/img/wn/${data.list[AFTER_TWO_DAY_WEATHER].weather[ZERO].icon}@2x.png">
    </div>

  `;

    INFO.innerHTML = weatherTemp;

    const temperatures = Array.from(INFO.querySelectorAll('.weather-info__temperature')).concat(Array.from(INFO.querySelectorAll('.forecast__temperature'))).concat(Array.from(INFO.querySelectorAll('.weather-info__feels')));
    this.temperatures = temperatures;

    const coordMap = `
    <p class="map__coord">Latitude:${Math.floor(data.city.coord.lat)}°${String(data.city.coord.lat).split('.')[1].substr(0, 2)}'</p>
    <p class="map__coord">Longitude:${Math.floor(data.city.coord.lon)}°${String(data.city.coord.lon).split('.')[1].substr(0, 2)}'</p>`;

    COORDS.innerHTML = coordMap;

    clockStart();

    return INFO;
  }

  changeTemperatureFormat(degrees) {
    this.temperatures.forEach((elem) => {
      // eslint-disable-next-line no-param-reassign
      elem.innerHTML = setFahrenheit(Number(elem.innerHTML), Number(degrees));
    });
  }
}

export default Template;
