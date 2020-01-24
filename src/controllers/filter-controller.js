import FilterComponent from '../components/site-menu.js';
import {
  FilterType
} from '../const.js';
import {
  render,
  replace,
  RenderPosition
} from '../utils/render.js';
import {
  getFilmsByFilter
} from '../utils/filter.js';

const ACTIVE_CLASS = `main-navigation__item--active`;

export default class FilterController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._statsButton = null;
  }
  render() {
    const container = this._container;
    const allFilms = this._moviesModel.getAllFilms();
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getFilmsByFilter(allFilms, filterType).length,
        // checked
      };
    });
    const oldComponent = this._filterComponent;
    this._filterComponent = new FilterComponent(filters);
    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent.getElement(), RenderPosition.AFTERBEGIN);
    }
    this._statsButton = this._filterComponent.getElement().querySelector(`.main-navigation__item--additional`);
  }
  _onDataChange() {
    this.render();
  }
  updateData() {
    this._onDataChange();
  }
  getFilterComponent() {
    return this._filterComponent;
  }
  changeFilterType(filterType) {
    this._activeFilterType = filterType;
  }
  setFiltersHandler(handler) {
    [...this._filterComponent.getElement().querySelectorAll(`.main-navigation__item`)].forEach((button) => {
      button.addEventListener(`click`, (evt) => {
        this.removeActiveClass();
        if (button === evt.target) {
          button.classList.add(ACTIVE_CLASS);
        } else {
          button.classList.remove(ACTIVE_CLASS);
        }
        const activeFilterValue = evt.target.hash;
        this.changeFilterType(activeFilterValue);
        this._moviesModel.setFilter(activeFilterValue);
        handler();
      });
    });
  }
  switchToStatistics(pageControllerHandler, statsHandler) {
    this._statsButton.addEventListener(`click`, () => {
      this.removeActiveClass();
      this._statsButton.classList.toggle(ACTIVE_CLASS);
      pageControllerHandler();
      statsHandler();
    });
  }
  switchToFilms(pageControllerHandler, statsHandler) {
    [...this._filterComponent.getElement().querySelectorAll(`.main-navigation__item`)].forEach((button) => {
      button.addEventListener(`click`, () => {
        this._statsButton.classList.remove(ACTIVE_CLASS);
        pageControllerHandler(); // show
        statsHandler();
      });
    });
  }
  removeActiveClass() {
    [...this._filterComponent.getElement().querySelectorAll(`a`)].forEach((button) => {
      button.classList.remove(ACTIVE_CLASS);
    });
  }
}
