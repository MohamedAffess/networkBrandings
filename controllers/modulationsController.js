const Modulations = require("../models/modulations");
const { StatusCodes } = require("http-status-codes");
const Sequelize = require("sequelize");

async function getSurveyModulations(req, res) {
  try {
    const modulations = await Modulations.findAll();
    res.status(StatusCodes.OK).json(modulations);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
}

async function addSurveyModulation(req, res) {
  const { rate } = req.body;

  try {
    const existingModulation = await Modulations.findOne({
      where: { rate: rate },
    });
    if (existingModulation) {
      console.log(`updating Modulation ${JSON.stringify(existingModulation)}`);

      existingModulation.rate = rate;
      await existingModulation.save();
      res.json({
        status: StatusCodes.OK,
        message: "Modulation updated",
        modulation: existingModulation,
        modulationAdded: "1",
      });
    } else {
      var newModulation = await Modulations.create({
        rate: rate,
      });
      res.json({
        status: StatusCodes.OK,
        message: "Modulation created",
        modulation: newModulation,
        modulationAdded: "1",
      });
    }
  } catch (error) {
    res.json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
      modulation: newModulation,
      modulationAdded: "0",
    });
  }
}

async function getSurveyModulation(req, res) {
  try {
    const modulation_id = req.params.id;
    const modulation = await Modulations.findByPk(modulation_id);
    res.json(modulation);
  } catch (error) {
    res.json({
      status: StatusCodes.NOT_FOUND,
      message: error,
    });
  }
}

async function deleteSurveyModulation(req, res) {
  try {
    const modulation_id = req.params.id;
    const deletedModulation = await Modulations.destroy({
      where: { modulation_id: modulation_id },
    });
    if (!deletedModulation) {
      res.json({
        status: StatusCodes.NOT_FOUND,
        message: "Modulation not found",
      });
    } else {
      res.json({
        status: StatusCodes.OK,
        message: "Modulation deleted successfully",
      });
    }
  } catch (error) {
    res.json({
      status: StatusCodes.BAD_REQUEST,
      message: error,
    });
  }
}

async function updateModulation(req, res) {
  try {
    const { modulation_id, rate } = req.body;

    var modulation = await Modulations.findByPk(req.params.id);
    if (!modulation) {
      res.json({
        status: StatusCodes.NOT_FOUND,
        message: "modulation does not exist",
      });
    } else {
      // Iterate over the properties of req.body
      for (const property in req.body) {
        // Check if the value is not null or empty
        if (req.body[property] !== null && req.body[property] !== "") {
          // Assign the value to the corresponding property in the node object
          modulation[property] = req.body[property];
        }
      }

      // Save the updated node object
      await modulation.save();

      res.json({
        status: StatusCodes.OK,
        message: "Modulation updated successfully",
      });
    }
  } catch (error) {
    res.json({
      status: StatusCodes.BAD_REQUEST,
      message: error,
    });
  }
}


module.exports = {
  addSurveyModulation,
  getSurveyModulation,
  getSurveyModulations,
  deleteSurveyModulation,
  updateModulation
};
