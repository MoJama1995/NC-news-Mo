const { articlesData } = require("../db/data/dev-data/index");

exports.getNewArticles = data => {
  return data.map(item => {
    let dateStr = new Date(item.created_at);
    const { created_at, ...otherKeys } = item;
    otherKeys.created_at = dateStr;
    return otherKeys;
  });
};
