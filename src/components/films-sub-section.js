const createFilmExtraListTemplate = (title, className) => {
  return (`
  <section class="films-list--extra ${className}">
    <h2 class="films-list__title">${title}</h2>

    <div class="films-list__container"></div>
  </section
  `);
};

export {
  createFilmExtraListTemplate
};
