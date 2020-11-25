import setBackgroundImage from './Background';
import getMap from './Map';
import { IPINFO_KEY } from './Constants';

export function getCurrentLocation() {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  function success(position) {
    const coordinates = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    getMap(coordinates);
  }
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  navigator.geolocation.getCurrentPosition(success, error, options);
  return success;
}

export function getCurrentCity() {
  const IPINFO_URL = `https://ipinfo.io/json?token=${IPINFO_KEY}`;
  return fetch(IPINFO_URL).then((data) => fetch(data.url)
    .then((res) => res.json())
    .then((data) => {
      const currentCity = data.city;
      setBackgroundImage(currentCity);
      return currentCity;
    }));
}

export function getCoordination(lookingCity) {
  const urlCoordination = `https://api.opencagedata.com/geocode/v1/json?q=${lookingCity}&key=881de0357ec349cb8e0bbf48e32324cb`;
  fetch(urlCoordination)
    .then((res) => res.json())
    .then((data) => {
      getMap(data.results[0].geometry);
    });
}

export function getCityCountry(lookingCity) {
  const urlCoordination = `https://api.opencagedata.com/geocode/v1/json?q=${lookingCity}&key=881de0357ec349cb8e0bbf48e32324cb`;
  return fetch(urlCoordination)
    .then((res) => res.json())
    .then((data) => data.results[0].formatted);
}
