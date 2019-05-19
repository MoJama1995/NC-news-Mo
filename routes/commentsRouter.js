const commentsRouter = require("express").Router();

const {
  patchCommentsByID,
  deleteCommentsByID
} = require("../controllers/commentsController");
const { methodNotAllowed } = require("../errors/index");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentsByID)
  .delete(deleteCommentsByID)
  .all(methodNotAllowed);

module.exports = commentsRouter;
