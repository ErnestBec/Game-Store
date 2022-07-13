const express = require("express");

//Middlewares
const { gameExist } = require("../middlewares/games.middleware.js");
const {
  createGameValidator,
  updateGameValidator,
  creteReviewsValidator,
} = require("../middlewares/validatorGames.middleware");
const { protectedSession } = require("../middlewares/auth.middleware");

//Controllers
const {
  newGame,
  getAllGames,
  updateGame,
  deletGame,
  newReviews,
  consoleToGame,
} = require("../Controllers/games.controller");

const gamesRouter = express.Router();

//Define endpoints

gamesRouter.get("/", getAllGames);

gamesRouter.use(protectedSession);

gamesRouter.post("/", createGameValidator, newGame);
gamesRouter.post("/gameToConsole", consoleToGame);

gamesRouter
  .use("/:id", gameExist)
  .route("/:id")
  .patch(updateGameValidator, updateGame)
  .delete(deletGame)
  .post(creteReviewsValidator, newReviews);

module.exports = { gamesRouter };
