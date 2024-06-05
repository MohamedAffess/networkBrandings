const sequelize = require("../config/databaseConfig");
const usefulFunctions = require("../utils/usefulFunctions");
const DataTypes = require("sequelize");
const product_version = sequelize.define(
  "product_version",
  {
    id: {
      primaryKey: true,
      unique: true,
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    db_schema_version: { type: DataTypes.INTEGER, allowNull: true },
  },
  {
    timestamps: false,
  }
);

usefulFunctions.syncTable(product_version, true);

module.exports = product_version;
