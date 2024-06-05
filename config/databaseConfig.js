const { Sequelize } = require("sequelize");
const fs = require("fs");

//database creation
const DATA_BASE_DIRECTORY = "./dbDirectory"; //DB directory
const DATA_BASE_NAME = "luceorProducts.sqlite"; //DB file name
const DATA_BASE_PATH = `${DATA_BASE_DIRECTORY}/${DATA_BASE_NAME}`; //database file path

//check if directory exists else create it
if (!fs.existsSync(DATA_BASE_DIRECTORY)) {
  fs.mkdirSync(DATA_BASE_DIRECTORY);
  console.log("Database directory created succesfully !");
} else {
  console.log("Database directory already exists !");
}

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: DATA_BASE_PATH,
  logging: (msg) => {
    if (msg.startsWith("Error: ")) {
      console.error(msg);
    }
  },
});

module.exports = sequelize;
