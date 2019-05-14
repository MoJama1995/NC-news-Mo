const { articlesData } = require("../db/data/dev-data/index");

exports.getNewArticles = data => {
  return data.map(item => {
    let dateStr = new Date(item.created_at);
    const { created_at, ...otherKeys } = item;
    otherKeys.created_at = dateStr;
    return otherKeys;
  });
};
exports.createArticleRef = articles => {
  let ref = {};
  if (articles.length > 0) {
    articles.forEach(function(article) {
      ref[article.title] = article.article_id;
    });
  }
  return ref;
};

exports.updateComments = (comments, articleRef) => {
  const newFormat = comments.map(comment => {
    return {
      body: comment.body,
      article_id: articleRef[comment.belongs_to],
      author: comment.created_by,
      votes: comment.votes,
      created_at: new Date(comment.created_at)
    };
  });
  return newFormat;
};
