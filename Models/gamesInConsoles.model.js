//Utils
const { db, DataTypes } = require("../utils/database.util");
//Models
const { Games } = require("../Models/games.model");
const { Consoles } = require("../Models/consoles.model");

const gamesInConsoles = db.define("gameInConsole", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
  },
  gameId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Games,
      key: "id",
    },
  },
  consoleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Consoles,
      key: "id",
    },
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "active",
  },
});
module.exports = { gamesInConsoles };
