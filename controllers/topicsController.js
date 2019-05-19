const selectTopics = require("../models/topicsModel");

const getTopics = (req, res, next) => {
  selectTopics(req)
    .then(topics => {
      res.status(200).send({ topics });
    })
    .catch(next);
};

module.exports = getTopics;
