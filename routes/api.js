const apiRouter = require("express").Router();
const topicsRouter = require("./topicsRouter.js");
const articlesRouter = require("./articleRouters.js");
const commentsRouter = require("./commentsRouter.js");
const userRouter = require("./userRouters.js");

const { methodNotAllowed } = require("../errors/index");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/users", userRouter);

apiRouter
  .route("/")
  .get((req, res) => res.send({ ok: true }))
  .all(methodNotAllowed);

module.exports = apiRouter;

// select().count("comments.article_id as comment_count")
