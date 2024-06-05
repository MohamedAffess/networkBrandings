const sequelize = require("../config/databaseConfig");
const usefulFunctions = require("../utils/usefulFunctions");
const DataTypes = require("sequelize");

const antennas = sequelize.define(
  "antennas",
  {
    model_id: {
      primaryKey: true,
      unique: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    gain: { type: DataTypes.INTEGER, allowNull: false },
    vertical_angle_aperture: { type: DataTypes.INTEGER, allowNull: true },
    horizontal_angle_aperture: { type: DataTypes.INTEGER, allowNull: true },
  },
  {
    timestamps: false,
  }
);

usefulFunctions.syncTable(antennas, false);

module.exports = antennas;
