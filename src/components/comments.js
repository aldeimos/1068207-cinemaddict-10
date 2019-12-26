import AbstractComponent from "./abstract-component";

const createCommentTemplate = (card) => {
  const {
    id,
    name,
    text,
    date,
    emoji
  } = card;
  return (
    `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="${emoji}" width="55" height="55" alt="emoji">
  </span>
  <div>
    <p class="film-details__comment-text">${text}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${name}</span>
      <span class="film-details__comment-day">${date}</span>
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
