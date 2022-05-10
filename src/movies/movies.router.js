const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// route to movies
router.route("/").get(controller.list).all(methodNotAllowed);

// route to movie by id
router.route("/:movieId").get(controller.read).all(methodNotAllowed);

// route to theaters that play a movie
router
  .route("/:movieId/theaters")
  .get(controller.theaterPlayingMovie)
  .all(methodNotAllowed);

// route to reviews for a movie
router
  .route("/:movieId/reviews")
  .get(controller.listReviews)
  .all(methodNotAllowed);

module.exports = router;
