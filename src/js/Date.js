export function getWeekDay(date, numberOfDay) {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saterday',
  ];
  return days[date.getDay() + numberOfDay];
}

function getDate(date) {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

export function getTimesOfDay(date) {
  if (date.getHours() < 5) {
    return 'night';
  } if (date.getHours() < 13) {
    return 'morning';
  } if (date.getHours() < 17) {
    return 'day';
  }
  return 'evening';
}

export function getSeason(date) {
  if (date.getMonth() < 2 || date.getMonth() === 11) {
    return 'winter';
  } if (date.getMonth() > 1 && date.getMonth() < 5) {
    return 'spring';
  } if (date.getMonth() > 4 && date.getMonth() < 8) {
    return 'summer';
  }
  return 'autumn';
}

function updateClock() {
  const clock = document.querySelector('.weather-info__time');
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  clock.children[0].innerHTML = hours;
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  clock.children[1].innerHTML = minutes;
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  clock.children[2].innerHTML = seconds;
}

export function clockStart() {
  setInterval(updateClock, 1000);
  updateClock();
}

export function renderDate(date) {
  return `${getWeekDay(date, 0)}, ${getDate(date)}`;
}
