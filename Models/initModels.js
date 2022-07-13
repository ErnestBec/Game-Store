//Models
const { Consoles } = require("./consoles.model");
const { Games } = require("./games.model");
const { Review } = require("./reviews.model");
const { User } = require("./user.model");

const initModel = () => {
  // 1 User <----> M Reviews
  User.hasMany(Review, { foreignKey: "userId" });
  Review.belongsTo(User);
  // 1 Games <----> M reviws
  Games.hasMany(Review, { foreignKey: "gameId" });
  Review.belongsTo(Games);
  // M Games <----> M GamesInConsoles
  Games.belongsToMany(Consoles, { through: "gameInConsole" });
  Consoles.belongsToMany(Games, { through: "gameInConsole" });
};

module.exports = { initModel };
