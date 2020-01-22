import moment from 'moment';

const FilterType = {
  ALL: `#all`,
  WATCHLIST: `#watchlist`,
  HISTORY: `#history`,
  FAVORITES: `#favorites`,
};

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
  if (int >= 21) {
    return `Movie Buff`;
  } else if (int <= 20 && int >= 11) {
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
