const {
  articlesData,
  commmentsData,
  topicsData,
  usersData
} = require("../data/dev-data/index");

const {
  getNewArticles,
  updateComments,
  createArticleRef
} = require("../../utils/seedUtils.js");

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex("topics")
        .insert(topicsData)
        .into("topics")
        .returning("*");
    })
    .then(() => {
      return knex("users")
        .insert(usersData)
        .returning("*");
    })
    .then(() => {
      const updatedArticles = getNewArticles(articlesData);
      return knex("articles")
        .insert(updatedArticles)
        .into("articles")
        .returning("*");
    })
    .then(articles => {
      const articleRef = createArticleRef(articles);
      const updatedComments = updateComments(commmentsData, articleRef);
      return knex("comments")
        .insert(updatedComments)
        .into("comments")
        .returning("*");
    });
};
