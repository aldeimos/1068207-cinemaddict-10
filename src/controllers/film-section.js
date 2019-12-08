import FilmCardDetailsComponent from '../components/film-details';
import CommentsComponent from '../components/comments.js';
import FilmCardComponent from '../components/film-card.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import ExtraFilmSectionComponent from '../components/films-sub-section.js';
import AlertComponent from '../components/alert.js';
import {
  RenderPosition,
  render
} from '../utils.js';

const renderCard = (card, container) => {
  const siteMainSection = document.querySelector(`main`);
  const filmCard = new FilmCardComponent(card);
  const filmCardDetails = new FilmCardDetailsComponent(card);
  const filmCardParts = filmCard.getElement().querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`);
  const commentSectionDetailsCard = filmCardDetails.getElement().querySelector(`.film-details__comments-list`);
  const comments = card.comments;

  const onEscKeydown = (evt) => {
    const isEscape = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscape) {
      filmCardDetails.getElement().remove();
      filmCardDetails.removeElement();
      document.removeEventListener(`keydown`, onEscKeydown);
    }
  };

  const onCloseButtonClick = () => {
    filmCardDetails.getElement().remove();
    filmCardDetails.removeElement();
  };

  const onFilmInnerClick = () => {
    render(siteMainSection, filmCardDetails.getElement(), RenderPosition.BEFOREEND);
    comments.forEach((comment) => render(commentSectionDetailsCard, new CommentsComponent(comment).getElement(), RenderPosition.BEFOREEND));
    document.addEventListener(`keydown`, onEscKeydown);
    filmCardDetails.setClickHandler(onCloseButtonClick);
  };

  filmCard.setClickHandlers(filmCardParts, onFilmInnerClick);

  render(container, filmCard.getElement(), RenderPosition.BEFOREEND);
};

export default class PageController {
  constructor(container) { // boardComponent, просто контейнер, через который можно будет вытащить подходящие DOM-элементы.
    this._container = container;
    this._filmCard = new FilmCardComponent();
    this._alert = new AlertComponent();
    this._showMoreButton = new ShowMoreButtonComponent();
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
        topRatedFilmsContainer.remove();
        return;
      }
      topRatedFilms.slice(0, EXTRA_LIST_AMOUNT_CARDS).forEach((card) => renderCard(card, topRatedFilmsContainer));
    };

    const renderMostCommentedFilms = () => {
      render(this._container.getElement(), new ExtraFilmSectionComponent(`Most Commented`, `films-list--extra-commented`).getElement(), RenderPosition.BEFOREEND);
      const mostCommentedFilmsContainer = document.querySelector(`.films-list--extra-commented .films-list__container`);
      const mostCommentedFilms = sortByStat(cards, `commentsAmount`);
      const lowCommentsFilms = mostCommentedFilms.filter((it) => it.commentsAmount === 0);
      if (lowCommentsFilms === cards.length) {
        mostCommentedFilmsContainer.remove();
        return;
      }
      mostCommentedFilms.slice(0, EXTRA_LIST_AMOUNT_CARDS).forEach((card) => renderCard(card, mostCommentedFilmsContainer));
    };

    const checkDataAmount = () => {
      if (cards.length === 0) {
        this._container.getElement().replaceChild(this._alert.getElement(), this._container.getElement().querySelector(`.films .films-list`));
        return;
      }
      cards.slice(0, startAmountCards).forEach((card) => renderCard(card, filmListContainer));
      renderTopRatedFilms();
      renderMostCommentedFilms();
      render(this._container.getElement().querySelector(`.films .films-list`), this._showMoreButton.getElement(), RenderPosition.BEFOREEND);
    };

    checkDataAmount();

    const onShowMoreFilmsButtonClick = () => {
      let filmsToShow = totalAmountCards - startAmountCards;
      startAmountCards += filmsToShow > 5 ? 5 : filmsToShow;
      filmListContainer.innerHTML = ``;
      cards.slice(0, startAmountCards).forEach((card) => renderCard(card, filmListContainer));
      if (startAmountCards === totalAmountCards) {
        this._showMoreButton.getElement().remove();
        this._showMoreButton.removeElement();
      }
    };

    this._showMoreButton.setClickHandler(onShowMoreFilmsButtonClick);
  }
}
