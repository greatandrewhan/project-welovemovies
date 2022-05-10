const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// movie exists in the request
async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const foundMovie = await service.read(movieId);
  if (foundMovie) {
    res.locals.movie = foundMovie;
    return next();
  }
  return next({
    status: 404,
    message: "Movie cannot be found.",
  });
}

// list all movies
async function list(req, res) {
  if (req.query.is_showing) {
    res.send({ data: await service.inTheatersNow() });
  } else {
    res.send({ data: await service.list() });
  }
}

// read a movie
async function read(req, res) {
  res.send({ data: res.locals.movie });
}

// list all theaters that play a movie
async function theaterPlayingMovie(req, res) {
  const data = await service.theaterPlayingMovie(res.locals.movie.movie_id);
  res.send({ data });
}

// list all reviews for a movie
async function listReviews(req, res) {
  const data = await service.listReviews(res.locals.movie.movie_id);
  res.send({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), read],
  theaterPlayingMovie: [asyncErrorBoundary(movieExists), theaterPlayingMovie],
  listReviews: [asyncErrorBoundary(movieExists), listReviews],
};
