/* eslint-disable no-undef */
export default function getMap(coordinates) {
  mapboxgl.accessToken = 'pk.eyJ1IjoidmFsZXJpYTAiLCJhIjoiY2thdG0yZGsxMG1oODJzbDJqbXlkYnFmaiJ9.8JQozb13GuwlX85U21P6kw';
  // eslint-disable-next-line no-unused-vars
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [coordinates.lng, coordinates.lat],
    zoom: 9,
  });
}
