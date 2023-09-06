"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Persona extends Model {}

  Persona.init(
    {
      nombre: { type: DataTypes.STRING, allowNull: false, unique: false },
      apellido: { type: DataTypes.STRING, allowNull: false, unique: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      telefono: { type: DataTypes.STRING, allowNull: false, unique: false },
      usuario: { type: DataTypes.STRING, allowNull: false, unique: true },
      clave: { type: DataTypes.STRING, allowNull: false, unique: false },
    },
    {
      sequelize,
      modelName: "Persona",
      tableName: "persona",
      timestamps: false,
    }
  );

  return Persona;
};
