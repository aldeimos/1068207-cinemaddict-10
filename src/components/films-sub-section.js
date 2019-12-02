const createFilmExtraListTemplate = (title, addClass) => {
  return (`
  <section class="films-list--extra ${addClass}">
    <h2 class="films-list__title">${title}</h2>

    <div class="films-list__container"></div>
  </section
  `);
};

export {
  createFilmExtraListTemplate
};
