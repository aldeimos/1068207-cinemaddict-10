import SiteMenuComponent from './components/site-menu.js';
import StatisticsComponent from './components/statistics.js';
import UserProfileComponent from './components/user-rank.js';
import SortFormComponent from './components/sort-form.js';
import FilmSectionComponent from './components/films-section.js';
import FilmCardComponent from './components/film-card.js';
import ShowMoreButtonComponent from './components/shom-more-button.js';
import ExtraFilmSectionComponent from './components/films-sub-section.js';
import FilmCardDetailsComponent from './components/film-details';
import CommentsComponent from './components/comments.js';
import {
  generateFilmCards
} from './mocks/film-card.js';
import {
  RenderPosition,
  render,
} from './utils.js';


const TOTAL_AMOUNT_CARDS = 15;
const EXTRA_LIST_AMOUNT_CARDS = 2;
const WATCHED_MOVIES = 15;
const cards = generateFilmCards(TOTAL_AMOUNT_CARDS);
const siteHeader = document.querySelector(`.header`);
const siteMainSection = document.querySelector(`.main`);
let startAmountCards = 5;


render(siteMainSection, new SortFormComponent().getElement(), RenderPosition.AFTERBEGIN);
render(siteMainSection, new SiteMenuComponent(cards).getElement(), RenderPosition.AFTERBEGIN);
/* render(siteMainSection, createStatisticSectionTemplate(cards)); */
/* const watchedMovies = document.querySelector(`.statistic__item-text_watched-movies`).textContent; */
render(siteHeader, new UserProfileComponent(WATCHED_MOVIES).getElement(), RenderPosition.BEFOREEND);
render(siteMainSection, new FilmSectionComponent().getElement(), RenderPosition.BEFOREEND);
const filmListContainer = document.querySelector(`.films .films-list__container`);
const filmsSection = siteMainSection.querySelector(`.films`);
const filmList = document.querySelector(`.films .films-list`);
render(filmList, new ShowMoreButtonComponent().getElement(), RenderPosition.BEFOREEND);
render(filmsSection, new ExtraFilmSectionComponent(`Top Rated`, `films-list--extra-rated`).getElement(), RenderPosition.BEFOREEND);
render(filmsSection, new ExtraFilmSectionComponent(`Most Commented`, `films-list--extra-commented`).getElement(), RenderPosition.BEFOREEND);
const topRatedFilmsContainer = document.querySelector(`.films-list--extra-rated .films-list__container`);
const mostCommentedFilmsContainer = document.querySelector(`.films-list--extra-commented .films-list__container`);

const sortByStat = (films, prop) => {
  const [...copiedCards] = films;
  return copiedCards.sort((a, b) => b[prop] - a[prop]);
};

const renderCard = (card, container = filmListContainer) => {
  const filmCard = new FilmCardComponent(card);
  const filmCardDetails = new FilmCardDetailsComponent(card);

  const filmPoster = filmCard.getElement().querySelector(`.film-card__poster`);
  const filmTitle = filmCard.getElement().querySelector(`.film-card__title`);
  const filmComments = filmCard.getElement().querySelector(`.film-card__comments`);
  const selectors = [filmPoster, filmTitle, filmComments];

  const closeDetailsCardButton = filmCardDetails.getElement().querySelector(`.film-details__close-btn`);
  const commentSectionDetailsCard = filmCardDetails.getElement().querySelector(`.film-details__comments-list`);
  const comments = filmCard._card.comments;

  const onFilmInnerClick = () => {
    render(siteMainSection, filmCardDetails.getElement(), RenderPosition.BEFOREEND);
    comments.forEach((comment) => render(commentSectionDetailsCard, new CommentsComponent(comment).getElement(), RenderPosition.BEFOREEND));
  };

  const onCloseButtonClick = () => {
    filmCardDetails.getElement().remove();
    filmCardDetails.removeElement();
  };

  selectors.forEach((selector) => {
    selector.addEventListener(`click`, onFilmInnerClick);
  });

  closeDetailsCardButton.addEventListener(`click`, onCloseButtonClick);

  render(container, filmCard.getElement(), RenderPosition.BEFOREEND);
};

cards.slice(0, startAmountCards).forEach((card) => renderCard(card, filmListContainer));

const renderTopRatedFilms = () => {
  const topRatedFilms = sortByStat(cards, `rating`);
  const lowRatingFilms = topRatedFilms.filter((it) => (parseInt(it.rating, 10)) === 0);
  if (lowRatingFilms === cards.length) {
    topRatedFilmsContainer.remove();
    return;
  }
  topRatedFilms.slice(0, EXTRA_LIST_AMOUNT_CARDS).forEach((card) => renderCard(card, topRatedFilmsContainer));
};

renderTopRatedFilms();

const renderMostCommentedFilms = () => {
  const mostCommentedFilms = sortByStat(cards, `commentsAmount`);
  const lowCommentsFilms = mostCommentedFilms.filter((it) => it.commentsAmount === 0);
  if (lowCommentsFilms === cards.length) {
    mostCommentedFilmsContainer.remove();
    return;
  }
  mostCommentedFilms.slice(0, EXTRA_LIST_AMOUNT_CARDS).forEach((card) => renderCard(card, mostCommentedFilmsContainer));
};

renderMostCommentedFilms();

const showMoreButton = document.querySelector(`.films-list__show-more`);

const onShowMoreFilmsButtonClick = () => {
  let filmsToShow = TOTAL_AMOUNT_CARDS - startAmountCards;
  startAmountCards += filmsToShow > 5 ? 5 : filmsToShow;
  filmListContainer.innerHTML = ``;
  cards.slice(0, startAmountCards).forEach((card) => renderCard(card));
  if (startAmountCards === TOTAL_AMOUNT_CARDS) {
    showMoreButton.style.display = `none`;
  }
};

showMoreButton.addEventListener(`click`, onShowMoreFilmsButtonClick);
const footerStatistic = document.querySelector(`.footer__statistics p`);
footerStatistic.textContent = `${cards.length} movies inside`;
