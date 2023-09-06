"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Servicio extends Model {}
  Servicio.init(
    {
      nombre: { type: DataTypes.STRING, allowNull: false, unique: true },
      descripcion: { type: DataTypes.STRING, allowNull: false, unique: false },
    },
    {
      sequelize,
      modelName: "Servicio",
      tableName: "servicio",
      timestamps: false,
    }
  );
  return Servicio;
};
