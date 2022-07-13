//Utils
const { catchAsync } = require("../utils/catchAsync.utils");
//Models
const { Consoles } = require("../Models/consoles.model");
const { Games } = require("../Models/games.model");
const { Review } = require("../Models/reviews.model");
const { gamesInConsoles } = require("../Models/gamesInConsoles.model");
const { User } = require("../Models/user.model");

const newGame = catchAsync(async (req, res, next) => {
  const { title, genere } = req.body;

  const newGame = await Games.create({ title, genere });

  res.status(201).json({
    status: "Successfull",
    newGame,
  });
});
const getAllGames = catchAsync(async (req, res, next) => {
  const games = await Games.findAll({
    include: [
      { model: Consoles, attributes: ["name", "company"] },
      {
        model: Review,
        attributes: ["comment"],
        include: [{ model: User, attributes: ["name"] }],
      },
    ],
  });

  res.status(200).json({
    status: "Successfull",
    games,
  });
});
const updateGame = catchAsync(async (req, res, next) => {
  const { game } = req;
  const { title } = req.body;

  await game.update({ title });

  res.status(204).json({
    status: "update Success",
  });
});
const deletGame = catchAsync(async (req, res, next) => {
  const { game } = req;

  await game.update({ status: "deleted" });

  res.status(204).json({
    status: "Succes elimined",
  });
});
const newReviews = catchAsync(async (req, res, next) => {
  const { game, userSession } = req;
  const { comment } = req.body;
  const newComment = await Review.create({
    userId: userSession.id,
    gameId: game.id,
    comment,
  });

  res.status(200).json({
    status: "new Comment Successful",
    newComment,
  });
});

const consoleToGame = catchAsync(async (req, res, next) => {
  const { consoleId, gameId } = req.body;
  const gameToConsole = await gamesInConsoles.create({ gameId, consoleId });

  res.status(201).json({
    status: "created success",
    gameToConsole,
  });
});

module.exports = {
  newGame,
  getAllGames,
  updateGame,
  deletGame,
  newReviews,
  consoleToGame,
};
