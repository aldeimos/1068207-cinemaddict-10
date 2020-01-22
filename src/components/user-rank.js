import AbstractComponent from "./abstract-component";
import {getWatchedFilms} from '../utils/filter.js';
import {checkUserRank} from '../const.js';


const createUserProfileTemplate = (watchedMovies) => {
  return (
    `<section class="header__profile profile">
    <p class="profile__rating">${checkUserRank(parseInt(watchedMovies, 10))}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
  );
};

export default class UserProfile extends AbstractComponent {
  constructor(watchedMovies) {
    super();
    this._movieAmount = getWatchedFilms(watchedMovies);
  }
  getTemplate() {
    return createUserProfileTemplate(this._movieAmount.length);
  }
}
