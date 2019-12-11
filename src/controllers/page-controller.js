import FilmCardDetailsComponent from '../components/film-details';
import CommentsComponent from '../components/comments.js';
import FilmCardComponent from '../components/film-card.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import ExtraFilmSectionComponent from '../components/films-sub-section.js';
import AlertComponent from '../components/alert.js';
import {SortType} from '../components/sort-form.js';

import {
  RenderPosition,
  render,
  replace,
  remove
} from '../utils.js/render';

const renderCard = (container, card) => {
  const siteMainSection = document.querySelector(`main`);
  const filmCard = new FilmCardComponent(card);
  const filmCardDetails = new FilmCardDetailsComponent(card);
  const filmCardParts = filmCard.getElement().querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`);
  const commentSectionDetailsCard = filmCardDetails.getElement().querySelector(`.film-details__comments-list`);
  const comments = card.comments;

  const onEscKeydown = (evt) => {
    const isEscape = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscape) {
      remove(filmCardDetails);
      document.removeEventListener(`keydown`, onEscKeydown);
    }
  };

  const onCloseButtonClick = () => {
    remove(filmCardDetails);
  };

  const onFilmInnerClick = () => {
    render(siteMainSection, filmCardDetails.getElement(), RenderPosition.BEFOREEND);
    comments.forEach((comment) => render(commentSectionDetailsCard, new CommentsComponent(comment).getElement(), RenderPosition.BEFOREEND));
    document.addEventListener(`keydown`, onEscKeydown);
    filmCardDetails.setButtonCloseClickHandler(onCloseButtonClick);
  };

  filmCard.setFilmInnersClickHandlers(filmCardParts, onFilmInnerClick);

  render(container, filmCard.getElement(), RenderPosition.BEFOREEND);
};

const renderCards = (cardList, cards) => {
  cards.forEach((card) => renderCard(cardList, card));
};

export default class PageController {
  constructor(container, sort) { // boardComponent, просто контейнер, через который можно будет вытащить подходящие DOM-элементы.
    this._container = container;
    this._filmCard = new FilmCardComponent();
    this._alert = new AlertComponent();
    this._showMoreButton = new ShowMoreButtonComponent();
    this._sortComponent = sort;
  }
  render(cards, totalAmountCards) {
    const EXTRA_LIST_AMOUNT_CARDS = 2;
    const filmListContainer = this._container.getElement().querySelector(`.films .films-list__container`);
    let startAmountCards = 5;

    const sortByStat = (films, prop) => {
      const [...copiedCards] = films;
      return copiedCards.sort((a, b) => b[prop] - a[prop]);
    };

    const renderTopRatedFilms = () => {
      render(this._container.getElement(), new ExtraFilmSectionComponent(`Top Rated`, `films-list--extra-rated`).getElement(), RenderPosition.BEFOREEND);
      const topRatedFilmsContainer = document.querySelector(`.films-list--extra-rated .films-list__container`);
      const topRatedFilms = sortByStat(cards, `rating`);
      const lowRatingFilms = topRatedFilms.filter((it) => (parseInt(it.rating, 10)) === 0);
      if (lowRatingFilms === cards.length) {
        remove(topRatedFilmsContainer);
        return;
      }
      topRatedFilms.slice(0, EXTRA_LIST_AMOUNT_CARDS).forEach((card) => renderCard(topRatedFilmsContainer, card));
    };

    const renderMostCommentedFilms = () => {
      render(this._container.getElement(), new ExtraFilmSectionComponent(`Most Commented`, `films-list--extra-commented`).getElement(), RenderPosition.BEFOREEND);
      const mostCommentedFilmsContainer = document.querySelector(`.films-list--extra-commented .films-list__container`);
      const mostCommentedFilms = sortByStat(cards, `commentsAmount`);
      const lowCommentsFilms = mostCommentedFilms.filter((it) => it.commentsAmount === 0);
      if (lowCommentsFilms === cards.length) {
        remove(mostCommentedFilmsContainer);
        return;
      }
      mostCommentedFilms.slice(0, EXTRA_LIST_AMOUNT_CARDS).forEach((card) => renderCard(mostCommentedFilmsContainer, card));
    };

    const checkDataAmount = () => {
      if (cards.length === 0) {
        replace(this._alert, this._container);
        return;
      }
      cards.slice(0, startAmountCards).forEach((card) => renderCard(filmListContainer, card));
      renderTopRatedFilms();
      renderMostCommentedFilms();
    };

    checkDataAmount();

    const renderShowMoreButton = (array) => {
      if (startAmountCards >= array.length) {
        return;
      }
      render(this._container.getElement().querySelector(`.films .films-list`), this._showMoreButton.getElement(), RenderPosition.BEFOREEND);
      const onShowMoreFilmsButtonClick = () => {
        let filmsToShow = totalAmountCards - startAmountCards;
        startAmountCards += filmsToShow > 5 ? 5 : filmsToShow;
        filmListContainer.innerHTML = ``;
        array.slice(0, startAmountCards).forEach((card) => renderCard(filmListContainer, card));
        if (startAmountCards === totalAmountCards) {
          remove(this._showMoreButton);
        }
      };

      this._showMoreButton.setShowMoreButtonClickHandler(onShowMoreFilmsButtonClick);
    };

    renderShowMoreButton(cards);

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      let sortedCards = [];
      switch (sortType) {
        case SortType.DATE_UP:
          sortedCards = cards.slice().sort((a, b) => b.year - a.year);
          break;
        case SortType.RATING_UP:
          sortedCards = cards.slice().sort((a, b) => b.rating - a.rating);
          break;
        case SortType.DEFAULT:
          sortedCards = cards.slice();
          break;
      }
      remove(this._showMoreButton);
      startAmountCards = 5;
      filmListContainer.innerHTML = ``;
      renderShowMoreButton(sortedCards);
      renderCards(filmListContainer, sortedCards.slice(0, startAmountCards));
    });

  }
}
