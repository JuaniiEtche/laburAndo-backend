"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Persona extends Model {
    static associate(models) {}
  }
  Persona.init(
    {
      nombre: DataTypes.STRING,
      apellido: DataTypes.STRING,
      email: DataTypes.STRING,
      telefono: DataTypes.INTEGER,
      usuario: DataTypes.STRING,
      clave: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Persona",
    }
  );
  return Persona;
};
