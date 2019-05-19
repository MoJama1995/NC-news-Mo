const userRouter = require("express").Router();
const { methodNotAllowed } = require("../errors/index");

const { getUser } = require("../controllers/userControllers");
userRouter
  .route("/:username")
  .get(getUser)
  .all(methodNotAllowed);

module.exports = userRouter;
