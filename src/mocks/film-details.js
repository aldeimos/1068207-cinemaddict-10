
import {countries, MONTHS} from '../const.js';
import {generateFilmCard} from './film-card.js';
import {getRandomArrayItem, getRandomIntegerFromGap} from '../utils.js';

const directors = [`John Fedor`, `Alexander Nevskiy`, `Fedor Bondarchuk`, `That Dude`, `Michel Bey`];
const writers = [`Hideo Kodjima`, `Tod Howard`, `Meme Dude`, `HeartMan`, `Die HardMan`];
const actors = [`Danila Ivanovich`, `Brat Danili`, `Brat Brata Danili`];

const generateFilmDetails = () => {
  const defaultCard = generateFilmCard();
  defaultCard.subtitle = defaultCard.title;
  defaultCard.countries = getRandomArrayItem(countries);
  defaultCard.months = getRandomArrayItem(MONTHS);
  defaultCard.releaseDay = getRandomIntegerFromGap(0, 30);
  defaultCard.director = getRandomArrayItem(directors);
  defaultCard.writers = getRandomArrayItem(writers);
  defaultCard.actors = getRandomArrayItem(actors);
  defaultCard.ageRestriction = getRandomIntegerFromGap(12, 18);
  return defaultCard;
};

export {generateFilmDetails};
