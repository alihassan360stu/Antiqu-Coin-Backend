const mysql = require("mysql2/promise");
const path = require("path")
const { Sequelize } = require("sequelize");

var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "development";
var config1 = require(__dirname + "\\config.json")[env];

const database = "test";

const config = {
  host: "localhost",
  user: "root",
  database: database,
  password: "ali",
};

var db = {};

const dataBaseInialize = async () => {
  const connection = await mysql.createConnection(config);
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    var sequelize = new Sequelize(
      config1.database,
      config1.username,
      config1.password,
      config1
    );
  await sequelize.sync({ alter: true });
  db.User =await require('../model/user.js')(sequelize);
};
dataBaseInialize();
module.exports = db;
