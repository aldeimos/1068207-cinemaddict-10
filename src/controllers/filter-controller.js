import FilterComponent from '../components/site-menu.js';
import {FilterType} from '../const.js';
import {render, replace, RenderPosition} from '../utils/render.js';
import {getFilmsByFilter} from '../utils/filter.js';

export default class FilterController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
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
  }
  _onDataChange() {
    this.render();
  }
}
