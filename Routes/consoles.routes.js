const express = require("express");

//Middlewares
const { consoleExist } = require("../middlewares/console.middleware");
const {
  createConsolesValidator,
  updateConsolesValidator,
} = require("../middlewares/validatorConsoles.middleware");
const { protectedSession } = require("../middlewares/auth.middleware");

//Controllers
const {
  newConsole,
  getAllConsoles,
  updateConsole,
  deletedConsole,
} = require("../Controllers/consoles.controller");

const consoleRouter = express.Router();

//Define Endpoints
consoleRouter.get("/", getAllConsoles);

consoleRouter.use(protectedSession);

consoleRouter.post("/", createConsolesValidator, newConsole);

consoleRouter
  .use("/:id", consoleExist)
  .route("/:id")
  .patch(updateConsolesValidator, updateConsole)
  .delete(deletedConsole);

module.exports = { consoleRouter };
