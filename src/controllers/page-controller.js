import ExtraFilmSectionComponent from '../components/films-sub-section.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import AlertComponent from '../components/alert.js';
import MovieController from '../controllers/movie-controller.js';
import {SortType} from '../components/sort-form.js';

import {RenderPosition, render, remove, replace} from '../utils.js/render';

const TOTAL_AMOUNT_CARDS = 15;
const EXTRA_LIST_AMOUNT_CARDS = 2;
let startAmountCards = 5;

const renderCards = (filmListContainer, cards, onDataChange, onViewChange) => {
  return cards.map((card) => {
    const movieController = new MovieController(filmListContainer, onDataChange, onViewChange);
    movieController.render(card);
    return movieController;
  });
};

export default class PageController {
  constructor(container, sort) {
    this._container = container;

    this._cards = [];
    this._showedCardControllers = [];
    this._alert = new AlertComponent();
    this._showMoreButton = new ShowMoreButtonComponent();
    this._sortComponent = sort;
    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }
  render(cards) {
    this._cards = cards;
    const filmListContainer = this._container.getElement().querySelector(`.films .films-list__container`);

    const checkDataAmount = () => {
      if (this._cards.length === 0) {
        replace(this._alert, this._container);
        return;
      }
      const newCards = renderCards(
          filmListContainer,
          this._cards.slice(0, startAmountCards),
          this._onDataChange,
          this._onViewChange
      );
      this._showedCardControllers = this._showedCardControllers.concat(newCards);
    };

    checkDataAmount();

    const sortByStat = (films, prop) => {
      const [...copiedCards] = films;
      return copiedCards.sort((a, b) => b[prop] - a[prop]);
    };

    const renderTopRatedFilms = () => {
      render(
          this._container.getElement(),
          new ExtraFilmSectionComponent(`Top Rated`, `films-list--extra-rated`).getElement(),
          RenderPosition.BEFOREEND
      );
      const topRatedFilmsContainer = document.querySelector(`.films-list--extra-rated .films-list__container`);
      const topRatedFilms = sortByStat(this._cards, `rating`);
      const lowRatingFilms = topRatedFilms.filter((it) => parseInt(it.rating, 10) === 0);
      if (lowRatingFilms === this._cards.length) {
        remove(topRatedFilmsContainer);
        return;
      }
      renderCards(
          topRatedFilmsContainer,
          topRatedFilms.slice(0, EXTRA_LIST_AMOUNT_CARDS),
          this._onDataChange,
          this._onViewChange
      );
    };

    const renderMostCommentedFilms = () => {
      render(
          this._container.getElement(),
          new ExtraFilmSectionComponent(`Most Commented`, `films-list--extra-commented`).getElement(),
          RenderPosition.BEFOREEND
      );
      const mostCommentedFilmsContainer = document.querySelector(
          `.films-list--extra-commented .films-list__container`
      );
      const mostCommentedFilms = sortByStat(this._cards, `commentsAmount`);
      const lowCommentsFilms = mostCommentedFilms.filter((it) => it.commentsAmount === 0);
      if (lowCommentsFilms === this._cards.length) {
        remove(mostCommentedFilmsContainer);
        return;
      }
      renderCards(
          mostCommentedFilmsContainer,
          mostCommentedFilms.slice(0, EXTRA_LIST_AMOUNT_CARDS),
          this._onDataChange,
          this._onViewChange
      );
    };
    renderTopRatedFilms();
    renderMostCommentedFilms();
    this._renderShowMoreButton(this._cards);
  }
  _onDataChange(movieController, oldData, newData) {
    const index = this._cards.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    const array = this._cards.slice();
    array[index] = newData;
    this._cards = array;

    movieController.render(this._cards[index]);
  }

  _onViewChange() {
    this._showedCardControllers.forEach((it) => it.setDefaultView());
  }
  _onSortTypeChange(sortType) {
    let sortedCards = [];
    const filmListContainer = this._container.getElement().querySelector(`.films .films-list__container`);
    switch (sortType) {
      case SortType.DATE_UP:
        sortedCards = this._cards.slice().sort((a, b) => b.year - a.year);
        break;
      case SortType.RATING_UP:
        sortedCards = this._cards.slice().sort((a, b) => b.rating - a.rating);
        break;
      case SortType.DEFAULT:
        sortedCards = this._cards.slice();
        break;
    }
    remove(this._showMoreButton);
    startAmountCards = 5;
    filmListContainer.innerHTML = ``;
    this._renderShowMoreButton(sortedCards);
    renderCards(filmListContainer, sortedCards.slice(0, startAmountCards));
  }
  _renderShowMoreButton(array) {
    if (startAmountCards >= array.length) {
      return;
    }
    render(
        this._container.getElement().querySelector(`.films .films-list`),
        this._showMoreButton.getElement(),
        RenderPosition.BEFOREEND
    );
    const onShowMoreFilmsButtonClick = () => {
      const filmListContainer = this._container.getElement().querySelector(`.films .films-list__container`);
      let filmsToShow = TOTAL_AMOUNT_CARDS - startAmountCards;
      startAmountCards += filmsToShow > 5 ? 5 : filmsToShow;
      filmListContainer.innerHTML = ``;
      const newCards = renderCards(
          filmListContainer,
          array.slice(0, startAmountCards),
          this._onDataChange,
          this._onViewChange
      );
      this._showedCardControllers = this._showedCardControllers.concat(newCards);
      if (startAmountCards === TOTAL_AMOUNT_CARDS) {
        remove(this._showMoreButton);
      }
    };

    this._showMoreButton.setShowMoreButtonClickHandler(onShowMoreFilmsButtonClick);
  }
}
