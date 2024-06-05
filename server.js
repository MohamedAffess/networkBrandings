const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/databaseConfig");
const luceorProductsRouter = require("./routes/luceorProductsRouter");
const Antennas = require("./models/antennas");
const Nodes = require("./models/nodes");
const Channels = require("./models/channels");
const product_version = require("./models/product_version");
const Modulations = require("./models/modulations");
const app = express();
const port = 3300;

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use("/wms/survey", luceorProductsRouter);

// Connect to database
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected and synced succesfully !!! ");
  })
  .catch((err) => {
    console.error("Database sync failed...", err);
  });

app.listen(port, () => {
  console.log(`Luceor Products Microservice is listening on ${port}`);
});
