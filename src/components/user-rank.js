import {createElement} from "../utils";

const checkUserRank = (int) => {
  if (int >= 21) {
    return `Movie Buff`;
  } else if (int <= 20 && int >= 11) {
    return `Fan`;
  }
  return `Novice`;
};


const createUserProfileTemplate = (watchedMovies) => {
  return (
    `<section class="header__profile profile">
    <p class="profile__rating">${checkUserRank(parseInt(watchedMovies, 10))}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
  );
};

export default class UserProfile {
  constructor(watchedMovies) {
    this._movieAmount = watchedMovies;
    this._element = null;
  }
  getTemplate() {
    return createUserProfileTemplate(this._movieAmount);
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
