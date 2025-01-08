import * as constant from './constants.js';

const BODY = document.body;

const buttonsWrapper = document.createElement('div');
buttonsWrapper.classList.add('buttons-wrapper');
constant.buttons.forEach((element) => {
    const button = document.createElement('button');
    button.classList.add('buttons');
    button.classList.add(element.class);
    button.id = element.id;
    button.innerText = element.name.toUpperCase();
    buttonsWrapper.appendChild(button);
});

const clockWrapper = document.createElement('div');
clockWrapper.classList.add('clock-wrapper');

const clock = document.createElement('div');
clock.classList.add('clock');
clockWrapper.appendChild(clock);

for (let i = 3; i <= 12; i += 3) {
    const hourMarker = document.createElement('span');
    hourMarker.classList.add('hours');
    hourMarker.classList.add(`hour-marker-${i}`);
    hourMarker.innerText = i;
    clock.appendChild(hourMarker);
};

constant.hourHands.forEach((element) => {
    const hourHandsWrapper = document.createElement('div');
    hourHandsWrapper.classList.add(element.wrapper);
    const hourHands = document.createElement('div');
    hourHands.classList.add(element.class);
    hourHands.id = element.id;
    hourHandsWrapper.appendChild(hourHands);
    clock.appendChild(hourHandsWrapper);
});

BODY.appendChild(buttonsWrapper);
BODY.appendChild(clockWrapper);

const HOUR = document.querySelector('#hour-hand');
const MINUTE = document.querySelector('#minute-hand');
const SECOND = document.querySelector('#second-hand');

function startClock() {
    const day = new Date();
    let hh = day.getHours();
    let mm = day.getMinutes();
    let ss = day.getSeconds();

    HOUR.style.transform = `rotateZ(${constant.DEGREE_PER_HOUR * hh + (mm/12)}deg)`;
    MINUTE.style.transform = `rotateZ(${constant.DEGREE_PER_MINUTE * mm}deg)`;
    SECOND.style.transform = `rotateZ(${constant.DEGREE_PER_SECOND * ss}deg)`;
}
let clockInterval = setInterval(startClock ,1000);

const STOP_BUTTON = document.querySelector('#button-stop');
STOP_BUTTON.addEventListener('click', () => {
    if (clockInterval) {
        clearInterval(clockInterval);
        clockInterval = null;
    }
});

const START_BUTTON = document.querySelector('#button-start');
START_BUTTON.addEventListener('click', () => {
    if (!clockInterval) {
        clockInterval = setInterval(startClock, 1000);
        startClock();
    }
});
