import { OPENWEATHERMAP_KEY } from './Constants';

export default function getWeatherInfo(currentCity) {
  const OPENWEATHERMAP_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&lang=ua&units=metric&APPID=${OPENWEATHERMAP_KEY}`;
  return fetch(OPENWEATHERMAP_URL)
    .then((res) => res.json());
}
