"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Publicacion extends Model {}

  Publicacion.init(
    {
      descripcion: { type: DataTypes.STRING, allowNull: false, unique: false },
      duracionDias: { type: DataTypes.INTEGER, allowNull: true, unique: false },
      fechaPublicacion: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: false,
      },
      titulo: { type: DataTypes.STRING, allowNull: false, unique: false },
    },
    {
      sequelize,
      modelName: "Publicacion",
      tableName: "publicacion",
      timestamps: false,
    }
  );

  return Publicacion;
};
