exports.up = function(knex, Promise) {
  const now = Date.now();
  return knex.schema.createTable("comments", commentsTable => {
    commentsTable.increments("comments_id").primary();
    commentsTable.string("author").references("users.username");
    commentsTable.text("body");
    commentsTable.integer("article_id").references("articles.article_id");
    commentsTable.integer("votes").defaultTo(0);
    commentsTable.string("created_at").defaultTo(now);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("comments");
};
