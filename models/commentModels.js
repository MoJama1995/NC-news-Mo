const connection = require("../db/connection");

const updateComments = (comment_id, inc_votes) => {
  return connection("comments")
    .where("comments_id", "=", comment_id)
    .increment("votes", inc_votes || 0)
    .returning("*");
};

const deleteComments = comment_id => {
  return connection("comments")
    .where("comments_id", "=", comment_id)
    .del()
    .returning("*");
};

module.exports = { updateComments, deleteComments };
