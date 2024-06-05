const Channels = require("../models/channels");
const { StatusCodes } = require("http-status-codes");
const Sequelize = require("sequelize");

async function getSurveyChannels(req, res) {
  try {
    const channels = await Channels.findAll();
    res.status(StatusCodes.OK).json(channels);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
}

async function addSurveyChannel(req, res) {
  const { channel_id, frequency } = req.body;

  try {
    const existingChannel = await Channels.findByPk(channel_id);
    if (existingChannel) {
      console.log(`updating channel ${channel_id}`);

      existingChannel.channel_id = channel_id;
      existingChannel.frequency = frequency;
      await existingChannel.save();
      res.json({
        status: StatusCodes.OK,
        message: "Channel updated",
        channel: existingChannel,
        channelAdded: "1",
      });
    } else {
      var newChannel = await Channels.create({
        channel_id,
        frequency,
      });
      res.json({
        status: StatusCodes.OK,
        message: "Channel created",
        channel: newChannel,
        channelAdded: "1",
      });
    }
  } catch (error) {
    res.json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
      channel: newChannel,
      channelAdded: "0",
    });
  }
}

async function getSurveyChannel(req, res) {
  try {
    const channel_id = req.params.id;
    const channel = await Channels.findByPk(channel_id);
    res.json(channel);
  } catch (error) {
    res.json({
      status: StatusCodes.NOT_FOUND,
      message: error,
    });
  }
}

async function deleteSurveyChannel(req, res) {
  try {
    const channel_id = req.params.id;
    const deletedChannel = await Channels.destroy({
      where: { channel_id: channel_id },
    });
    if (!deletedChannel) {
      res.json({
        status: StatusCodes.NOT_FOUND,
        message: "Channel not found",
      });
    } else {
      res.json({
        status: StatusCodes.OK,
        message: "Channel deleted successfully",
      });
    }
  } catch (error) {
    res.json({
      status: StatusCodes.BAD_REQUEST,
      message: error,
    });
  }
}


async function updateChannel(req, res) {
  try {
    const {
      channel_id,frequency
    } = req.body;

    var channel = await Channels.findByPk(req.params.id);
    if (!channel) {
      res.json({
        status: StatusCodes.NOT_FOUND,
        message: "channel does not exist",
      });
    } else {
      // Iterate over the properties of req.body
      for (const property in req.body) {
        // Check if the value is not null or empty
        if (req.body[property] !== null && req.body[property] !== "") {
          // Assign the value to the corresponding property in the node object
          channel[property] = req.body[property];
        }
      }

      // Save the updated node object
      await channel.save();

      res.json({
        status: StatusCodes.OK,
        message: "Channel updated successfully",
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
  getSurveyChannels,
  addSurveyChannel,
  getSurveyChannel,
  deleteSurveyChannel,
  updateChannel
};
