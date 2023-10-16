const DataTypes = require("sequelize");
const { sequelize: sequelize } = require("../db/db.js");
const ServicioXPersona = sequelize.define(
  "ServicioXPersona",
  {
    idPersona: { type: DataTypes.INTEGER, allowNull: false, unique: false },
    idServicio: { type: DataTypes.INTEGER, allowNull: false, unique: false },
  },
  {
    tableName: "servicioxpersona",
    timestamps: false,
  }
);

module.exports = ServicioXPersona;
