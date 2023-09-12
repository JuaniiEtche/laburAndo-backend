const DataTypes = require("sequelize");
const { sequelize: sequelize } = require("../db/db.js");
const Persona = sequelize.define(
  "persona",
  {
    nombre: { type: DataTypes.STRING, allowNull: false, unique: false },
    apellido: { type: DataTypes.STRING, allowNull: false, unique: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    telefono: { type: DataTypes.STRING, allowNull: false, unique: true },
    usuario: { type: DataTypes.STRING, allowNull: false, unique: true },
    clave: { type: DataTypes.STRING, allowNull: false, unique: false },
    idLocalidad: { type: DataTypes.INTEGER, allowNull: false, unique: false },
  },
  { modelName: "Persona", tableName: "persona", timestamps: false }
);

module.exports = Persona;
