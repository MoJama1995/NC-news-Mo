const selectUser = require("../models/userModels");

const getUser = (req, res, next) => {
  const { username } = req.params;
  selectUser(username).then(users => {
    res.status(200).send(users);
  });
};

module.exports = { getUser };
