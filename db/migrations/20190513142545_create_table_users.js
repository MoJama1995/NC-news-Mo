exports.up = function(knex, Promise) {
  console.log("creating the table for users!");
  return knex.schema.createTable("users", usersTable => {
    usersTable
      .string("username")
      .primary()
      .notNullable()
      .unique();
    usersTable.string("avatar_url");
    usersTable.string("name").notNullable();
  });
};

exports.down = function(knex, Promise) {
  console.log("removing users tables...");
  return knex.schema.dropTable("users");
};
