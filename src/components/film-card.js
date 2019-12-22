import AbstractComponent from "./abstract-component";

const createFilmCardTemplate = (card) => {
  const {
    title,
    description,
    poster,
    genre,
    fullDuration,
    releaseDate,
    rating,
    commentsAmount,
    toWatch,
    isWatched,
    isFavorite
  } = card;
  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseDate}</span>
        <span class="film-card__duration">${fullDuration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description.slice(0, 39)}…</p>
      <a class="film-card__comments">${commentsAmount} comments</a>
      <form class="film-card__controls">
        <button class="${toWatch ? `film-card__controls-item--active ` : ``}film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="${isWatched ? `film-card__controls-item--active ` : ``} film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="${isFavorite ? `film-card__controls-item--active ` : ``}film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
  </article>`
  );
};

export default class FilmCard extends AbstractComponent {
  constructor(card) {
    super();
    this._card = card;
  }
  getTemplate() {
    return createFilmCardTemplate(this._card);
  }
  setFilmInnersClickHandlers(array, handler) {
    for (let item of array) {
      item.addEventListener(`click`, handler);
    }
  }
  setButtonWatchlistClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, handler);
  }
  setButtonWatchedClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, handler);
  }
  setButtonFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, handler);
  }
}
