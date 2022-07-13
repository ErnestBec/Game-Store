const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

//Models
const { User } = require("../Models/user.model");

//utils
const { catchAsync } = require("../utils/catchAsync.utils");
const { AppError } = require("../utils/appError.utils");

dotenv.config({ path: "./config.env" });

const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({ name, email, password: hashPassword });

  newUser.password = undefined;

  res.status(201).json({
    status: "Successfull",
    newUser,
  });
});
const getAllUserActives = catchAsync(async (req, res, next) => {
  const users = await User.findAll({ where: { status: "active" } });

  res.status(201).json({
    status: "success",
    users,
  });
});

const UpdateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { name, email } = req.body;

  await user.update({ name, email });
  res.status(204).json({
    status: "succes",
  });
});
const deletUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: "deleted" });
  res.status(204).json({
    status: "succes",
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email, status: "active" } });

  if (!user) {
    return next(new AppError("Credentials invalids!!", 400));
  }

  //Valid Password

  const passwordValid = await bcrypt.compare(password, user.password);

  if (!passwordValid) {
    return next(new AppError("Credentials invalids!!", 400));
  }
  //Generate Token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(201).json({
    status: "Succes Session",
    token,
  });
});

module.exports = {
  createUser,
  getAllUserActives,
  UpdateUser,
  deletUser,
  login,
};
