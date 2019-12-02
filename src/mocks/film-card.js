import {
  getRandomInt,
  getRandomIntegerFromGap,
  getRandomArrayItem,
} from '../utils.js';
import {
  MaxDurationInHours,
  MaxDurationInMinutes
} from '../const.js';

const FilmsDescription = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
];

const FilmsPoster = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const FilmsTitle = [
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

const FilmsGenre = [
  `Action`,
  `Musical`,
  `Drama`
];

const generateRating = (min, max) => {
  let rating = (min + Math.random() * (max + 1 - min)).toFixed(1);
  return rating > 10 ? 10 : rating;
};

const generateFilmCard = () => {
  const HoursDuration = getRandomInt(MaxDurationInHours);
  const MinutesDuration = getRandomInt(MaxDurationInMinutes);

  return {
    title: `${(getRandomArrayItem(FilmsTitle)).slice(0, 15)}`,
    description: `${(getRandomArrayItem(FilmsDescription) + getRandomArrayItem(FilmsDescription))}`,
    poster: `./images/posters/${getRandomArrayItem(FilmsPoster)}`,
    genre: getRandomArrayItem(FilmsGenre),
    hoursDuration: HoursDuration,
    minutesDuration: MinutesDuration,
    fullDuration: `${HoursDuration}h ${MinutesDuration}m`,
    year: getRandomIntegerFromGap(1920, 1960),
    rating: generateRating(0, 10),
    comments: getRandomIntegerFromGap(0, 100),
    toWatch: Math.random() > 0.5,
    isWatched: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5
  };
};

const generateFilmCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilmCard);
};


export {
  generateFilmCard,
  generateFilmCards,
  FilmsDescription,
  FilmsPoster,
  FilmsTitle,
  FilmsGenre
};
