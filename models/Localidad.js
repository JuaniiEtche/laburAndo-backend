"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Localidad extends Model {
    static associate(models) {}
  }
  Localidad.init(
    {
      nombre: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Localidad",
    }
  );
  return Localidad;
};
