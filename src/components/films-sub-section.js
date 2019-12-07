import {createElement} from "../utils";

const createFilmExtraListTemplate = (title, className) => {
  return (
    `<section class="films-list--extra ${className}">
    <h2 class="films-list__title">${title}</h2>

    <div class="films-list__container"></div>
  </section`
  );
};

export default class extraFilmSection {
  constructor(title, className) {
    this._title = title;
    this._className = className;
    this._element = null;
  }
  getTemplate() {
    return createFilmExtraListTemplate(this._title, this._className);
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
