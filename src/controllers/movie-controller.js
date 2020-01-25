import FilmCardDetailsComponent from '../components/film-details';
import FilmCardComponent from '../components/film-card.js';
import MovieModel from '../models/movie.js';

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

import {
  getRandomIntegerFromGap,
  formatDate
} from '../utils/common.js';


export default class MovieController {
  constructor(container, onDataChange, onViewChange, filterController, onCommentsChange, onCommentDelete) {
    this._container = container;
    this._filmCard = null;
    this._filmCardDetails = null;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._onCommentsChange = onCommentsChange;
    this._onCommentDelete = onCommentDelete;
    this._mode = Mode.DEFAULT;
    this._filterController = filterController;
    this._onEscKeyDown = this.onEscKeydown.bind(this);
    this._onCtrlEnterKeyup = this.onCtrlEnterKeyup.bind(this);
  }
  render(card) {
    const oldFilmCard = this._filmCard;
    const oldFilmCardDetails = this._filmCardDetails;
    const siteMainSection = document.querySelector(`main`);
    this._filmCard = new FilmCardComponent(card);
    this._filmCardDetails = new FilmCardDetailsComponent(card);
    const filmCardParts = this._filmCard.getElement().querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`);

    const onButtonCloseClick = () => {
      remove(this._filmCardDetails);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
      document.removeEventListener(`keyup`, this._onCtrlEnterKeyup);
    };

    const onFilmInnerClick = () => {
      this._onViewChange();
      this._mode = Mode.DETAILS;
      this._filmCardDetails.getElement().classList.add(`bounce-in-right`);
      render(siteMainSection, this._filmCardDetails.getElement(), RenderPosition.BEFOREEND);
      this.setPutRatingClickHanlder();
      const buttonCloseDetails = this._filmCardDetails.getElement().querySelector(`.film-details__close-btn`);
      buttonCloseDetails.addEventListener(`click`, onButtonCloseClick);
      this._filmCardDetails.renderComments();
      this._filmCardDetails.rerenderCommentsBlockTitle();
      this.setFilmDetailsButtonClick(card);
      this._filmCardDetails.showRatingBlock();
      this.setDeleteCommentClickHandler();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
      document.removeEventListener(`keyup`, this._onCtrlEnterKeyup);
      document.addEventListener(`keydown`, this._onEscKeyDown);
      document.addEventListener(`keyup`, this._onCtrlEnterKeyup);
    };
    this._filmCard.setFilmInnersClickHandlers(filmCardParts, onFilmInnerClick);
    this._filmCard.setButtonWatchlistClickHandler((evt) => {
      evt.preventDefault();
      const newCard = MovieModel.clone(card);
      newCard.watchList = !newCard.watchList;
      this._onDataChange(this, card, newCard);
    });
    this._filmCard.setButtonWatchedClickHandler((evt) => {

      evt.preventDefault();
      const newCard = MovieModel.clone(card);
      newCard.alreadyWatched = !newCard.alreadyWatched;
      if (!newCard.alreadyWatched) {
        newCard.personalRating = 0;
      }
      newCard.watchingDate = newCard.watchingDate ? formatDate(new Date()) : null;
      this._onDataChange(this, card, newCard);
    });
    this._filmCard.setButtonFavoriteClickHandler((evt) => {
      evt.preventDefault();
      const newCard = MovieModel.clone(card);
      newCard.favorite = !newCard.favorite;
      this._onDataChange(this, card, newCard);
    });

    if (oldFilmCardDetails && oldFilmCard) {
      replace(this._filmCard, oldFilmCard);
      replace(this._filmCardDetails, oldFilmCardDetails);
    } else {
      render(this._container, this._filmCard.getElement(), RenderPosition.BEFOREEND);
    }
    this._filmCardDetails.renderComments();
    this._filmCardDetails.rerenderCommentsBlockTitle();
    this._filmCardDetails.setRatingValue();
    this.setDeleteCommentClickHandler();
    const buttonCloseDetails = this._filmCardDetails.getElement().querySelector(`.film-details__close-btn`);
    buttonCloseDetails.addEventListener(`click`, onButtonCloseClick);
    this._filmCardDetails.recoveryListeners();
    this.setFilmDetailsButtonClick(card);
    this._filmCardDetails.showRatingBlock();
  }
  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      document.removeEventListener(`keydown`, this._onEscKeyDown);
      document.removeEventListener(`keyup`, this._onCtrlEnterKeyup);
      remove(this._filmCardDetails);
    }
  }
  setDeleteCommentClickHandler() {
    const onDeleteButtonClick = (evt) => {
      evt.preventDefault();
      const card = this._filmCardDetails.getCard();
      const indexNumber = evt.target.dataset.indexNumber;
      const newCard = MovieModel.clone(card);
      newCard.commentsList = card.commentsList.filter((comment) => comment.id !== indexNumber);
      newCard.comments = card.comments.filter((commentId) => commentId !== indexNumber);
      this._onCommentDelete(newCard.id, newCard, indexNumber).then((response) => {
        response.commentsList = newCard.commentsList;
        this._filmCardDetails.updateCommentsArray(response.commentsList);
        this._filmCardDetails.rerenderCommentsBlockTitle();
        this._filmCardDetails.renderComments();
        this.setDeleteCommentClickHandler();
      });
      this._onDataChange(this, card, newCard);
    };

    [...this._filmCardDetails.getElement().querySelectorAll(`.film-details__comment-delete`)].forEach((button) => {
      button.removeEventListener(`click`, onDeleteButtonClick);
    });

    [...this._filmCardDetails.getElement().querySelectorAll(`.film-details__comment-delete`)].forEach((button) => {
      button.addEventListener(`click`, onDeleteButtonClick);
    });
  }
  setCommentSendErrorHandler() {
    const newCommentBlock = this._filmCardDetails.getElement().querySelector(`.film-details__new-comment`);
    const newCommentTextarea = newCommentBlock.querySelector(`.film-details__comment-input`);
    newCommentTextarea.disabled = false;
    newCommentTextarea.style.border = `1px solid red`;
    newCommentBlock.classList.add(`shake`);
  }
  setPutRatingClickHanlder() {
    const oldCard = this._filmCardDetails.getCard();
    const ratingButtons = [...this._filmCardDetails.getElement().querySelectorAll(`.film-details__user-rating-input`)];
    const onResetButtonClick = () => {
      ratingButtons.forEach((button) => {
        button.checked = false;
      });
      const newCard = MovieModel.clone(oldCard);
      newCard.personalRating = 0;
      this._onDataChange(this, oldCard, newCard);
    };

    const onRatingButtonClick = (evt) => {
      const onRatingSendError = () => {
        const ratingLabels = ratingBlock.querySelectorAll(`.film-details__user-rating-label`);
        ratingLabels[(+evt.target.value - 1)].style.background = `red`;
        ratingBlock.classList.add(`shake`);

      };
      const newCard = MovieModel.clone(oldCard);
      newCard.personalRating = parseInt(evt.target.value, 10);
      ratingButtons.forEach((button) => {
        button.disabled = true;
      });
      this._onDataChange(this, oldCard, newCard, onRatingSendError);
    };

    const ratingBlock = this._filmCardDetails.getElement().querySelector(`.film-details__user-wrap`);
    const resetButton = this._filmCardDetails.getElement().querySelector(`.film-details__watched-reset`);

    ratingButtons.forEach((button) => {
      button.addEventListener(`click`, onRatingButtonClick);
    });
    resetButton.addEventListener(`click`, onResetButtonClick);
  }

  setFilmDetailsButtonClick(card) {
    this._filmCardDetails.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, () => {
      const newCard = MovieModel.clone(card);
      newCard.watchList = !newCard.watchList;
      this._onDataChange(this, card, newCard);
    });
    this._filmCardDetails.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, () => {
      const newCard = MovieModel.clone(card);
      newCard.alreadyWatched = !newCard.alreadyWatched;
      newCard.personalRating = 0;
      this._onDataChange(this, card, newCard);
    });
    this._filmCardDetails.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, () => {
      const newCard = MovieModel.clone(card);
      newCard.favorite = !newCard.favorite;
      this._onDataChange(this, card, newCard);
    });
  }
  onEscKeydown(evt) {
    const isEscape = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscape) {
      remove(this._filmCardDetails);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
      document.removeEventListener(`keyup`, this._onCtrlEnterKeyup);
    }
  }
  onCtrlEnterKeyup(evt) {
    const isCombinationPressed = (evt.key === `Enter` && evt.ctrlKey);
    if (isCombinationPressed) {
      const emojiSrc = this._filmCardDetails.getElement().querySelector(`.film-details__emoji-item:checked`);
      const newComment = {
        id: `${getRandomIntegerFromGap(2700, 2800)}`,
        author: `You`,
        comment: this._filmCardDetails.getElement().querySelector(`textarea`).value,
        date: new Date(),
        emotion: `${emojiSrc.value}`,
      };

      if (newComment.text === `` || newComment.emoji === `./`) {
        return;
      }
      const detailedCard = this._filmCardDetails.getCard();
      const newCard = MovieModel.clone(detailedCard);
      const newCommentTextarea = this._filmCardDetails.getElement().querySelector(`.film-details__comment-input`);
      newCard.comments.push(newComment.id);
      newCard.commentsList = detailedCard.commentsList;
      newCard.commentsList.push(newComment);
      newCommentTextarea.disabled = true;
      this._onCommentsChange(newCard, newComment, this.setCommentSendErrorHandler.bind(this))
        .then((response) => {
          newCard.commentsList = response.comments;
        });
      this._onDataChange(this, detailedCard, newCard, this.setCommentSendErrorHandler.bind(this));
    }
    const buttonCloseDetails = this._filmCardDetails.getElement().querySelector(`.film-details__close-btn`);
    buttonCloseDetails.addEventListener(`click`, this.testClick);
    this._filmCardDetails.recoveryListeners();
  }
}
