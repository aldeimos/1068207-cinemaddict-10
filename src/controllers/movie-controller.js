import FilmCardDetailsComponent from '../components/film-details';
import FilmCardComponent from '../components/film-card.js';


import {
  RenderPosition,
  render,
  remove,
  replace
} from '../utils.js/render';


const Mode = {
  DEFAULT: `default`,
  DETAILS: `details`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._filmCard = null;
    this._filmCardDetails = null;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
  }
  render(card) {
    const oldFilmCard = this._filmCard;
    const oldFilmCardDetails = this._filmCardDetails;
    const siteMainSection = document.querySelector(`main`);

    this._filmCard = new FilmCardComponent(card);
    this._filmCardDetails = new FilmCardDetailsComponent(card);
    const filmCardParts = this._filmCard.getElement().querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`);

    const onEscKeydown = (evt) => {
      const isEscape = evt.key === `Escape` || evt.key === `Esc`;
      if (isEscape) {
        remove(this._filmCardDetails);
        document.removeEventListener(`keydown`, onEscKeydown);
      }
    };

    const onFilmInnerClick = () => {
      this._onViewChange();
      this._mode = Mode.DETAILS;
      render(siteMainSection, this._filmCardDetails.getElement(), RenderPosition.BEFOREEND);
      document.addEventListener(`keydown`, onEscKeydown);
      this._filmCardDetails._subscribeOnEvents();
    };

    this._filmCard.setFilmInnersClickHandlers(filmCardParts, onFilmInnerClick);
    this._filmCard.setButtonWatchlsitClickHanlder((evt) => {
      evt.preventDefault();

      this._onDataChange(this, card, Object.assign({}, card, {
        toWatch: !card.toWatch
      }));
    });
    this._filmCard.setButtonWatchedClickHandler((evt) => {
      evt.preventDefault();

      this._onDataChange(this, card, Object.assign({}, card, {
        isWatched: !card.isWatched
      }));
    });
    this._filmCard.setButtonFavoriteClickHandler((evt) => {
      evt.preventDefault();

      this._onDataChange(this, card, Object.assign({}, card, {
        isFavorite: !card.isFavorite
      }));
    });

    if (oldFilmCardDetails && oldFilmCard) {
      replace(this._filmCard, oldFilmCard);
      replace(this._filmCardDetails, oldFilmCardDetails);
    } else {
      render(this._container, this._filmCard.getElement(), RenderPosition.BEFOREEND);
    }
  }
  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      remove(this._filmCardDetails);
    }
  }
}
