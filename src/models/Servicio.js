const DataTypes = require("sequelize");
const { sequelize: sequelize } = require("../db/db.js");
const Servicio = sequelize.define(
  "Servicio",
  {
    nombre: { type: DataTypes.STRING, allowNull: false, unique: true },
    descripcion: { type: DataTypes.STRING, allowNull: false, unique: false },
  },
  {
    tableName: "servicio",
    timestamps: false,
  }
);

module.exports = Servicio;
