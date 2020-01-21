import Movie from '../models/movie.js';

const getSyncedFilms =
  (items) => items.filter(({
    success
  }) => success).map(({
    payload
  }) => payload.task);

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
    this._isSynchronized = true;
  }

  getFilms() {
    if (this._isOnLine()) {
      return this._api.getFilms().then(
          (films) => {
            films.forEach((film) => this._store.setItem(film.id, film.toRAW()));
            return films;
          }
      );
    }

    const storeFilms = Object.values(this._store.getAll());

    this._isSynchronized = false;

    return Promise.resolve(Movie.parseTasks(storeFilms));
  }

  createComment(commentId, comment) {
    if (this._isOnLine()) {
      return this._api.createTask(commentId, comment).then(
          (newComment) => {
            this._store.setItem(newComment.id, newComment.toRAW());
            return newComment;
          }
      );
    }
    return Promise.resolve();
  }

  updateFilm(id, film) {
    if (this._isOnLine()) {
      return this._api.updateTask(id, film).then(
          (newFilm) => {
            this._store.setItem(newFilm.id, newFilm.toRAW());
            return newFilm;
          }
      );
    }

    const fakeUpdatedTask = Movie.parseTask(Object.assign({}, Movie.toRAW(), {
      id
    }));

    this._isSynchronized = false;
    this._store.setItem(id, Object.assign({}, fakeUpdatedTask.toRAW(), {
      offline: true
    }));

    return Promise.resolve(fakeUpdatedTask);
  }

  deleteComment(id) {
    if (this._isOnLine()) {
      return this._api.deleteComment(id).then(
          () => {
            this._store.removeItem(id);
          }
      );
    }

    this._isSynchronized = false;
    this._store.removeItem(id);

    return Promise.resolve();
  }

  sync() {
    if (this._isOnLine()) {
      const storeFilms = Object.values(this._store.getAll());

      return this._api.sync(storeFilms)
        .then((response) => {
          // Удаляем из хранилища задачи, что были созданы
          // или изменены в оффлайне. Они нам больше не нужны
          storeFilms.filter((task) => task.offline).forEach((task) => {
            this._store.removeItem(task.id);
          });

          const updatedFilms = getSyncedFilms(response.updated);

          // Добавляем синхронизированные задачи в хранилище.
          // Хранилище должно быть актуальным в любой момент,
          // вдруг сеть пропадёт
          [...updatedFilms].forEach((task) => {
            this._store.setItem(task.id, task);
          });

          // Помечаем, что всё синхронизировано
          this._isSynchronized = true;

          return Promise.resolve();
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  getSynchronize() {
    return this._isSynchronized;
  }

  _isOnLine() {
    return window.navigator.onLine;
  }
}
