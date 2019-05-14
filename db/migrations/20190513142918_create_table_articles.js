exports.up = function(knex, Promise) {
  const now = Date.now;
  console.log("creating the table for articles!");
  return knex.schema.createTable("articles", articlesTable => {
    articlesTable.increments("article_id").primary();
    articlesTable.string("title").notNullable();
    articlesTable.text("body").notNullable();
    articlesTable.integer("votes").defaultTo(0);
    articlesTable.string("topic").references("slug");
    articlesTable.string("author").references("users");
    articlesTable.string("created_at").defaultTo(now);
  });
};

exports.down = function(knex, Promise) {
  console.log("removing articles tables...");
  return knex.schema.dropTable("articles");
};
