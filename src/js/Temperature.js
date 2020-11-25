import { HEADER_TEMPERATURE } from './Constants';

export class Temperature {
  constructor(currentLink) {
    this.currentLink = currentLink;
    this.links = Array.from(HEADER_TEMPERATURE.querySelectorAll('.button__temperature'));
    this.changeTemperatureFormat = () => {};
  }

  subscribeOnSetTemperatureFormat(func) {
    this.changeTemperatureFormat = func;
  }

  setCurrentLink(index) {
    this.links[index].classList.add('active');
    if (this.currentLink >= 0 && this.currentLink < this.links.length) {
      this.links[this.currentLink].classList.remove('active');
    }
    this.currentLink = index;
    sessionStorage.currentDegrees = index;
  }

  determination() {
    this.links[this.currentLink].classList.add('active');
    this.links.forEach((link, i) => {
      link.addEventListener('click', () => {
        this.setCurrentLink(i);
        this.changeTemperatureFormat(sessionStorage.currentDegrees);
      });
    });
  }
}

export function setFahrenheit(date, currentDegrees) {
  if (currentDegrees === 0) {
    const fahrenheit = Math.round(date * (9 / 5) + 32);
    return fahrenheit;
  }
  return Math.round((date - 32) * (5 / 9));
}
