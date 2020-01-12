import moment from 'moment';

const MAX_DURATION_IN_HOURS = 3;
const MAX_DURATION_IN_MINUTES = 59;

const COUNTRIES = [`USA`, `Japan`, `Russia`, `China`, `Canada`, `Czech`, `Germany`];
const MONTHS = [`January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

const DATES = [`year`, `month`, `week`, `day`];

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

export {
  MAX_DURATION_IN_HOURS,
  MAX_DURATION_IN_MINUTES,
  COUNTRIES,
  MONTHS,
  DATES,
  FilterType,
  FilterTypeStatistic,
  convertRuntime,
  convertReleaseDate
};
