//Models
const { User } = require("../Models/user.model");
//Utils
const { AppError } = require("../utils/appError.utils");
const { catchAsync } = require("../utils/catchAsync.utils");

const userExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });

  if (!user) {
    return next(new AppError("User not Found!", 404));
  }
  req.user = user;
  next();
});

module.exports = { userExist };
