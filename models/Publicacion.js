"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Publicacion extends Model {
    static associate(models) {}
  }
  Publicacion.init(
    {
      descripcion: DataTypes.STRING,
      duracionDias: DataTypes.INTEGER,
      fechaPublicacion: DataTypes.DATE,
      titulo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Publicacion",
    }
  );
  return Publicacion;
};
