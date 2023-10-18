const DataTypes = require("sequelize");
const { sequelize: sequelize } = require("../db/db.js");
const Resena = sequelize.define(
  "Resena",
  {
    calificacion: { type: DataTypes.INTEGER, allowNull: true, unique: false },
    descripcion: { type: DataTypes.STRING, allowNull: true, unique: false },
    idCalificador: { type: DataTypes.INTEGER, allowNull: false, unique: false },
    idCalificado: { type: DataTypes.INTEGER, allowNull: false, unique: false },
    fecha: { type: DataTypes.DATE, allowNull: true, unique: false },
    estado: {
      type: DataTypes.ENUM("pendiente", "aceptado"),
      allowNull: false,
      unique: false,
    },
  },
  {
    tableName: "resena",
    timestamps: false,
  }
);

module.exports = Resena;
