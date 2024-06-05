const Antennas = require("../models/antennas");
const { StatusCodes } = require("http-status-codes");
const Sequelize = require("sequelize");

async function addSurveyAntenna(req, res) {
  const { model_id, gain, vertical_angle_aperture, horizontal_angle_aperture } =
    req.body;

  try {
    const existingAntenna = await Antennas.findByPk(model_id);
    if (existingAntenna) {
      console.log(`updating antenna ${model_id}`);

      existingAntenna.model_id = model_id;
      existingAntenna.gain = gain;
      if (vertical_angle_aperture) {
        existingAntenna.vertical_angle_aperture = vertical_angle_aperture;
      }
      if (horizontal_angle_aperture) {
        existingAntenna.horizontal_angle_aperture = horizontal_angle_aperture;
      }

      await existingAntenna.save();
      res.json({
        status: StatusCodes.OK,
        message: "Antenna updated",
        model: model_id,
        antennaAdded: "1",
      });
    } else {
      const newAntenna = await Antennas.create({
        model_id,
        gain,
        vertical_angle_aperture,
        horizontal_angle_aperture,
      });
      res.json({
        status: StatusCodes.OK,
        message: "Antenna created",
        model: model_id,
        antennaAdded: "1",
      });
    }
  } catch (error) {
    res.json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
      model: model_id,
      antennaAdded: "0",
    });
  }
}

async function getSurveyAntennas(req, res) {
  try {
    const antennas = await Antennas.findAll();
    res.json(antennas);
  } catch (error) {
    res.json({
      status: StatusCodes.NOT_FOUND,
      message: error,
    });
  }
}
async function getSurveyAntenna(req, res) {
  try {
    const model_id = req.params.id;
    const antenna = await Antennas.findByPk(model_id);
    res.json(antenna);
  } catch (error) {
    res.json({
      status: StatusCodes.NOT_FOUND,
      message: error,
    });
  }
}

async function deleteSurveyAntenna(req, res) {
  try {
    const model_id = req.params.id;
    const deletedAntenna = await Antennas.destroy({
      where: { model_id: model_id },
    });
    if (!deletedAntenna) {
      res.json({
        status: StatusCodes.NOT_FOUND,
        message: "Antenna not found",
      });
    } else {
      res.json({
        status: StatusCodes.OK,
        message: "Antenna deleted successfully",
      });
    }
  } catch (error) {
    res.json({
      status: StatusCodes.BAD_REQUEST,
      message: error,
    });
  }
}


async function updateAntenna(req, res) {
  try {
    const {
      model_id,
      gain,
      vertical_angle_aperturen,
      horizontal_angle_aperture
    } = req.body;

    var antenna  = await Antennas.findByPk(req.params.id);
    if (!antenna) {
      res.json({
        status: StatusCodes.NOT_FOUND,
        message: "Antenna does not exist",
      });
    } else {
      // Iterate over the properties of req.body
      for (const property in req.body) {
        // Check if the value is not null or empty
        if (req.body[property] !== null && req.body[property] !== "") {
          // Assign the value to the corresponding property in the node object
          antenna[property] = req.body[property];
        }
      }

      // Save the updated node object
      await antenna.save();

      res.json({
        status: StatusCodes.OK,
        message: "Antenna updated successfully",
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
  addSurveyAntenna,
  getSurveyAntennas,
  getSurveyAntenna,
  deleteSurveyAntenna,
  updateAntenna
};
