import AbstractComponent from "./abstract-component";

const createFilmExtraListTemplate = (title, className) => {
  return (
    `<section class="films-list--extra ${className}">
    <h2 class="films-list__title">${title}</h2>

    <div class="films-list__container"></div>
  </section`
  );
};

export default class FilmsSubSection extends AbstractComponent {
  constructor(title, className) {
    super();
    this._title = title;
    this._className = className;
  }
  getTemplate() {
    return createFilmExtraListTemplate(this._title, this._className);
  }
}
