import {
  FilterType
} from '../const.js';
import {
  getFilmsByFilter
} from '../utils/filter.js';

export default class Movies {
  constructor() {
    this._cards = [];
    this._filmsComments = [];
    this._activeFilterType = FilterType.ALL;
  }
  getFilms() {
    return getFilmsByFilter(this._cards, this._activeFilterType);
  }
  getAllFilms() {
    return this._cards;
  }
  setFilms(cards) {
    this._cards = Array.from(cards);
  }
  setComments(cards) {
    this._filmsComments = Array.from(cards);
  }
  getComments() {
    return this._filmsComments;
  }
  updateFilm(id, card) {
    const index = this._cards.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    const array = this._cards.slice();
    array[index] = card;
    this._cards = array;

    return true;
  }
  setFilter(filterType) {
    this._activeFilterType = filterType;
  }
}
