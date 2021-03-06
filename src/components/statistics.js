import AbstractComponent from '../components/abstract-component.js';
import {
  getFilmsByFilterStatistic
} from '../utils/filter.js';
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  convertRuntime,
  checkUserRank
} from '../const.js';

const genreCounter = (cards, prop) => {
  let counter = 0;
  cards.forEach((card) => {
    const isContains = card.genre.some((genre) => genre === prop);
    if (isContains) {
      counter += 1;
    }
    if (card.genre[0] === prop && prop === undefined) {
      counter += 1;
    }
  });
  return counter;
};

const countGenres = (cards) => {
  const genres = {
    Action: genreCounter(cards, `Action`),
    Animation: genreCounter(cards, `Animation`),
    Family: genreCounter(cards, `Family`),
    Thriller: genreCounter(cards, `Thriller`),
    SciFi: genreCounter(cards, `Sci-Fi`),
    Horror: genreCounter(cards, `Horror`),
    Adventure: genreCounter(cards, `Adventure`),
    NoGenre: genreCounter(cards, undefined),
    Comedy: genreCounter(cards, `Comedy`),
    Drama: genreCounter(cards, `Drama`),
  };
  return genres;
};


const createStatisticSectionTemplate = (cards, userRankCount, genres) => {
  const totalFilms = cards.length;
  let amountTime = 0;

  cards.forEach((card) => {
    amountTime += card.runtime;
  });
  const convertedRuntime = convertRuntime(amountTime);

  const getMostPopularGenre = (genresList) => {
    const sortedGenres = Object.entries(genresList).sort((a, b) => b[1] - a[1]);
    return sortedGenres[0];
  };

  const mostPopularGenre = getMostPopularGenre(genres);

  return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${checkUserRank(userRankCount.length)}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all">
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text statistic__item-text_watched-movies">${totalFilms} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${convertedRuntime}</p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${cards.length === 0 ? `—` : mostPopularGenre[0]}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>
  </section>`;
};

export default class Statistics extends AbstractComponent {
  constructor(cards, activeRadioButton) {
    super();
    this._cards = cards;
    this._activeStatisticFilterType = null;
    this.setFilterType(activeRadioButton);
    this._watchedFilms = getFilmsByFilterStatistic(this._cards, this._activeStatisticFilterType);
    this._userRankCount = getFilmsByFilterStatistic(this._cards, `all`);
    this._genres = countGenres(this._watchedFilms);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.hide();
    this.renderChart();
  }
  getTemplate() {
    return createStatisticSectionTemplate(this._watchedFilms, this._userRankCount, this._genres);
  }
  renderChart() {
    if (this._watchedFilms.length !== 0) {
      const ctx = this.getElement().querySelector(`.statistic__chart`).getContext(`2d`);
      return new Chart(ctx, {
        type: `bar`,
        plugins: [ChartDataLabels],
        data: {
          labels: [`Action`, `Animation`, `Family`, `Thriller`, `Sci-Fi`, `Horror`, `Adventure`, `No Genre`, `Comedy`, `Drama`],
          datasets: [{
            label: `Favorite Genre`,
            data: [this._genres[`Action`], this._genres[`Animation`], this._genres[`Family`], this._genres[`Thriller`], this._genres[`SciFi`], this._genres[`Horror`], this._genres[`Adventure`], this._genres[`NoGenre`], this._genres[`Comedy`], this._genres[`Drama`]],
            backgroundColor: [
              `rgba(255, 99, 132, 0.2)`,
              `rgba(54, 162, 235, 0.2)`,
              `rgba(255, 206, 86, 0.2)`,
              `rgba(255, 255, 86, 0.2)`,
              `rgba(44, 155, 50, 0.2)`,
              `rgba(0, 217, 255, 0.2)`,
              `rgba(106, 0, 255, 0.2)`,
              `rgba(225, 0, 255, 0.2)`,
              `rgba(255, 0, 0, 0.2)`,
              `rgba(255, 155, 23, 0.2)`
            ],
            borderColor: [
              `rgba(255, 99, 132, 1)`,
              `rgba(54, 162, 235, 1)`,
              `rgba(255, 206, 86, 1)`,
              `rgba(255, 255, 86, 1)`,
              `rgba(44, 155, 86, 1)`,
              `rgba(0, 217, 255, 1)`,
              `rgba(106, 0, 255, 1)`,
              `rgba(225, 0, 255, 1)`,
              `rgba(255, 0, 0, 1)`,
              `rgba(255, 155, 23, 1)`,
            ],
            borderWidth: 2,
          }]
        },
        options: {
          legend: {
            display: false,
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
          plugins: {
            datalabels: {
              color: `white`,
              labels: {
                title: {
                  font: {
                    size: `25`
                  }
                }
              }
            }
          }
        }
      });
    }
    return 0;
  }
  setFilterType(filterType) {
    this._activeStatisticFilterType = filterType;
  }
  setActiveFilter() {
    [...this.getElement().querySelectorAll(`.statistic__filters-input`)].forEach((button) => {
      if (button.value === this._activeStatisticFilterType) {
        button.checked = `true`;
      }
    });
  }
}
