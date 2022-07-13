//utils
const { AppError } = require("../utils/appError.utils");
const { catchAsync } = require("../utils/catchAsync.utils");

//Models
const { Games } = require("../Models/games.model");

const gameExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const game = await Games.findOne({ where: { id } });

  if (!game) {
    return next(new AppError("Games is not found!", 404));
  }

  req.game = game;
  next();
});

module.exports = { gameExist };
