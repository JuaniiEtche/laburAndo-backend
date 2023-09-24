const DataTypes = require("sequelize");
const { sequelize: sequelize } = require("../db/db.js");
const Provincia = sequelize.define(
  "Provincia",
  {
    nombre: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    tableName: "provincia",
    timestamps: false,
  }
);

module.exports = Provincia;
