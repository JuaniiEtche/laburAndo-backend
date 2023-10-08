const DataTypes = require("sequelize");
const { sequelize: sequelize } = require("../db/db.js");
const bcrypt = require("bcrypt");
const Persona = sequelize.define(
  "persona",
  {
    nombre: { type: DataTypes.STRING, allowNull: false, unique: false },
    apellido: { type: DataTypes.STRING, allowNull: false, unique: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    telefono: { type: DataTypes.STRING, allowNull: false, unique: true },
    usuario: { type: DataTypes.STRING, allowNull: false, unique: true },
    clave: { type: DataTypes.STRING, allowNull: false, unique: false },
    descripcion: { type: DataTypes.TEXT, allowNull: true },
    imagenAdjunta: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    idLocalidad: { type: DataTypes.INTEGER, allowNull: false, unique: false },
  },
  { modelName: "Persona", tableName: "persona", timestamps: false }
);

Persona.beforeCreate(async (persona) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(persona.clave, saltRounds);
  persona.clave = hashedPassword;
  const imagenBinaria = Buffer.from(persona.imagenAdjunta, "base64");
  persona.imagenAdjunta = imagenBinaria;
});
module.exports = Persona;
