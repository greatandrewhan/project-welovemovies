const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

// mapProperties critic details to the review
const addCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

// get all reviews for a movie
function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

// update a review
function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*")
    .then(() => {
      return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select("*")
        .where({ review_id: updatedReview.review_id })
        .first()
        .then(addCritic);
    });
}

// delete a review
function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

module.exports = {
  read,
  update,
  delete: destroy,
};
