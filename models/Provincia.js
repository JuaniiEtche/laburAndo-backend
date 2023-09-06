"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Provincia extends Model {}

  Provincia.init(
    {
      nombre: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
      sequelize,
      modelName: "Provincia",
      tableName: "provincia",
      timestamps: false,
    }
  );

  return Provincia;
};
