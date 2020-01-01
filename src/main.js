import StatisticsComponent from './components/statistics.js';
import UserProfileComponent from './components/user-rank.js';
import FilmSectionComponent from './components/films-section.js';
import {generateFilmCards} from './mocks/film-card.js';
import {RenderPosition, render} from './utils/render.js';
import {FilterTypeStatistic} from './const.js';
import PageController from './controllers/page-controller';
import FilterController from './controllers/filter-controller.js';
import MoviesModel from './models/movies.js';
import {SortForm} from './components/sort-form.js';

const TOTAL_AMOUNT_CARDS = 15;
const WATCHED_MOVIES = 15;
const cards = generateFilmCards(TOTAL_AMOUNT_CARDS);
const moviesModel = new MoviesModel();
moviesModel.setFilms(cards);
const siteHeader = document.querySelector(`.header`);
const siteMainSection = document.querySelector(`.main`);
const footerStatistic = document.querySelector(`.footer__statistics p`);
const sortComponent = new SortForm();
const statisticsComponent = new StatisticsComponent(cards, FilterTypeStatistic.ALL);
render(siteMainSection, sortComponent.getElement(), RenderPosition.AFTERBEGIN);
render(siteMainSection, statisticsComponent.getElement(), RenderPosition.AFTERBEGIN);
render(siteHeader, new UserProfileComponent(WATCHED_MOVIES).getElement(), RenderPosition.BEFOREEND);
const filmSectionComponent = new FilmSectionComponent();
render(siteMainSection, filmSectionComponent.getElement(), RenderPosition.BEFOREEND);

const filterComponent = new FilterController(siteMainSection, moviesModel);
filterComponent.render();
const pageController = new PageController(filmSectionComponent, sortComponent, moviesModel, filterComponent, statisticsComponent);
pageController.render();

footerStatistic.textContent = `${cards.length} movies inside`;
