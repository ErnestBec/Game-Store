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

const createUserValidator = [
  body("name").notEmpty().withMessage("The name cannot be empty"),
  body("email")
    .notEmpty()
    .withMessage("The email cannot be empty")
    .isEmail()
    .withMessage("Enter a valid email"),
  body("password")
    .isAlphanumeric()
    .withMessage("the password must contain letters and numbers")
    .isLength({ min: 8 })
    .withMessage("the password must contain at least 8 characters"),
  checkResult,
];

const updateUserValidator = [
  body("name").notEmpty().withMessage("The name cannot be empty"),
  checkResult,
];
module.exports = { createUserValidator, updateUserValidator };
