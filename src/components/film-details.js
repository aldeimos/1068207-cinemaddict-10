import AbstractSmartComponent from "./abstract-smart-component";
import CommentsComponent from './comments.js';
import {
  convertRuntime,
  convertReleaseDate
} from '../const.js';

import {
  render,
  RenderPosition,
} from '../utils/render';

const NUMBER_OF_GENRES = 3;
const DESCRIPTION_CHARACTERS = 139;

const createFilmDetailsTemplate = (filmDetail) => {
  const {
    title,
    description,
    poster,
    genre,
    runtime,
    date,
    totalRating,
    alternativeTitle,
    country,
    director,
    writers,
    actors,
    ageRating,
    comments,
    watchList,
    alreadyWatched,
    favorite,
  } = filmDetail;

  const releaseDate = convertReleaseDate(date);
  const convertedRuntime = convertRuntime(runtime);
  return (
    `<section class="film-details" tabindex="0" style="outline: none">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${poster}" alt="">

            <p class="film-details__age">${ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${alternativeTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${totalRating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${releaseDate}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${convertedRuntime}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${genre.length === 1 ? `Genre` : `Genres`}</td>
                <td class="film-details__cell">
                  <span class="film-details__genre">
                  ${genre.length > NUMBER_OF_GENRES ? genre.slice(0, NUMBER_OF_GENRES).join(`  `) : genre.join(`  `)}
                  </span>
                  </td>
              </tr>
            </table>

            <p class="film-details__film-description">
              ${description.slice(0, DESCRIPTION_CHARACTERS)}…
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${watchList ? `checked` : ``}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${alreadyWatched ? `checked` : ``}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${favorite ? `checked` : ``}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>
      <div class="form-details__middle-container">
        <section class="film-details__user-rating-wrap">
          <div class="film-details__user-rating-controls">
            <button class="film-details__watched-reset" type="button">Undo</button>
          </div>

          <div class="film-details__user-score">
            <div class="film-details__user-rating-poster">
              <img src="${poster}" alt="film-poster" class="film-details__user-rating-img">
            </div>

            <section class="film-details__user-rating-inner">
              <h3 class="film-details__user-rating-title">${title}</h3>

              <p class="film-details__user-rating-feelings">How you feel it?</p>

              <div class="film-details__user-rating-score">
                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="1" id="rating-1">
                <label class="film-details__user-rating-label" for="rating-1">1</label>

                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="2" id="rating-2">
                <label class="film-details__user-rating-label" for="rating-2">2</label>

                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="3" id="rating-3">
                <label class="film-details__user-rating-label" for="rating-3">3</label>

                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="4" id="rating-4">
                <label class="film-details__user-rating-label" for="rating-4">4</label>

                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="5" id="rating-5">
                <label class="film-details__user-rating-label" for="rating-5">5</label>

                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="6" id="rating-6">
                <label class="film-details__user-rating-label" for="rating-6">6</label>

                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="7" id="rating-7">
                <label class="film-details__user-rating-label" for="rating-7">7</label>

                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="8" id="rating-8">
                <label class="film-details__user-rating-label" for="rating-8">8</label>

                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="9" id="rating-9">
                <label class="film-details__user-rating-label" for="rating-9">9</label>

              </div>
            </section>
          </div>
        </section>
      </div>
      <div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

          <ul class="film-details__comments-list">

          </ul>

          <div class="film-details__new-comment">
            <div for="add-emoji" class="film-details__add-emoji-label">
              <img class="film-details__new-comment-image" src="">
            </div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" minlength="15"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="puke">
              <label class="film-details__emoji-label" for="emoji-gpuke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`
  );
};

export default class FilmDetails extends AbstractSmartComponent {
  constructor(card) {
    super();
    this._card = card;
  }
  getTemplate() {
    return createFilmDetailsTemplate(this._card);
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  renderComments() {
    this._commentsContainer = this.getElement().querySelector(`.film-details__comments-list`);
    this._commentsContainer.innerHTML = ``;
    this._card.commentsList.forEach((comment) => {
      render(this._commentsContainer, new CommentsComponent(comment).getElement(), RenderPosition.BEFOREEND);
    });
  }

  _subscribeOnEvents() {
    this.setEmojiClickHandler();
  }
  setEmojiClickHandler() {
    const emojiContainer = this.getElement().querySelector(`.film-details__add-emoji-label img`);
    [...this.getElement().querySelectorAll(`.film-details__emoji-item`)].forEach((button) => {
      button.addEventListener(`click`, () => {
        emojiContainer.src = `./images/emoji/${button.value}.png`;
        emojiContainer.style.width = `100%`;
      });
    });
  }
  showRatingBlock() {
    const ratingBlock = this.getElement().querySelector(`.form-details__middle-container`);
    if (this._card.alreadyWatched) {
      ratingBlock.style.display = `block`;
    } else {
      ratingBlock.style.display = `none`;
    }
  }
  clearForm() {
    this.getElement().querySelector(`textarea`).value = null;
    this.getElement().querySelector(`.film-details__new-comment-image`).src = ``;
  }
  rerenderCommentsBlockTitle() {
    this.getElement().querySelector(`.film-details__comments-title`).innerHTML = `Comments <span class="film-details__comments-count">${this._card.commentsList.length}</span>`;
  }
  updateCommentsArray(comments) {
    this._card.commentsList = comments;
  }
  setRatingValue() {
    [...this.getElement().querySelectorAll(`.film-details__user-rating-input`)].forEach((button) => {
      if (parseInt(button.value, 10) === this._card.personalRating) {
        button.checked = true;
      }
    });
  }
  getCard() {
    return this._card;
  }
}
