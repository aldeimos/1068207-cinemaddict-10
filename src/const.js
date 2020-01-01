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
  ALL: `All movies`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`,
};

const FilterTypeStatistic = {
  ALL: `all`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

export {
  MAX_DURATION_IN_HOURS,
  MAX_DURATION_IN_MINUTES,
  COUNTRIES,
  MONTHS,
  DATES,
  FilterType,
  FilterTypeStatistic
};
