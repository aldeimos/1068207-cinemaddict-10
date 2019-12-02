import {
  createSiteMenuTemplate
} from './components/site-menu.js';
import {
  createStatisticSectionTemplate
} from './components/statistics.js';
import {
  createUserProfileTemplate
} from './components/user-rank.js';
import {
  createSortFormTemplate
} from './components/sort-form.js';
import {
  createFilmsSectionTemplate
} from './components/films-section.js';
import {
  createFilmCardTemplate
} from './components/film-card.js';
import {
  createShowMoreButtonTemplate
} from './components/shom-more-button.js';
import {
  createFilmExtraListTemplate
} from './components/films-sub-section.js';
import {
  createFilmDetailsTemplate
} from './components/film-details';
import {
  generateFilmCards
} from './mocks/film-card.js';

import {
  generateFilmDetails
} from './mocks/film-details.js';


const TOTAL_AMOUNT_CARDS = 15;
const EXTRA_LIST_AMOUNT_CARDS = 2;

const cards = generateFilmCards(TOTAL_AMOUNT_CARDS);
const detailedCard = generateFilmDetails();

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeader = document.querySelector(`.header`);
const siteMainSection = document.querySelector(`.main`);


render(siteMainSection, createSiteMenuTemplate());

render(siteMainSection, createStatisticSectionTemplate());

const watchedMovies = document.querySelector(`.statistic__item-text_watched-movies`).textContent;

render(siteHeader, createUserProfileTemplate(watchedMovies));

render(siteMainSection, createSortFormTemplate());

render(siteMainSection, createFilmsSectionTemplate());

const filmListContainer = document.querySelector(`.films .films-list__container`);

let startAmountCards = 5;
cards.slice(0, startAmountCards).forEach((card) => render(filmListContainer, createFilmCardTemplate(card), `beforeend`));

const filmList = document.querySelector(`.films .films-list`);

render(filmList, createShowMoreButtonTemplate());
render(filmList, createFilmExtraListTemplate(`Most Commented`, `films-list--extra-commented`), `afterend`);
render(filmList, createFilmExtraListTemplate(`Top Rated`, `films-list--extra-rated`), `afterend`);

const sortByStat = (films, prop) => {
  const copiedCards = films;
  return copiedCards.sort((a, b) => b[prop] > a[prop] ? 1 : -1);
};

const topRatedFilmsContainer = document.querySelector(`.films-list--extra-rated .films-list__container`);
const mostCommentedFilmsContainer = document.querySelector(`.films-list--extra-commented .films-list__container`);

const renderTopRatedFilms = () => {
  const topRatedFilms = sortByStat(cards, `rating`);
  const isZero = topRatedFilms.every((it) => (parseInt(it.rating, 10)) === 0);
  if (isZero) {
    topRatedFilmsContainer.remove();
    return;
  }
  topRatedFilms.slice(0, EXTRA_LIST_AMOUNT_CARDS).forEach((card) => render(topRatedFilmsContainer, createFilmCardTemplate(card)));
};

const renderMostCommentedFilms = () => {
  const mostCommentedFilms = sortByStat(cards, `comments`);
  const isZero = mostCommentedFilms.every((it) => (parseInt(it.comments, 10) === 0));
  if (isZero) {
    mostCommentedFilmsContainer.remove();
    return;
  }
  mostCommentedFilms.slice(0, EXTRA_LIST_AMOUNT_CARDS).forEach((card) => render(mostCommentedFilmsContainer, createFilmCardTemplate(card)));
};

renderTopRatedFilms();
renderMostCommentedFilms();

render(siteMainSection, createFilmDetailsTemplate(detailedCard));


const showMoreButton = document.querySelector(`.films-list__show-more`);

const onClickShowMoreFilmsButton = () => {
  let filmsToShow = TOTAL_AMOUNT_CARDS - startAmountCards;
  startAmountCards += filmsToShow > 5 ? 5 : filmsToShow;
  filmListContainer.innerHTML = ``;
  cards.slice(0, startAmountCards).forEach((card) => render(filmListContainer, createFilmCardTemplate(card)));
  if (startAmountCards === TOTAL_AMOUNT_CARDS) {
    showMoreButton.style.display = `none`;
  }
}

showMoreButton.addEventListener(`click`, onClickShowMoreFilmsButton);

const footerStatistic = document.querySelector(`.footer__statistics p`);
footerStatistic.textContent = `${cards.length} movies inside`;
