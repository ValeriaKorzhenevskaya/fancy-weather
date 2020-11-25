import { getTimesOfDay, getSeason } from './Date';
import { BODY, UNSPLASH_KEY } from './Constants';

export default function setBackgroundImage() {
  const UNSPLASH_URL = `https://api.unsplash.com/photos/random?query=nature&${getTimesOfDay(new Date())}&${getSeason(new Date())}&client_id=${UNSPLASH_KEY}`;
  fetch(UNSPLASH_URL)
    .then((res) => res.json())
    .then((data) => {
      BODY.setAttribute('style', `background-image: url(${data.urls.regular});`);
    });
}
