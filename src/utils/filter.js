import {
  FilterType,
  FilterTypeStatistic
} from '../const.js';

import moment from 'moment';

const getAllFilms = (films) => {
  return films.filter((film) => film);
};

const getWatchlistFilms = (films) => {
  return films.filter((film) => film.watchList);
};

const getWatchedFilms = (films) => {
  return films.filter((film) => film.alreadyWatched);
};

const getFavoritesFilms = (films) => {
  return films.filter((film) => film.favorite);
};

const getWatchedFilmsAll = (films) => {
  return films.filter((film) => film.alreadyWatched);
};

const getWatchedFilmsToday = (films) => {
  const todayStartDate = moment(new Date()).subtract(24, `hours`).unix();
  const todayEndDate = moment(new Date()).add(24, `hours`).unix();
  return films.filter((film) => film.alreadyWatched && (moment(film.watchingDate).unix() <= todayEndDate && todayStartDate <= moment(film.watchingDate).unix()));
};

const getWatchedFilmsWeek = (films) => {
  const weekStartDate = moment(new Date()).subtract(1, `week`).unix();
  return films.filter((film) => film.alreadyWatched && moment(film.watchingDate).unix() >= weekStartDate);
};

const getWatchedFilmsMonth = (films) => {
  const monthStartDate = moment(new Date()).subtract(1, `month`).unix();
  return films.filter((film) => film.alreadyWatched && moment(film.watchingDate).unix() >= monthStartDate);
};

const getWatchedFilmsYear = (films) => {
  const yearStartDate = moment(new Date()).subtract(1, `year`).unix();
  return films.filter((film) => film.alreadyWatched && moment(film.watchingDate).unix() >= yearStartDate);
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
