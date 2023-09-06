"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Localidad extends Model {}
  Localidad.init(
    {
      nombre: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
      sequelize,
      modelName: "Localidad",
    }
  );
  return Localidad;
};
