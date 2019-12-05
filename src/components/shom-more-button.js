import {createElement} from "../utils";

const createShowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class ShomMoreButton {
  constructor() {
    this.element = null;
  }
  getTemplate() {
    return createShowMoreButtonTemplate();
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