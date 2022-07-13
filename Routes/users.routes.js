const express = require("express");

//Middlewares
const { userExist } = require("../middlewares/userExist");
const {
  createUserValidator,
  updateUserValidator,
} = require("../middlewares/validatorUsers.middleware");
const {
  protectedSession,
  protectedAcount,
} = require("../middlewares/auth.middleware");

//Controllers
const {
  createUser,
  getAllUserActives,
  UpdateUser,
  deletUser,
  login,
} = require("../Controllers/user.controllers");

const userRouter = express.Router();

//Create Endpoints
userRouter.post("/signup", createUserValidator, createUser);
userRouter.post("/login", login);

//ProtectedSession
userRouter.use(protectedSession);
userRouter.get("/", getAllUserActives);
userRouter
  .use("/:id", userExist)
  .route("/:id")
  .patch(protectedAcount, updateUserValidator, UpdateUser)
  .delete(protectedAcount, deletUser);

module.exports = { userRouter };
