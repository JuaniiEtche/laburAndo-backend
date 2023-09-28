const { Sequelize } = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];

let sequelize;

if (env === "test") {
  // En entorno de desarrollo, usar SQLite
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite", // Nombre del archivo SQLite
  });
} else {
  // En otros entornos, usar MySQL con la configuración del archivo config.json
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
  });
}

module.exports = {
  sequelize,
};
