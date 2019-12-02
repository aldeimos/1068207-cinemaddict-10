import {
  generateFilmCards
} from './film-card.js';

const filterNames = [`All time`, `Today`, `Week`, `Month`, `Year`];
const generateFilters = () => {
  return filterNames.map((it) => {
    return {
      name: it
    };
  });
};

const cards = generateFilmCards(15);
const cardsLength = cards.length;

let amountTime = 0;
cards.forEach((it) => {
  amountTime += ((it.hoursDuration / 60) + it.minutesDuration);
});


const calculateFilmsDuration = (duration = amountTime) => {
  const hours = duration.toFixed();
  const minutes = 60 * (duration - hours);
  return {
    hours,
    minutes,
  };
};

const countFilterValues = (prop, filmCards = cards) => {
  let counter = 0;
  for (let item of filmCards) {
    if (item[prop] === true) {
      counter++;
    }
  }
  return counter;
};


export {cardsLength, calculateFilmsDuration, countFilterValues, generateFilters};
