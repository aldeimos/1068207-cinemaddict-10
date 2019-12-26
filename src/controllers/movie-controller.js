import FilmCardDetailsComponent from '../components/film-details';
import FilmCardComponent from '../components/film-card.js';

import moment from "moment";
import {
  RenderPosition,
  render,
  remove,
  replace
} from '../utils/render';

const Mode = {
  DEFAULT: `default`,
  DETAILS: `details`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange, filterController) {
    this._container = container;
    this._filmCard = null;
    this._filmCardDetails = null;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._filterController = filterController;
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
        document.removeEventListener(`keyup`, onCtrlEnterKeyup);
      }
    };

    const onButtonCloseClick = () => {
      remove(this._filmCardDetails);
      document.removeEventListener(`keyup`, onCtrlEnterKeyup);
      document.removeEventListener(`keydown`, onEscKeydown);
    };

    const onCtrlEnterKeyup = (evt) => {
      const isCombinationPressed = (evt.key === `Enter` && evt.ctrlKey);
      if (isCombinationPressed) {
        const emojiSrc = this._filmCardDetails.getElement().querySelector(`.film-details__emoji-item:checked`);
        const newComment = {
          id: String(new Date() + Math.random()),
          name: `You`,
          text: this._filmCardDetails.getElement().querySelector(`textarea`).value,
          date: moment().startOf().fromNow(),
          emoji: `./images/emoji/${emojiSrc.value}.png`,
        };
        if (newComment.text === `` || newComment.emoji === `./`) {
          return;
        }
        card.comments.push(newComment);
        this._filmCardDetails.renderComments();
        this._filmCardDetails.clearForm();
        this._filmCardDetails.rerenderCommentsBlockTitle();
      }
    };

    const onFilmInnerClick = () => {
      this._onViewChange();
      this._mode = Mode.DETAILS;
      render(siteMainSection, this._filmCardDetails.getElement(), RenderPosition.BEFOREEND);
      const buttonCloseDetails = this._filmCardDetails.getElement().querySelector(`.film-details__close-btn`);
      document.addEventListener(`keydown`, onEscKeydown);
      document.addEventListener(`keyup`, onCtrlEnterKeyup);
      buttonCloseDetails.addEventListener(`click`, onButtonCloseClick);
      this._filmCardDetails._subscribeOnEvents();
      this._filmCardDetails.renderComments();
    };
    this._filmCard.setFilmInnersClickHandlers(filmCardParts, onFilmInnerClick);
    this._filmCard.setButtonWatchlistClickHandler((evt) => {
      evt.preventDefault();

      this._onDataChange(this, card, Object.assign({}, card, {
        toWatch: !card.toWatch,
      }));
      this._filterController._onDataChange();
    });
    this._filmCard.setButtonWatchedClickHandler((evt) => {
      evt.preventDefault();

      this._onDataChange(this, card, Object.assign({}, card, {
        isWatched: !card.isWatched
      }));
      this._filterController._onDataChange();
    });
    this._filmCard.setButtonFavoriteClickHandler((evt) => {
      evt.preventDefault();

      this._onDataChange(this, card, Object.assign({}, card, {
        isFavorite: !card.isFavorite
      }));
      this._filterController._onDataChange();
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
