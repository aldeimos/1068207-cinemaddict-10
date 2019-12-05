import {countFilterValues} from '../mocks/filter.js';
import {createElement} from '../utils.js';
const createSiteMenuTemplate = (cards) => {
  return (
    `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${countFilterValues(cards, `toWatch`)}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${countFilterValues(cards, `isWatched`)}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${countFilterValues(cards, `isFavorite`)}</span></a>
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`
  );
};

export default class SiteMenu {
  constructor(cards) {
    this._cards = cards;
    this._element = null;
  }
  getTemplate() {
    return createSiteMenuTemplate(this._cards);
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}
