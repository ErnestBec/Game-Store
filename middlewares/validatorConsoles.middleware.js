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

const createConsolesValidator = [
  body("name").notEmpty().withMessage("The name cannot be empty"),
  body("company").notEmpty().withMessage("The company cannot be empty"),
  checkResult,
];

const updateConsolesValidator = [
  body("name").notEmpty().withMessage("The name cannot be empty"),
  checkResult,
];
module.exports = { createConsolesValidator, updateConsolesValidator };
