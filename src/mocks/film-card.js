import {getRandomInt, getRandomIntegerFromGap, getRandomArrayItem, getRandomLengthArray, splitString, formatDate, shuffleArray} from '../utils/common.js';
import {MAX_DURATION_IN_HOURS, MAX_DURATION_IN_MINUTES, MONTHS, COUNTRIES} from '../const.js';
import moment from 'moment';

const filmsDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const filmsPoster = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const filmsTitle = [
  `The Shawshank Redemption`,
  `The Godfather`,
  `The Dark Knight`,
  `12 Angry Men`,
  `Pulp Fiction`,
  `The Good, the Bad and the Ugly`,
  `Fight Club`,
  `Forrest Gump`,
  `Inception`,
  `The Matrix`,
  `Goodfellas`,
  `Joker`,
  `Seven`,
  `Interstellar`,
  `Leon`
];

const filmsGenre = [
  `Action`,
  `Musical`,
  `Drama`,
];

const viewingDates = [`all`, `today`, `week`, `month`, `year`];

const directors = [`John Fedor`, `Alexander Nevskiy`, `Fedor Bondarchuk`, `That Dude`, `Michel Bey`];
const writers = [`Hideo Kodjima`, `Tod Howard`, `Meme Dude`, `HeartMan`, `Die HardMan`];
const actors = [`Danila Ivanovich`, `Brat Danili`, `Brat Brata Danili`];
const emojies = [`angry.png`, `puke.png`, `sleeping.png`, `smile.png`, `trophy.png`];

const generateRating = (min, max) => {
  let rating = (min + Math.random() * (max + 1 - min)).toFixed(1);
  return rating > 10 ? 10 : rating;
};

const generateFilmCard = () => {
  const hoursDuration = getRandomIntegerFromGap(1, MAX_DURATION_IN_HOURS);
  const minutesDuration = getRandomInt(MAX_DURATION_IN_MINUTES);

  const title = getRandomArrayItem(filmsTitle);
  const year = getRandomIntegerFromGap(1930, 1960);

  return {
    id: String(new Date() + Math.random()),
    title,
    subtitle: title,
    description: getRandomLengthArray(splitString(filmsDescription, `. `), `. `, 3),
    poster: `./images/posters/${getRandomArrayItem(filmsPoster)}`,
    genre: shuffleArray(filmsGenre).slice(0, getRandomIntegerFromGap(1, filmsGenre.length)),
    hoursDuration,
    minutesDuration,
    directors: getRandomLengthArray(directors, `, `, 2),
    writers: getRandomLengthArray(writers, `, `, 2),
    actors: getRandomLengthArray(actors, `, `, 2),
    fullDuration: `${hoursDuration}h ${minutesDuration}m`,
    country: getRandomArrayItem(COUNTRIES),
    year,
    releaseDate: formatDate(`${getRandomIntegerFromGap(0, 28)}, ${getRandomArrayItem(MONTHS)}, ${year}`),
    ageRestriction: getRandomIntegerFromGap(12, 18),
    rating: generateRating(0, 10),
    commentsAmount: getRandomIntegerFromGap(0, 100),
    comments: generateComments(),
    toWatch: Math.random() > 0.5,
    isWatched: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
    viewingDate: getRandomArrayItem(viewingDates),
  };
};

const generateFilmCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilmCard);
};

const generateComment = () => {
  return {
    id: String(new Date() + Math.random()),
    name: getRandomArrayItem(directors),
    text: `My disappointment is immeasurable, and my day is ruined`,
    date: /* moment().startOf(`${getRandomArrayItem(DATES)}`).fromNow() */ moment(`${getRandomIntegerFromGap(2010, 2020)}/${getRandomIntegerFromGap(1, 12)}/${getRandomIntegerFromGap(1, 28)} 12:55`).format(`YYYY/MM/DD HH:mm`),
    emoji: `./images/emoji/${getRandomArrayItem(emojies)}`
  };
};

const generateComments = (count = 4) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {
  generateFilmCards
};
