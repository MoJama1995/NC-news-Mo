const connection = require("../db/connection");

const updateComments = (comment_id, { votes }) => {
  return connection("comments")
    .where("comments_id", "=", comment_id)
    .increment({ votes })
    .returning("*");
};

const deleteComments = comment_id => {
  return connection("comments")
    .where("comments_id", "=", comment_id)
    .del()
    .returning("*");
};

module.exports = { updateComments, deleteComments };
