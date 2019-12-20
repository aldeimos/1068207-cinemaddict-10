import AbstractSmartComponent from "./abstract-smart-component";
import CommentsComponent from './comments.js';
import {
  render,
  RenderPosition,
  remove,
} from '../utils.js/render';
import moment from "moment";

const createFilmDetailsTemplate = (filmDetail) => {
  const {
    title,
    description,
    poster,
    genre,
    fullDuration,
    releaseDate,
    rating,
    subtitle,
    country,
    directors,
    writers,
    actors,
    ageRestriction,
    comments,
    toWatch,
    isWatched,
    isFavorite,
  } = filmDetail;
  /* const isWatchedChecked = isWatched ? (``) : ``; */
  return (
    `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${poster}" alt="">

            <p class="film-details__age">${ageRestriction}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${subtitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${directors}</td>
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
                <td class="film-details__cell">${fullDuration}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${genre.length === 1 ? `Genre` : `Genres`}</td>
                <td class="film-details__cell">
                  <span class="film-details__genre">
                  ${genre.length > 3 ? genre.slice(0, 3).join(`  `) : genre.join(`  `)}
                  </span>
                  </td>
              </tr>
            </table>

            <p class="film-details__film-description">
              ${description.slice(0, 139)}…
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${toWatch ? `checked` : ``}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? `checked` : ``}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
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
              <img src="./images/posters/the-great-flamarion.jpg" alt="film-poster" class="film-details__user-rating-img">
            </div>

            <section class="film-details__user-rating-inner">
              <h3 class="film-details__user-rating-title">The Great Flamarion</h3>

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

                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="9" id="rating-9" checked>
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
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smiling">
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

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="anrgy">
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
    this._comments = card.comments;

  }
  getTemplate() {
    return createFilmDetailsTemplate(this._card);
  }
  setButtonCloseClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  renderComments() {
    this._comments.forEach((comment) => render(this._commentsContainer, new CommentsComponent(comment).getElement(), RenderPosition.BEFOREEND));
  }

  _subscribeOnEvents() {
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, () => {
      this._card.toWatch = !this._card.toWatch;
    });
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, () => {
      this._card.isWatched = !this._card.isWatched;
      this.showRatingBlock();
    });
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, () => {});
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
      remove(this);
    });
    this._commentsContainer = this.getElement().querySelector(`.film-details__comments-list`);
    this.renderComments();
    this.setEmojiClickHandler();
  }
  setEmojiClickHandler() {
    const emojiContainer = this.getElement().querySelector(`.film-details__add-emoji-label img`);
    const Emojies = {
      'smiling': `./images/emoji/smile.png`,
      'sleeping': `./images/emoji/sleeping.png`,
      'puke': `./images/emoji/puke.png`,
      'anrgy': `./images/emoji/angry.png`,
    };
    [...this.getElement().querySelectorAll(`.film-details__emoji-item`)].forEach((button) => {
      button.addEventListener(`click`, () => {
        emojiContainer.src = `${Emojies[button.value]}`;
        emojiContainer.style.width = `100%`;
      });
    });
    this.showRatingBlock();
    this.setSubmitFormHandler();
  }
  showRatingBlock() {
    const ratingBlock = this.getElement().querySelector(`.form-details__middle-container`);
    if (this._card.isWatched) {
      ratingBlock.style.display = `block`;
    } else {
      ratingBlock.style.display = `none`;
    }
  }
  setSubmitFormHandler() {
    this.getElement().querySelector(`.film-details__inner`).addEventListener(`keyup`, (evt) => {
      const mememe = (evt.key === `Enter` && evt.ctrlKey); // c metaKey не работает, тестил с мака пхах
      if (mememe) {
        const newComment = {
          name: `You`,
          text: this.getElement().querySelector(`textarea`).value,
          date: moment().startOf().fromNow(),
          emoji: `./${this.getElement().querySelector(`.film-details__new-comment-image`).src.slice(22)}`,
        };
        this._card.comments.push(newComment);
        render(this.getElement().querySelector(`.film-details__comments-list`), new CommentsComponent(this._card.comments[this._card.comments.length - 1]).getElement(), RenderPosition.BEFOREEND);
        this.clearForm();
      }
    });
  }
  clearForm() {
    this.getElement().querySelector(`textarea`).value = null;
    this.getElement().querySelector(`.film-details__new-comment-image`).src = ``;
  }
}
