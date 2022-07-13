const { app } = require("./app");
//Utils
const { db } = require("./utils/database.util");
//InitModel Relations
const { initModel } = require("./Models/initModels");

db.authenticate()
  .then(() => console.log("DB authenticate Successful!!"))
  .catch((err) => console.log(err));

//Establishion relations models
initModel();

db.sync({ force: false })
  .then(() => console.log("DB sync Successful!!"))
  .catch((err) => console.log(err));

app.listen(4000, () => console.log("App runing port 4000!!"));
