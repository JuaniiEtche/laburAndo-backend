// associations.js
const DataTypes = require("sequelize");
const Localidad = require("./Localidad");
const Persona = require("./Persona");
const Provincia = require("./Provincia");
const Publicacion = require("./Publicacion");
const Servicio = require("./Servicio");

module.exports = () => {
  // Define las asociaciones entre modelos
  // Asociaciones de Persona
  Persona.hasMany(Publicacion, {
    foreignKey: "idPersona",
    as: "publicaciones",
  });

  Persona.belongsTo(Localidad, {
    foreignKey: "idLocalidad",
    as: "localidad",
  });

  // Asociaciones de Localidad
  Localidad.belongsTo(Provincia, {
    foreignKey: "idProvincia",
    as: "provincia",
  });
  Localidad.hasMany(Persona, {
    foreignKey: "idLocalidad",
    as: "personas",
  });
  Localidad.hasMany(Publicacion, {
    foreignKey: "idLocalidad",
    as: "publicaciones",
  });

  // Asociaciones de Provincia
  Provincia.hasMany(Localidad, {
    foreignKey: "idProvincia",
    as: "localidades",
  });

  // Asociaciones de Publicacion
  Publicacion.belongsTo(Localidad, {
    foreignKey: "idLocalidad",
    as: "localidad",
  });
  Publicacion.belongsTo(Servicio, {
    foreignKey: "idServicio",
    as: "servicio",
  });
  Publicacion.belongsTo(Persona, {
    foreignKey: "idPersona",
    as: "persona",
  });

  // Asociaciones de Servicio
  Servicio.hasMany(Publicacion, {
    foreignKey: "idServicio",
    as: "publicaciones",
  });
};
