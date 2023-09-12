const DataTypes = require("sequelize");
const { sequelize: sequelize } = require("../db/db.js");
const Localidad = sequelize.define(
  "Localidad",
  {
    nombre: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    tableName: "localidad",
    timestamps: false,
  }
);

module.exports = Localidad;
