import AbstractComponent from './abstract-component.js';

const createSiteMenuTemplate = (cards) => {
  return (
    `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${cards[1].count}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${cards[2].count}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${cards[3].count}</span></a>
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
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
  /* setFilterChangeHandler() {
    this.getElement().addEventListener(`click`, (evt) => {
      [...this.getElement().querySelectorAll(`.main-navigation__item`)].forEach((button) => {
        if (button === evt.target) {
          button.classList.add(`main-navigation__item--active`);
        } else {
          button.classList.remove(`main-navigation__item--active`);
        }
      });
      return evt.target.textContent.slice(0, -2).toUpperCase();
    });
  } */
}
