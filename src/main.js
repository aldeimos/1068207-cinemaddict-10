import StatisticsComponent from './components/statistics.js';
import UserProfileComponent from './components/user-rank.js';
import FilmSectionComponent from './components/films-section.js';
import {
  RenderPosition,
  render
} from './utils/render.js';
import {
  FilterTypeStatistic
} from './const.js';
import PageController from './controllers/page-controller';
import FilterController from './controllers/filter-controller.js';
import MoviesModel from './models/movies.js';

import {
  SortForm
} from './components/sort-form.js';

import Store from './api/store.js';
import Provider from './api/provider.js';
import API from './api/api.js';

const STORE_PREFIX = `taskmanager-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict`;
const AUTORIZATION = `Basic ${String(new Date())}`;

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`./sw.js`)
    .then(() => {
      // Действие, в случае успешной регистрации ServiceWorker
    }).catch(() => {
      // Действие, в случае ошибки при регистрации ServiceWorker
    });
});
const api = new API(END_POINT, AUTORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const moviesModel = new MoviesModel();
const siteHeader = document.querySelector(`.header`);
const siteMainSection = document.querySelector(`.main`);
const footerStatistic = document.querySelector(`.footer__statistics p`);
const sortComponent = new SortForm();
const filmSectionComponent = new FilmSectionComponent();
render(siteMainSection, filmSectionComponent.getElement(), RenderPosition.BEFOREEND);
render(siteMainSection, sortComponent.getElement(), RenderPosition.AFTERBEGIN);
const filterComponent = new FilterController(siteMainSection, moviesModel);

apiWithProvider.getFilms()
  .then((films) => {
    moviesModel.setFilms(films);
    filterComponent.render();
    const statisticsComponent = new StatisticsComponent(moviesModel.getFilms(), FilterTypeStatistic.ALL);
    render(siteHeader, new UserProfileComponent(moviesModel.getAllFilms().length).getElement(), RenderPosition.BEFOREEND);
    const pageController = new PageController(filmSectionComponent, sortComponent, moviesModel, filterComponent, statisticsComponent, apiWithProvider);
    render(siteMainSection, statisticsComponent.getElement(), RenderPosition.BEFOREEND);
    const arrayOfPromises = films.map((film) => apiWithProvider.getComments(film[`id`]).then((comments) => comments));
    Promise.all(arrayOfPromises).then((comments) => {
      moviesModel.setComments(comments);
      pageController.render();
      footerStatistic.textContent = `${moviesModel.getAllFilms().length} movies inside`;
    });
  });
