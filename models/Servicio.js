"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Servicio extends Model {
    static associate(models) {}
  }
  Servicio.init(
    {
      nombre: DataTypes.STRING,
      descripcion: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Servicio",
    }
  );
  return Servicio;
};
