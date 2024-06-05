const sequelize = require("../config/databaseConfig");
const usefulFunctions = require("../utils/usefulFunctions");
const DataTypes = require("sequelize");

const modulations = sequelize.define(
  "modulations",
  {
    modulation_id: {
      primaryKey: true,
      unique: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    rate: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    timestamps: false,
  }
);

usefulFunctions.syncTable(modulations, false);

module.exports = modulations;
