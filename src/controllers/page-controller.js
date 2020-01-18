import ExtraFilmSectionComponent from '../components/films-sub-section.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import AlertComponent from '../components/alert.js';
import MovieController from '../controllers/movie-controller.js';
import StatsComponent from '../components/statistics.js';
import {
  FilterTypeStatistic
} from '../const.js';

import {
  SortType
} from '../components/sort-form.js';

import moment from 'moment';

import {
  RenderPosition,
  render,
  remove,
  replace
} from '../utils/render';

const EXTRA_LIST_AMOUNT_CARDS = 2;
let startAmountCards = 5;

const renderCards = (filmListContainer, cards, onDataChange, onViewChange, filterController, moviesModel, onCommentsChange, onCommentDelete) => {
  const comments = moviesModel.getComments();
  return cards.map((card) => {
    card.commentsList = comments[card[`id`]];
    const movieController = new MovieController(filmListContainer, onDataChange, onViewChange, filterController, onCommentsChange, onCommentDelete);
    movieController.render(card);
    return movieController;
  });
};

export default class PageController {
  constructor(container, sort, moviesModel, filterController, stats, api) {
    this._api = api;
    this._container = container;
    this._mainSection = document.querySelector(`main`);
    this._moviesModel = moviesModel;
    this._showedCardControllers = [];
    this._alert = new AlertComponent();
    this._showMoreButton = new ShowMoreButtonComponent();
    this._sortComponent = sort;
    this._onCommentsChange = this._onCommentsChange.bind(this);
    this._onCommentDelete = this._onCommentDelete.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._statsComponent = stats;
    this._statsComponent.setActiveFilter();
    this._filterController = filterController;
    this._filterComponent = filterController.getFilterComponent();
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }
  render() {
    const cards = this._moviesModel.getFilms();
    const comments = this._moviesModel.getComments();
    this.setCommentsForEachFilm(cards, comments);
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
          this._filterController,
          this._moviesModel,
          this._onCommentsChange,
          this._onCommentDelete
      );
      this._showedCardControllers = this._showedCardControllers.concat(newCards);
    };

    checkDataAmount();

    const sortByStat = (films, prop) => {
      const [...copiedCards] = films;
      if (prop === `comments`) {
        return copiedCards.sort((a, b) => b[prop].length - a[prop].length);
      }
      return copiedCards.sort((a, b) => b[prop] - a[prop]);
    };

    const renderTopRatedFilms = () => {
      render(
          this._container.getElement(),
          new ExtraFilmSectionComponent(`Top Rated`, `films-list--extra-rated`).getElement(),
          RenderPosition.BEFOREEND
      );
      const topRatedFilmsContainer = document.querySelector(`.films-list--extra-rated .films-list__container`);
      const topRatedFilms = sortByStat(cards, `totalRating`);
      const lowRatingFilms = topRatedFilms.filter((it) => parseInt(it.totalRating, 10) === 0);
      if (lowRatingFilms === cards.length) {
        remove(topRatedFilmsContainer);
        return;
      }
      renderCards(
          topRatedFilmsContainer,
          topRatedFilms.slice(0, EXTRA_LIST_AMOUNT_CARDS),
          this._onDataChange,
          this._onViewChange,
          this._filterController,
          this._moviesModel,
          this._onCommentsChange,
          this._onCommentDelete
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
      const mostCommentedFilms = sortByStat(cards, `comments`);
      const lowCommentsFilms = mostCommentedFilms.filter((it) => it.comments.length === 0);
      if (lowCommentsFilms === cards.length) {
        remove(mostCommentedFilmsContainer);
        return;
      }
      renderCards(
          mostCommentedFilmsContainer,
          mostCommentedFilms.slice(0, EXTRA_LIST_AMOUNT_CARDS),
          this._onDataChange,
          this._onViewChange,
          this._filterController,
          this._moviesModel,
          this._onCommentsChange,
          this._onCommentDelete
      );
    };
    renderTopRatedFilms();
    renderMostCommentedFilms();
    this._renderShowMoreButton(cards);
    this.setFilterStatisticClickHandler();
    this.setFiltersHandler();
  }
  _onDataChange(movieController, oldData, newData, errorHandler = this.throwDefaultError) {
    this._api.updateFilm(oldData.id, newData)
      .then((movieModel) => {
        newData.comments = movieModel.comments;
        const isSuccess = this._moviesModel.updateFilm(oldData.id, movieModel);
        this._api.getComments(newData.id).then((commentsList) => {
          newData.comments = movieModel.comments;
          newData.commentsList = commentsList;
          if (isSuccess) {
            movieController.render(newData);
          }
        });
        remove(this._showMoreButton);
        this._renderShowMoreButton(this._moviesModel.getFilms());
        this._filterController.updateData();
        this.updateStatsComponent();
        this.setFiltersHandler();
        this.setFilterStatisticClickHandler();
      }).catch(() => {
        errorHandler();
      });
  }

  _onViewChange() {
    this._showedCardControllers.forEach((it) => it.setDefaultView());
  }

  _onCommentsChange(newData, newComment) {
    return this._api.createComment(newData.id, newComment);
  }

  _onCommentDelete(filmId, newData, commentId) {
    this._api.deleteComment(commentId);
    return this._api.updateFilm(filmId, newData);
  }

  updateStatsComponent(radioButtonValue = FilterTypeStatistic.ALL) {
    remove(this._statsComponent);
    this._statsComponent = new StatsComponent(this._moviesModel.getAllFilms(), radioButtonValue);
    this._statsComponent.setFilterType(radioButtonValue);
    this._statsComponent.setActiveFilter();
    this.setFilterStatisticClickHandler();
    render(this._mainSection, this._statsComponent.getElement(), RenderPosition.BEFOREEND);
    this._statsComponent.show();
  }

  _onSortTypeChange(sortType) {
    const cards = this._moviesModel.getFilms();
    let sortedCards = [];
    const filmListContainer = this._container.getElement().querySelector(`.films .films-list__container`);
    switch (sortType) {
      case SortType.DATE_UP:
        sortedCards = cards.slice().sort((a, b) => moment(b.date).unix() - moment(a.date).unix());
        break;
      case SortType.RATING_UP:
        sortedCards = cards.slice().sort((a, b) => b.totalRating - a.totalRating);
        break;
      case SortType.DEFAULT:
        sortedCards = cards.slice();
        break;
    }
    remove(this._showMoreButton);
    startAmountCards = 5;
    filmListContainer.innerHTML = ``;
    this._renderShowMoreButton(sortedCards);
    const sortedFilms = renderCards(filmListContainer, sortedCards.slice(0, startAmountCards), this._onDataChange, this._onViewChange, this._filterController, this._moviesModel, this._onCommentsChange, this._onCommentDelete);
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
          this._filterController,
          this._moviesModel,
          this._onCommentsChange,
          this._onCommentDelete
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
    renderCards(container, filteredFilms.slice(0, startAmountCards), this._onDataChange, this._onViewChange, this._filterController, this._moviesModel, this._onCommentsChange, this._onCommentDelete);
    remove(this._showMoreButton);
    this._renderShowMoreButton(filteredFilms);
  }
  show() {
    this._sortComponent.getElement().classList.remove(`visually-hidden`);
    this._container.getElement().classList.remove(`visually-hidden`);
  }
  hide() {
    this._sortComponent.getElement().classList.add(`visually-hidden`);
    this._container.getElement().classList.add(`visually-hidden`);
  }
  setFiltersHandler() {
    this._filterController.setFiltersHandler(this._onFilterChange);
    this._filterController.switchToStatistics(this.hide, this._statsComponent.show);
    this._filterController.switchToFilms(this.show, this._statsComponent.hide);
  }
  setFilterStatisticClickHandler() {
    [...this._statsComponent.getElement().querySelectorAll(`.statistic__filters-input`)].forEach((button) => {
      button.addEventListener(`click`, (evt) => {
        this.updateStatsComponent(evt.target.value);
      });
    });
  }
  setCommentsForEachFilm(films, commentsArray) {
    films.forEach((film) => {
      const filmId = film[`id`];
      film.commentsList = commentsArray[filmId];
    });
  }
  throwDefaultError() {
    throw new Error(`Something goes wrong...`);
  }
}
