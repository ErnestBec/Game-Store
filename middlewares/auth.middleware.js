const jwt = require("jsonwebtoken");
const dontenv = require("dotenv");

//Utils
const { AppError } = require("../utils/appError.utils");
const { catchAsync } = require("../utils/catchAsync.utils");

//Models
const { User } = require("../Models/user.model");

const protectedSession = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("Invalid Session!", 403));
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({
    where: { id: decoded.id, status: "active" },
  });

  if (!user) {
    return next(
      new AppError("The owner of this token doesnt exist anymore", 403)
    );
  }
  req.userSession = user;
  next();
});
const protectedAcount = catchAsync(async (req, res, next) => {
  const { userSession, user } = req;

  if (userSession.id != user.id) {
    return next(new AppError("You do not own this account", 403));
  }
  next();
});

module.exports = { protectedSession, protectedAcount };
