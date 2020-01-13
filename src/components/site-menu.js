import AbstractComponent from './abstract-component.js';

const createSiteMenuTemplate = (cards) => {
  return (
    `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active main-navigation__item--all-movies">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${cards[1].count}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${cards[2].count}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${cards[3].count}</span></a>
    <a href="#stats" class="main-navigation__item--additional">Stats</a>
  </nav>`
  );
};

export default class SiteMenu extends AbstractComponent {
  constructor(cards) {
    super();
    this._cards = cards;
  }
  getTemplate() {
    return createSiteMenuTemplate(this._cards);
  }
}
