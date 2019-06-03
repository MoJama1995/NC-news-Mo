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
      if (articles.length === 0) return Promise.reject({ status: 404 });
      else res.status(200).send({ articles });
    })
    .catch(next);
};

const getArticlesByID = (req, res, next) => {
  const { article_id } = req.params;
  selectArticlesById(article_id)
    .then(articles => {
      if (articles.length === 0) return Promise.reject({ status: 404 });
      else res.status(200).send({ article: articles[0] });
    })
    .catch(next);
};

const patchArticlesByID = (req, res, next) => {
  const { article_id, inc_votes } = req.params;
  updateArticle(req.params, req.body)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

const getCommentsByArticleID = (req, res, next) => {
  const { article_id } = req.params;
  selectCommentsByArticleID(article_id, req.query)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

const postCommentsByArticleID = (req, res, next) => {
  const { username, body } = req.body;
  const { article_id } = req.params;
  const commentToAdd = {
    author: req.body.username,
    body: req.body.body,
    article_id: req.params.article_id
  };
  insertComments(commentToAdd)
    .then(comment => {
      res.status(201).send({ comment: comment });
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
