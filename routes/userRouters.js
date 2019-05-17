const userRouter = require("express").Router();

const { getUser } = require("../controllers/userControllers");
userRouter.get("/:username", getUser);

module.exports = userRouter;
