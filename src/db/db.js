const { Sequelize } = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];

// Configura la conexión a la base de datos MySQL
const sequelize = new Sequelize("laburAndo", config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

module.exports = {
  sequelize,
};
