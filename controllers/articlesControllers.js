const {
  selectArticles,
  selectArticlesById,
  updateArticle,
  selectCommentsByArticleID,
  insertComments
} = require("../models/articlesModel");

const getArticles = (req, res, next) => {
  selectArticles(req.query)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

const getArticlesByID = (req, res, next) => {
  const { article_id } = req.params;
  selectArticlesById(article_id)
    .then(articles => {
      console.log(articles);
      if (articles.length === 0) return Promise.reject({ status: 404 });
      else res.status(200).send({ articles });
    })
    .catch(next);
};

const patchArticlesByID = (req, res, next) => {
  const { article_id } = req.params;
  updateArticle(article_id, req.body)
    .then(articles => {
      res.status(200).send(articles);
    })
    .catch(next);
};

const getCommentsByArticleID = (req, res, next) => {
  const { article_id } = req.params;
  selectCommentsByArticleID(article_id, req.query)
    .then(comments => {
      res.status(200).send(comments);
    })
    .catch(next);
};

const postCommentsByArticleID = (req, res, next) => {
  const { username } = req.body;
  const { body } = req.body;
  const commentToAdd = {
    author: username,
    body: body
  };
  console.log(commentToAdd, "<--- comment");
  insertComments(commentToAdd, req.params)
    .then(comments => {
      if (typeof comments.body !== "string")
        return Promise.reject({ status: 422 });
      else res.status(200).send({ comments });
    })
    .catch(next);
};

module.exports = {
  getArticles,
  getArticlesByID,
  patchArticlesByID,
  getCommentsByArticleID,
  postCommentsByArticleID
};
