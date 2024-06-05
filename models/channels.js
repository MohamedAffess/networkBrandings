const sequelize = require("../config/databaseConfig");
const usefulFunctions = require("../utils/usefulFunctions");
const DataTypes = require("sequelize");

const channels = sequelize.define(
    "channels", {
        channel_id: {
            primaryKey: true,
            unique: true,
            type: DataTypes.STRING,
            allowNull: false,
        },

        frequency: { type: DataTypes.INTEGER, allowNull: false },
    }, {
        timestamps: false,
    }
);

usefulFunctions.syncTable(channels, false);

module.exports = channels;