//Utils
const { AppError } = require("../utils/appError.utils");
const { catchAsync } = require("../utils/catchAsync.utils");

//Models
const { Consoles } = require("../Models/consoles.model");

const consoleExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const console = await Consoles.findOne({ where: { id } });

  if (!console) {
    return next(new AppError("Console is not found!!", 404));
  }

  req.console = console;
  next();
});

module.exports = { consoleExist };
