const DataTypes = require("sequelize");
const { sequelize: sequelize } = require("../db/db.js");
const Publicacion = sequelize.define(
  "Publicacion",
  {
    descripcion: { type: DataTypes.STRING, allowNull: false, unique: false },
    duracionDias: { type: DataTypes.INTEGER, allowNull: true, unique: false },
    fechaPublicacion: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: false,
    },
    titulo: { type: DataTypes.STRING, allowNull: false, unique: false },
    idPersona: { type: DataTypes.INTEGER, allowNull: false, unique: false },
    idLocalidad: { type: DataTypes.INTEGER, allowNull: false, unique: false },
    idServicio: { type: DataTypes.INTEGER, allowNull: false, unique: false },
  },
  {
    tableName: "publicacion",
    timestamps: false,
  }
);

module.exports = Publicacion;
