const sequelize = require("../config/databaseConfig");
const usefulFunctions = require("../utils/usefulFunctions");
const DataTypes = require("sequelize");

const nodes = sequelize.define(
    "nodes", {
        node_type: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        node_hw_model: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        wired_interfaces_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        wireless_interfaces_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        node_has_battery: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        node_has_cellular_slot: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        WLAN_integrated_antenna_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        WLAN_integrated_antenna_gain: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        WLAN_integrated_antenna_vertical_angle_aperture: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        WLAN_integrated_antenna_horizontal_angle_aperture: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        WLAN_interface_antenna_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0,
        }, //not integrated

        cellular_interface_antenna_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },

        wired_interfaces_speed: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        wireless_interfaces_speed: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cellular_interface_type: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cellular_uplink_max: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        cellular_downlink_max: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        cellular_integrated_antenna_count: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        cellular_integrated_antenna_gain: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        timestamps: false,
    }
);

usefulFunctions.syncTable(nodes, false);

module.exports = nodes;