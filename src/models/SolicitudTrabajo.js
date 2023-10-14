const DataTypes = require("sequelize");
const { sequelize: sequelize } = require("../db/db.js");
const SolicitudTrabajo = sequelize.define(
  "SolicitudTrabajo",
  {
    idSolicitador: { type: DataTypes.INTEGER, allowNull: false, unique: false },
    idPublicacion: { type: DataTypes.INTEGER, allowNull: false, unique: false },
  },
  {
    tableName: "solicitudtrabajo",
    timestamps: false,
  }
);

module.exports = SolicitudTrabajo;
