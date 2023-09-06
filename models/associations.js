// Define las asociaciones entre modelos aquí
const Localidad = require("./Localidad.js");
const Persona = require("./Persona.js");
const Servicio = require("./Servicio.js");
const Provincia = require("./Provincia.js");
const Publicacion = require("./Publicacion.js");

module.exports = (sequelize) => {
  // Asociaciones de Persona
  Persona.hasMany(Localidad, { foreignKey: "personaId", as: "localidades" });
  Persona.hasMany(Publicacion, {
    foreignKey: "personaId",
    as: "publicaciones",
  });
  Persona.belongsTo(Localidad, { foreignKey: "localidadId", as: "localidad" });

  // Asociaciones de Localidad
  Localidad.belongsTo(Provincia, {
    foreignKey: "provinciaId",
    as: "provincia",
  });
  Localidad.hasMany(Persona, { foreignKey: "localidadId", as: "personas" });
  Localidad.hasMany(Publicacion, {
    foreignKey: "localidadId",
    as: "publicaciones",
  });

  // Asociaciones de Provincia
  Provincia.hasMany(Localidad, {
    foreignKey: "provinciaId",
    as: "localidades",
  });

  // Asociaciones de Publicacion
  Publicacion.belongsTo(Localidad, {
    foreignKey: "localidadId",
    as: "localidad",
  });
  Publicacion.belongsTo(Servicio, { foreignKey: "servicioId", as: "servicio" });
  Publicacion.belongsTo(Persona, { foreignKey: "personaId", as: "persona" });

  // Asociaciones de Servicio
  Servicio.hasMany(Publicacion, {
    foreignKey: "servicioId",
    as: "publicaciones",
  });
};
