const { where } = require("sequelize");
const Nodes = require("../models/nodes"); // assuming the Node model is defined
const { StatusCodes } = require("http-status-codes");

async function createNode(req, res) {
  try {
    const {
      node_type,
      node_hw_model,
      wired_interfaces_count,
      wireless_interfaces_count,
      node_has_battery,
      node_has_cellular_slot,
      WLAN_integrated_antenna_count,
      WLAN_integrated_antenna_gain,
      WLAN_integrated_antenna_vertical_angle_aperture,
      WLAN_integrated_antenna_horizontal_angle_aperture,
      WLAN_interface_antenna_count,
      cellular_interface_antenna_count,
      wired_interfaces_speed,
      wireless_interfaces_speed,
      cellular_interface_type,
      cellular_uplink_max,
      cellular_downlink_max,
      cellular_integrated_antenna_count,
      cellular_integrated_antenna_gain,
    } = req.body;

    const [node, created] = await Nodes.findOrCreate({
      where: { node_type },
      defaults: {
        node_hw_model,
        wired_interfaces_count,
        wireless_interfaces_count,
        node_has_battery,
        node_has_cellular_slot,
        WLAN_integrated_antenna_count,
        WLAN_integrated_antenna_gain,
        WLAN_integrated_antenna_vertical_angle_aperture,
        WLAN_integrated_antenna_horizontal_angle_aperture,
        WLAN_interface_antenna_count,
        cellular_interface_antenna_count,
        wired_interfaces_speed,
        wireless_interfaces_speed,
        cellular_interface_type,
        cellular_uplink_max,
        cellular_downlink_max,
        cellular_integrated_antenna_count,
        cellular_integrated_antenna_gain,
      },
    });

    if (created) {
      res.status(StatusCodes.OK).json({
        message: "Node created successfully",
        data: node,
      });
    } else {
      await node.update({
        node_hw_model,
        wired_interfaces_count,
        wireless_interfaces_count,
        node_has_battery,
        node_has_cellular_slot,
        WLAN_integrated_antenna_count,
        WLAN_integrated_antenna_gain,
        WLAN_integrated_antenna_vertical_angle_aperture,
        WLAN_integrated_antenna_horizontal_angle_aperture,
        WLAN_interface_antenna_count,
        cellular_interface_antenna_count,
        wired_interfaces_speed,
        wireless_interfaces_speed,
        cellular_interface_type,
        cellular_uplink_max,
        cellular_downlink_max,
        cellular_integrated_antenna_count,
        cellular_integrated_antenna_gain,
      });

      res.status(StatusCodes.OK).json({
        message: "Node updated successfully",
        data: node,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred while creating/updating the node",
      error: error.message,
    });
  }
}

async function getNodes(req, res) {
  try {
    const nodes = await Nodes.findAll();
    res.status(StatusCodes.OK).json(nodes);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
}

async function getNode(req, res) {
  try {
    const node = await Nodes.findByPk(req.params.id);
    res.status(StatusCodes.OK).json(node);
  } catch (error) {
    res.json({
      status: StatusCodes.NOT_FOUND,
      message: error,
    });
  }
}

async function deleteNode(req, res) {
  try {
    const deletedNode = await Nodes.destroy({
      where: {
        node_type: req.params.id,
      },
    });
    if (!deletedNode) {
      res.json({
        status: StatusCodes.NOT_FOUND,
        message: "Node not found",
      });
    } else {
      res.json({
        status: StatusCodes.OK,
        message: "Node deleted successfully",
      });
    }
  } catch (error) {
    res.json({
      status: StatusCodes.BAD_REQUEST,
      message: error,
    });
  }
}

async function updateNode(req,res){
  try{
    const{

      node_hw_model,
        wired_interfaces_count,
        wireless_interfaces_count,
        node_has_battery,
        node_has_cellular_slot,
        WLAN_integrated_antenna_count,
        WLAN_integrated_antenna_gain,
        WLAN_integrated_antenna_vertical_angle_aperture,
        WLAN_integrated_antenna_horizontal_angle_aperture,
        WLAN_interface_antenna_count,
        cellular_interface_antenna_count,
        wired_interfaces_speed,
        wireless_interfaces_speed,
        cellular_interface_type,
        cellular_uplink_max,
        cellular_downlink_max,
        cellular_integrated_antenna_count,
        cellular_integrated_antenna_gain,

    }=req.body

    var node = await Nodes.findByPk(req.params.id)
    if(!node){
      res.json({
        status:StatusCodes.NOT_FOUND,
        message:"Node does not exist"
      })
    }else{
      // Iterate over the properties of req.body
      for (const property in req.body) {
        // Check if the value is not null or empty
        if (req.body[property] !== null && req.body[property] !== "") {
          // Assign the value to the corresponding property in the node object
          node[property] = req.body[property];
        }
      }

      // Save the updated node object
      await node.save();

      res.json({
        status: StatusCodes.OK,
        message: "Node updated successfully",
      });
    }
    


  }catch(error){
     res.json({
       status: StatusCodes.BAD_REQUEST,
       message: error,
     });

  }
}

module.exports = { createNode, getNodes, getNode, deleteNode, updateNode };
