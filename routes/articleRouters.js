const articleRouters = require("express").Router();
const {
  getArticles,
  getArticlesByID,
  patchArticlesByID,
  getCommentsByArticleID,
  postCommentsByArticleID,
  postArticles
} = require("../controllers/articlesControllers");

const { methodNotAllowed } = require("../errors/index");

articleRouters
  .route("/")
  .get(getArticles)
  .post(postArticles)
  .all(methodNotAllowed);

articleRouters
  .route("/:article_id")
  .get(getArticlesByID)
  .patch(patchArticlesByID)
  .all(methodNotAllowed);

articleRouters
  .route("/:article_id/comments")
  .get(getCommentsByArticleID)
  .post(postCommentsByArticleID)
  .all(methodNotAllowed);

module.exports = articleRouters;
