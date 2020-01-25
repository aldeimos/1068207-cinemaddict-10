import moment from 'moment';

const FilterType = {
  ALL: `#all`,
  WATCHLIST: `#watchlist`,
  HISTORY: `#history`,
  FAVORITES: `#favorites`,
};

const MOVIE_BUFF_RANK = 21;
const FAN_RANK_MAX = 20;
const FAN_RANK_MIN = 11;

const FilterTypeStatistic = {
  ALL: `all`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

const convertRuntime = (runtime) => {
  const hours = (runtime / 60);
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  return `${rhours}h ${rminutes}m`;
};

const convertReleaseDate = (date) => {
  return moment(date).format(`MM/DD/YYYY`);
};


const checkUserRank = (int) => {
  if (int >= MOVIE_BUFF_RANK) {
    return `Movie Buff`;
  } else if (int <= FAN_RANK_MAX && int >= FAN_RANK_MIN) {
    return `Fan`;
  }
  return `Novice`;
};

export {
  FilterType,
  FilterTypeStatistic,
  convertRuntime,
  convertReleaseDate,
  checkUserRank
};
