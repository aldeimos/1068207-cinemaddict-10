import SiteMenuComponent from './components/site-menu.js';
/* import StatisticsComponent from './components/statistics.js'; */
import UserProfileComponent from './components/user-rank.js';
import FilmSectionComponent from './components/films-section.js';
import {generateFilmCards} from './mocks/film-card.js';
import {RenderPosition, render} from './utils.js/render.js';
import PageController from './controllers/page-controller';
import {SortForm} from './components/sort-form.js';

const TOTAL_AMOUNT_CARDS = 15;
const WATCHED_MOVIES = 15;
const cards = generateFilmCards(TOTAL_AMOUNT_CARDS);
const siteHeader = document.querySelector(`.header`);
const siteMainSection = document.querySelector(`.main`);
const footerStatistic = document.querySelector(`.footer__statistics p`);
const sortComponent = new SortForm();
render(siteMainSection, sortComponent.getElement(), RenderPosition.AFTERBEGIN);
render(siteMainSection, new SiteMenuComponent(cards).getElement(), RenderPosition.AFTERBEGIN);
/* render(siteMainSection, createStatisticSectionTemplate(cards)); */
/* const watchedMovies = document.querySelector(`.statistic__item-text_watched-movies`).textContent; */
render(siteHeader, new UserProfileComponent(WATCHED_MOVIES).getElement(), RenderPosition.BEFOREEND);
const filmSectionComponent = new FilmSectionComponent();
render(siteMainSection, filmSectionComponent.getElement(), RenderPosition.BEFOREEND);

const pageController = new PageController(filmSectionComponent, sortComponent); // единтсвенная причина, по которой сорт передается именно здесь - невозможность отрендериться в правильном месте в page-controller
pageController.render(cards, TOTAL_AMOUNT_CARDS);

footerStatistic.textContent = `${cards.length} movies inside`;
