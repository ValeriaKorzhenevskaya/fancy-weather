import setBackgroundImage from './js/Background';
import {
  getCurrentCity,
  getCurrentLocation,
  getCityCountry,
  getCoordination,
} from './js/Geolocation';
import getWeatherInfo from './js/Weather';
import { SEARCH_INPUT, VOICE_CONTROL } from './js/Constants';
import { Temperature } from './js/Temperature';
import Template from './js/Template1';

const addFontLink = () => {
  const fontLink = document.createElement('link');
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&display=swap';
  fontLink.rel = 'stylesheet';
  document.head.append(fontLink);
};

document.getElementById('spinner').addEventListener('click', () => {
  setBackgroundImage();
});

let temperature = null;
let template = null;

if (sessionStorage.currentDegrees === undefined) {
  sessionStorage.currentDegrees = 1;
}

temperature = new Temperature(sessionStorage.currentDegrees);
temperature.determination();

function renderTemplate(currentCity) {
  return Promise.all([
    getWeatherInfo(currentCity),
    getCityCountry(currentCity),
  ]).then((arr) => {
    template = new Template(arr[0], arr[1]);
    temperature.subscribeOnSetTemperatureFormat((degrees) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      template.changeTemperatureFormat(degrees));
    template.render();
  });
}

getCurrentCity().then((currentCity) => renderTemplate(currentCity));

document.getElementById('search-form').addEventListener('submit', (e) => {
  const lookingCity = document.getElementById('search-text').value;
  e.preventDefault();
  setBackgroundImage(lookingCity);
  renderTemplate(lookingCity);
  getCoordination(lookingCity);
});
addFontLink();
getCurrentLocation();

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
/* global SpeechRecognition */
const recognition = new SpeechRecognition();
recognition.interimResults = false;
recognition.lang = 'ru-Ru';

VOICE_CONTROL.addEventListener('click', () => {
  recognition.start();
  VOICE_CONTROL.setAttribute('style', 'filter: invert(16%) sepia(95%) saturate(6771%) hue-rotate(1deg) brightness(110%) contrast(118%);');
});

recognition.addEventListener('result', (el) => {
  const transcript = Array.from(el.results).map((result) => result[0]).map((result) => result.transcript).join('');
  SEARCH_INPUT.value = transcript;
  VOICE_CONTROL.setAttribute('style', 'filter: invert(100%) sepia(0%) saturate(1%) hue-rotate(212deg) brightness(104%) contrast(101%);');
  setBackgroundImage(transcript);
  renderTemplate(transcript);
  getCoordination(transcript);
});
