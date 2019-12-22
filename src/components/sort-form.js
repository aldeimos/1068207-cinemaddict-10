import AbstractComponent from "./abstract-component";

const SortType = {
  DATE_UP: `date-up`,
  RATING_UP: `rating-up`,
  DEFAULT: `default`,
};

const createSortFormTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" data-sort-type="${SortType.DATE_UP}" class="sort__button">Sort by date</a></li>
      <li><a href="#" data-sort-type="${SortType.RATING_UP}" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

class SortForm extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
  }
  getTemplate() {
    return createSortFormTemplate();
  }
  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (sortType === this._currentSortType) {
        return;
      }

      [...this.getElement().querySelectorAll(`.sort__button`)].forEach((button) => {
        if (button === evt.target) {
          button.classList.add(`sort__button--active`);
        } else {
          button.classList.remove(`sort__button--active`);
        }
      });

      this._currentSortType = sortType;

      handler(sortType);
    });
  }
}

export {SortForm, SortType};
