//Utils
const { catchAsync } = require("../utils/catchAsync.utils");
//Models
const { Consoles } = require("../Models/consoles.model");
const { Games } = require("../Models/games.model");

const newConsole = catchAsync(async (req, res, next) => {
  const { name, company } = req.body;
  const newConsole = await Consoles.create({ name, company });

  res.status(201).json({
    status: "created successful",
    newConsole,
  });
});
const getAllConsoles = catchAsync(async (req, res, next) => {
  const consoles = await Consoles.findAll({
    include: [{ model: Games, attributes: ["title", "genere"] }],
  });

  res.status(200).json({
    status: " successful",
    consoles,
  });
});
const updateConsole = catchAsync(async (req, res, next) => {
  const { console } = req;
  const { name } = req.body;
  await console.update({ name });

  res.status(204).json({
    status: "Succes",
  });
});
const deletedConsole = catchAsync(async (req, res, next) => {
  const { console } = req;

  await console.update({ status: "deleted" });

  res.status(204).json({
    status: "Succes",
  });
});

module.exports = {
  newConsole,
  getAllConsoles,
  updateConsole,
  deletedConsole,
};
