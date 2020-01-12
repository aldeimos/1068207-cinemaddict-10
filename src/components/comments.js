import AbstractComponent from "./abstract-component";
import {formatDate} from '../utils/common.js';

const createCommentTemplate = (card) => {
  const {
    id,
    author,
    comment,
    date,
    emotion
  } = card;
  return (
    `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji">
  </span>
  <div>
    <p class="film-details__comment-text">${comment}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${author}</span>
      <span class="film-details__comment-day">${formatDate(date)}</span>
      <button data-index-number="${id}" class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`
  );
};

export default class Comment extends AbstractComponent {
  constructor(card) {
    super();
    this._card = card;
  }
  getTemplate() {
    return createCommentTemplate(this._card);
  }
}
