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
import {generateFilmCards} from './mocks/film-card.js';
import {RenderPosition, render} from './utils.js';


const TOTAL_AMOUNT_CARDS = 15;
const EXTRA_LIST_AMOUNT_CARDS = 2;
const WATCHED_MOVIES = 15;
const cards = generateFilmCards(TOTAL_AMOUNT_CARDS);
const detailedCard = cards[0];
const siteHeader = document.querySelector(`.header`);
const siteMainSection = document.querySelector(`.main`);
let startAmountCards = 5;



render(siteMainSection, new SiteMenuComponent(cards).getElement(), RenderPosition.BEFOREEND);
/* render(siteMainSection, createStatisticSectionTemplate(cards)); */
/* const watchedMovies = document.querySelector(`.statistic__item-text_watched-movies`).textContent; */
render(siteHeader, new UserProfileComponent(WATCHED_MOVIES).getElement(), RenderPosition.BEFOREEND);
render(siteMainSection, new FilmSectionComponent().getElement(), RenderPosition.BEFOREEND);
const filmListContainer = document.querySelector(`.films .films-list__container`);
cards.slice(0, startAmountCards).forEach((card) => render(filmListContainer, new FilmCardComponent(card).getElement(), RenderPosition.BEFOREEND));
render(siteMainSection, new FilmCardDetailsComponent(cards[0]).getElement(), RenderPosition.BEFOREEND);
const commentsList = siteMainSection.querySelector(`.film-details__comments-list`);
const commentsListItems = detailedCard.comments;
commentsListItems.forEach((comment) => render(commentsList, new CommentsComponent(comment).getElement(), RenderPosition.BEFOREEND));

const filmList = document.querySelector(`.films .films-list`);
render(filmList, new ShowMoreButtonComponent().getElement(), RenderPosition.BEFOREEND);
render(filmList, new ExtraFilmSectionComponent(`Most Commented`, `films-list--extra-commented`).getElement(), RenderPosition.AFTERBEGIN);
/* render(siteMainSection, new SortFormComponent().getElement(), RenderPosition.BEFOREEND);
render(filmList, new ExtraFilmSectionComponent(`Top Rated`, `films-list--extra-rated`), RenderPosition.AFTERBEGIN);
const topRatedFilmsContainer = document.querySelector(`.films-list--extra-rated .films-list__container`);
const mostCommentedFilmsContainer = document.querySelector(`.films-list--extra-commented .films-list__container`);
console.log(topRatedFilmsContainer, mostCommentedFilmsContainer);
const sortByStat = (films, prop) => {
  const [...copiedCards] = films;
  return copiedCards.sort((a, b) => b[prop] - a[prop]);
};
console.log(cards); */
/* const renderTopRatedFilms = () => {
  const topRatedFilms = sortByStat(cards, `rating`);
  const lowRatingFilms = topRatedFilms.filter((it) => (parseInt(it.rating, 10)) === 0);
  if (lowRatingFilms === cards.length) {
    topRatedFilmsContainer.remove();
    return;
  }
  topRatedFilms.slice(0, EXTRA_LIST_AMOUNT_CARDS).forEach((card) => render(topRatedFilmsContainer, new FilmCardComponent(card).getElement(), RenderPosition.BEFOREEND));
}; */

/* renderTopRatedFilms(); */

/* const renderMostCommentedFilms = () => {
  const mostCommentedFilms = sortByStat(cards, `commentsAmount`);
  const lowCommentsFilms = mostCommentedFilms.filter((it) => it.commentsAmount === 0);
  if (lowCommentsFilms === cards.length) {
    mostCommentedFilmsContainer.remove();
    return;
  }
  mostCommentedFilms.slice(0, EXTRA_LIST_AMOUNT_CARDS).forEach((card) => render(mostCommentedFilmsContainer, new FilmCardComponent(card).getElement(), RenderPosition.BEFOREEND));
};

renderMostCommentedFilms();

const showMoreButton = document.querySelector(`.films-list__show-more`);

const onClickShowMoreFilmsButton = () => {
  let filmsToShow = TOTAL_AMOUNT_CARDS - startAmountCards;
  startAmountCards += filmsToShow > 5 ? 5 : filmsToShow;
  filmListContainer.innerHTML = ``;
  cards.slice(0, startAmountCards).forEach((card) => render(filmListContainer, new FilmCardComponent(card), RenderPosition.BEFOREEND));
  if (startAmountCards === TOTAL_AMOUNT_CARDS) {
    showMoreButton.style.display = `none`;
  }
};

showMoreButton.addEventListener(`click`, onClickShowMoreFilmsButton);
const footerStatistic = document.querySelector(`.footer__statistics p`);
footerStatistic.textContent = `${cards.length} movies inside`; */
