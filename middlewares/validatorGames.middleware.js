const { body, validationResult } = require("express-validator");

//Utils
const { AppError } = require("../utils/appError.utils");

const checkResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Array has errors
    const errorMsgs = errors.array().map((err) => err.msg);

    const message = errorMsgs.join(". ");

    return next(new AppError(message, 400));
  }

  next();
};

const createGameValidator = [
  body("title").notEmpty().withMessage("The title cannot be empty"),
  body("genere").notEmpty().withMessage("The genere cannot be empty"),
  checkResult,
];

const updateGameValidator = [
  body("title").notEmpty().withMessage("The title cannot be empty"),
  checkResult,
];
const creteReviewsValidator = [
  body("comment").notEmpty().withMessage("The comment cannot be empty"),
  checkResult,
];

module.exports = {
  createGameValidator,
  updateGameValidator,
  creteReviewsValidator,
};
