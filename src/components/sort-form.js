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
      console.log(evt);
      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (sortType === this._currentSortType) {
        return;
      }

      this._currentSortType = sortType;

      handler(sortType);
    });
  }
  setClassActive() {
    const sortChilds = Array.from(document.querySelectorAll(`a`));
    for (let item of sortChilds) {
      item.addEventListener(`click`, () => {
        sortChilds.forEach((child) => child.classList.remove(`sort__button--active`));
        item.classList.add(`sort__button--active`);
      }); // Этого нет в задании, но мне кажется, что стоит сделать. Цикл в цикле плохо - подскажи как можно проще сделать.
    }
  }
}

export {SortForm, SortType};
