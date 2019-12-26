import ExtraFilmSectionComponent from '../components/films-sub-section.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import AlertComponent from '../components/alert.js';
import MovieController from '../controllers/movie-controller.js';
import {
  SortType
} from '../components/sort-form.js';

import {
  RenderPosition,
  render,
  remove,
  replace
} from '../utils/render';

const EXTRA_LIST_AMOUNT_CARDS = 2;
let startAmountCards = 5;

const renderCards = (filmListContainer, cards, onDataChange, onViewChange, filterController) => {
  return cards.map((card) => {
    const movieController = new MovieController(filmListContainer, onDataChange, onViewChange, filterController);
    movieController.render(card);
    return movieController;
  });
};

export default class PageController {
  constructor(container, sort, moviesModel, filterController) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._showedCardControllers = [];
    this._alert = new AlertComponent();
    this._showMoreButton = new ShowMoreButtonComponent();
    this._sortComponent = sort;
    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);

    this._filterController = filterController;
    this._filterComponent = filterController._filterComponent;
  }
  render() {
    const cards = this._moviesModel.getFilms();
    const filmListContainer = this._container.getElement().querySelector(`.films .films-list__container`);

    const checkDataAmount = () => {
      if (cards.length === 0) {
        replace(this._alert, this._container);
        return;
      }
      const newCards = renderCards(
          filmListContainer,
          cards.slice(0, startAmountCards),
          this._onDataChange,
          this._onViewChange,
          this._filterController
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
      const topRatedFilms = sortByStat(cards, `rating`);
      const lowRatingFilms = topRatedFilms.filter((it) => parseInt(it.rating, 10) === 0);
      if (lowRatingFilms === cards.length) {
        remove(topRatedFilmsContainer);
        return;
      }
      renderCards(
          topRatedFilmsContainer,
          topRatedFilms.slice(0, EXTRA_LIST_AMOUNT_CARDS),
          this._onDataChange,
          this._onViewChange,
          this._filterController
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
      const mostCommentedFilms = sortByStat(cards, `commentsAmount`);
      const lowCommentsFilms = mostCommentedFilms.filter((it) => it.commentsAmount === 0);
      if (lowCommentsFilms === cards.length) {
        remove(mostCommentedFilmsContainer);
        return;
      }
      renderCards(
          mostCommentedFilmsContainer,
          mostCommentedFilms.slice(0, EXTRA_LIST_AMOUNT_CARDS),
          this._onDataChange,
          this._onViewChange,
          this._filterController
      );
    };
    renderTopRatedFilms();
    renderMostCommentedFilms();
    this._renderShowMoreButton(cards);
    this._filterComponent.getElement().addEventListener(`click`, (evt) => {
      [...this._filterComponent.getElement().querySelectorAll(`.main-navigation__item`)].forEach((button) => {
        if (button === evt.target) {
          button.classList.add(`main-navigation__item--active`);
        } else {
          button.classList.remove(`main-navigation__item--active`);
        }
      });
      const activeFilterValue = evt.target.textContent.slice(0, -2);
      this._filterController._activeFilterType = activeFilterValue;
      this._moviesModel.setFilter(activeFilterValue);
      this._onFilterChange();
    });
  }
  _onDataChange(movieController, oldData, newData) {
    const isSuccess = this._moviesModel.updateFilm(oldData.id, newData);
    if (isSuccess) {
      movieController.render(newData);
    }
  }

  _onViewChange() {
    this._showedCardControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    const cards = this._moviesModel.getFilms();
    let sortedCards = [];
    const filmListContainer = this._container.getElement().querySelector(`.films .films-list__container`);
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
    this._renderShowMoreButton(sortedCards);
    const sortedFilms = renderCards(filmListContainer, sortedCards.slice(0, startAmountCards), this._onDataChange, this._onViewChange, this._filterController);
    this._showedCardControllers = this._showedCardControllers.concat(sortedFilms);
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
      let totalAmountOfCards = array.length;
      let filmsToShow = totalAmountOfCards - startAmountCards;
      startAmountCards += filmsToShow > 5 ? 5 : filmsToShow;
      filmListContainer.innerHTML = ``;
      const newCards = renderCards(
          filmListContainer,
          array.slice(0, startAmountCards),
          this._onDataChange,
          this._onViewChange,
          this._filterController
      );
      this._showedCardControllers = this._showedCardControllers.concat(newCards);
      if (startAmountCards === totalAmountOfCards) {
        remove(this._showMoreButton);
      }
    };

    this._showMoreButton.setShowMoreButtonClickHandler(onShowMoreFilmsButtonClick);
  }
  _onFilterChange() {
    const filteredFilms = this._moviesModel.getFilms();
    startAmountCards = 5;
    const container = this._container.getElement().querySelector(`.films .films-list__container`);
    container.innerHTML = ``;
    renderCards(container, filteredFilms.slice(0, startAmountCards), this._onDataChange, this._onViewChange, this._filterController);
    this._renderShowMoreButton(filteredFilms);
  }
}
