const connection = require("../db/connection");

const selectUsers = username => {
  return connection
    .select("*")
    .where("username", "=", username)
    .from("users")
    .returning("*");
};

module.exports = selectUsers;
