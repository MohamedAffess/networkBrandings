const express = require("express");
const luceorProductsRouter = express.Router();
const antennasController = require("../controllers/antennasController");
const channelsController = require("../controllers/channelsController");
const modulationsController = require("../controllers/modulationsController");
const nodesController = require("../controllers/nodesController");
// .get("/", (req, res) => {
//   res.send("Hello World!");
// });

//TODO -
//copy all meshtool endpoints survey
//add necessary endpoints
//TODO -

luceorProductsRouter
  //antennas
  .post("/surveyAntennas", antennasController.addSurveyAntenna) //meshtool
  .get("/surveyAntennas", antennasController.getSurveyAntennas) //meshtool
  .get("/surveyAntennas/:id", antennasController.getSurveyAntenna)
  .delete("/surveyAntennas/:id", antennasController.deleteSurveyAntenna)
  .put("/surveyAntennas/:id", antennasController.updateAntenna)
  //channels

  .post("/surveyChannels", channelsController.addSurveyChannel)
  .get("/surveyChannels", channelsController.getSurveyChannels) //meshtool
  .get("/surveyChannels/:id", channelsController.getSurveyChannel)
  .delete("/surveyChannels/:id", channelsController.deleteSurveyChannel)
  .put("/surveyChannels/:id", channelsController.updateChannel)

  //modulations
  .post("/surveyModulations", modulationsController.addSurveyModulation) //meshtool
  .get("/surveyModulations", modulationsController.getSurveyModulations)
  .get("/surveyModulations/:id", modulationsController.getSurveyModulation)
  .delete(
    "/surveyModulations/:id",
    modulationsController.deleteSurveyModulation
  )
  .put("/surveyModulations/:id",modulationsController.updateModulation)
  //nodes
  .post("/luceorProductsNodes", nodesController.createNode)
  .get("/luceorProductsNodes", nodesController.getNodes)
  .get("/luceorProductsNodes/:id", nodesController.getNode)
  .delete("/luceorProductsNodes/:id", nodesController.deleteNode)
  .put("/luceorProductsNodes/:id", nodesController.updateNode);

module.exports = luceorProductsRouter;
