export default class Movie {
  constructor(data) {
    this.id = data[`id`];
    this.comments = data[`comments`];
    this.commentsList = null;
    this.filmInfo = data[`film_info`];
    this.title = this.filmInfo[`title`];
    this.alternativeTitle = this.filmInfo[`alternative_title`];
    this.totalRating = this.filmInfo[`total_rating`];
    this.poster = this.filmInfo[`poster`];
    this.ageRating = this.filmInfo[`age_rating`];
    this.director = this.filmInfo[`director`];
    this.writers = this.filmInfo[`writers`];
    this.actors = this.filmInfo[`actors`];
    this.release = this.filmInfo[`release`];
    this.date = this.release[`date`];
    this.country = this.release[`release_country`];
    this.runtime = this.filmInfo[`runtime`];
    this.genre = this.filmInfo[`genre`];
    this.description = this.filmInfo[`description`];
    this.userDetails = data[`user_details`];
    this.watchList = this.userDetails[`watchlist`];
    this.personalRating = this.userDetails[`personal_rating`];
    this.alreadyWatched = this.userDetails[`already_watched`];
    this.watchingDate = this.userDetails[`watching_date`] ? new Date(this.userDetails[`watching_date`]) : null;
    this.favorite = this.userDetails[`favorite`];
  }
  toRAW() {
    return {
      'id': this.id,
      'comments': this.comments,
      'film_info': {
        'title': this.title,
        'alternative_title': this.alternativeTitle,
        'total_rating': this.totalRating,
        'poster': this.poster,
        'age_rating': this.ageRating,
        'director': this.director,
        'writers': this.writers,
        'actors': this.actors,
        'release': {
          'date': this.date,
          'release_country': this.country
        },
        'runtime': this.runtime,
        'genre': this.genre,
        'description': this.description,
      },
      'user_details': {
        'watchlist': this.watchList,
        'personal_rating': this.personalRating,
        'already_watched': this.alreadyWatched,
        'watching_date': this.watchingDate ? new Date(this.watchingDate).toISOString() : null,
        'favorite': this.favorite
      }
    };
  }

  static parseMovie(data) {
    return new Movie(data);
  }
  static parseMovies(data) {
    return data.map(Movie.parseMovie);
  }


  static clone(data) {
    return new Movie(data.toRAW());
  }
}
