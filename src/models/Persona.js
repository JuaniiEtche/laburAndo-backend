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

Persona.prototype.getCalificacionGeneral = async function () {
  const Resena = require("../models/Resena.js");
  const reseniasAsociadas = await Resena.findAll({
    where: {
      idCalificado: this.id,
      estado: "aceptado",
    },
  });

  if (reseniasAsociadas.length === 0) {
    return 0;
  }

  const totalCalificacion = reseniasAsociadas.reduce(
    (total, resena) => total + resena.calificacion,
    0
  );
  const calificacionPromedio = Math.floor(
    totalCalificacion / reseniasAsociadas.length
  );

  return calificacionPromedio;
};

Persona.beforeCreate(async (persona) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(persona.clave, saltRounds);
  persona.clave = hashedPassword;
  if (persona.imagenAdjunta != null) {
    const imagenBinaria = Buffer.from(persona.imagenAdjunta, "base64");
    persona.imagenAdjunta = imagenBinaria;
  }
});
module.exports = Persona;
