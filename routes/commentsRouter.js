const commentsRouter = require("express").Router();

const {
  patchCommentsByID,
  deleteCommentsByID
} = require("../controllers/commentsController");

commentsRouter.patch("/:comment_id", patchCommentsByID);
commentsRouter.delete("/:comment_id", deleteCommentsByID);

module.exports = commentsRouter;
