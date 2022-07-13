const express = require("express");

//Routers
const { userRouter } = require("./Routes/users.routes");
const { gamesRouter } = require("./Routes/games.routes");
const { consoleRouter } = require("./Routes/consoles.routes");

//ErrorHandler
const { globalErrorHandler } = require("./Controllers/error.controller");
//Utils
const { AppError } = require("./utils/appError.utils");
//Init app express
const app = express();
app.use(express.json());

//Define Endpoints
app.use("/api/v1/users", userRouter);
app.use("/api/v1/games", gamesRouter);
app.use("/api/v1/consoles", consoleRouter);

app.all("*", (req, res, next) => {
  next(
    new AppError(
      `${req.method}  ${req.originalUrl} not found in this server`,
      404
    )
  );
});
app.use(globalErrorHandler);
module.exports = { app };
