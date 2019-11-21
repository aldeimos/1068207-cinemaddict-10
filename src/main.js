import {createSiteMenuTemplate} from './components/site-menu.js';
import {createUserProfileTemplate} from './components/user-rank.js';
import {createStatisticSectionTemplate} from './components/statistics.js';
import {createSortFormTemplate} from './components/sort-form.js';
import {createFilmsSectionTemplate} from './components/films-section.js';
import {createFilmCardTemplate} from './components/film-card.js';
import {createShowMoreButtonTemplate} from './components/shom-more-button.js';
import {createFilmExtraListTemlate} from './components/films-sub-section.js';
import {createFilmDetailsTemplate} from './components/film-details';


const TOTAL_AMOUNT_CARDS = 5;
const EXTRA_LIST_AMOUNT_CARDS = 2;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeader = document.querySelector(`.header`);
const siteMainSection = document.querySelector(`.main`);

render(siteHeader, createUserProfileTemplate());

render(siteMainSection, createSiteMenuTemplate());

render(siteMainSection, createStatisticSectionTemplate());

render(siteMainSection, createSortFormTemplate());

render(siteMainSection, createFilmsSectionTemplate());

const filmListContainer = document.querySelector(`.films .films-list__container`);

const repeat = (cardsAmount, fn) => {
  Array(cardsAmount).fill(``).forEach(fn);
};

repeat(TOTAL_AMOUNT_CARDS, () => {
  render(filmListContainer, createFilmCardTemplate());
});

const filmList = document.querySelector(`.films .films-list`);

render(filmList, createShowMoreButtonTemplate());
render(filmList, createFilmExtraListTemlate(`Most Commented`), `afterend`);
render(filmList, createFilmExtraListTemlate(`Top Rated`), `afterend`);


const extraFilmLists = document.querySelectorAll(`.films-list--extra .films-list__container`);

for (const item of extraFilmLists) {
  repeat(EXTRA_LIST_AMOUNT_CARDS, () => {
    render(item, createFilmCardTemplate());
  });
}

render(siteMainSection, createFilmDetailsTemplate());
