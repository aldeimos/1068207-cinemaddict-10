import {
  FilterType,
  FilterTypeStatistic
} from '../const.js';

const getAllFilms = (films) => {
  return films.filter((film) => film);
};

const getWatchlistFilms = (films) => {
  return films.filter((film) => film.toWatch);
};

const getWatchedFilms = (films) => {
  return films.filter((film) => film.isWatched);
};

const getFavoritesFilms = (films) => {
  return films.filter((film) => film.isFavorite);
};

const getWatchedFilmsAll = (films) => {
  return films.filter((film) => film.isWatched);
};

const getWatchedFilmsToday = (films) => {
  return films.filter((film) => film.viewingDate === `today` && film.isWatched);
};

const getWatchedFilmsWeek = (films) => {
  return films.filter((film) => film.viewingDate === `week` && film.isWatched);
};

const getWatchedFilmsMonth = (films) => {
  return films.filter((film) => film.viewingDate === `month` && film.isWatched);
};

const getWatchedFilmsYear = (films) => {
  return films.filter((film) => film.viewingDate === `year` && film.isWatched);
};

const getFilmsByFilter = (films, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return getAllFilms(films);
    case FilterType.WATCHLIST:
      return getWatchlistFilms(films);
    case FilterType.HISTORY:
      return getWatchedFilms(films);
    case FilterType.FAVORITES:
      return getFavoritesFilms(films);
  }
  return films;
};

const getFilmsByFilterStatistic = (films, filterTypeStatistic) => {
  switch (filterTypeStatistic) {
    case FilterTypeStatistic.ALL:
      return getWatchedFilmsAll(films);
    case FilterTypeStatistic.TODAY:
      return getWatchedFilmsToday(films);
    case FilterTypeStatistic.WEEK:
      return getWatchedFilmsWeek(films);
    case FilterTypeStatistic.MONTH:
      return getWatchedFilmsMonth(films);
    case FilterTypeStatistic.YEAR:
      return getWatchedFilmsYear(films);
  }
  return films;
};

export {
  getAllFilms,
  getFavoritesFilms,
  getFilmsByFilter,
  getWatchedFilms,
  getWatchlistFilms,
  getFilmsByFilterStatistic
};
