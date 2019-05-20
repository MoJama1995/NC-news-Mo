const dbConfig = require("../knexfile");
console.log(dbConfig);
module.exports = require("knex")(dbConfig);
