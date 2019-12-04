const checkUserRank = (int) => {
  if (int >= 21) {
    return `Movie Buff`;
  } else if (int <= 20 && int >= 11) {
    return `Fan`;
  }
  return `Novice`; // Тут наверняка как-то красиво можно сделать, но через словарь мне не удалось.
};


const createUserProfileTemplate = (watchedMovies) => {
  return (`
  <section class="header__profile profile">
    <p class="profile__rating">${checkUserRank(parseInt(watchedMovies, 10))}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>
  `);
};

export {
  createUserProfileTemplate
};
