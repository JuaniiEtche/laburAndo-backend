// associations.js
const DataTypes = require("sequelize");
const Localidad = require("./Localidad");
const Persona = require("./Persona");
const Provincia = require("./Provincia");
const Publicacion = require("./Publicacion");
const Servicio = require("./Servicio");
const Resena = require("./Resena");
const SolicitudTrabajo = require("./SolicitudTrabajo");
const ServicioXPersona = require("./ServicioXPersona");

module.exports = () => {
  // Define las asociaciones entre modelos
  // Asociaciones de Persona

  // Definición de relaciones
  Persona.belongsToMany(Servicio, {
    through: ServicioXPersona,
    as: "servicios",
    foreignKey: "idPersona",
    otherKey: "idServicio",
  });

  Persona.hasMany(Publicacion, {
    foreignKey: "idPersona",
    as: "publicaciones",
  });

  Persona.belongsTo(Localidad, {
    foreignKey: "idLocalidad",
    as: "localidad",
  });

  Persona.hasMany(Resena, {
    foreignKey: "idCalificador",
    as: "reseñasDadas",
  });

  Persona.hasMany(Resena, {
    foreignKey: "idCalificado",
    as: "reseñasRecibidas",
  });

  Persona.belongsToMany(Publicacion, {
    through: SolicitudTrabajo,
    foreignKey: "idSolicitador",
    as: "solicitudes",
    otherKey: "idPublicacion",
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
  Publicacion.belongsToMany(Persona, {
    through: SolicitudTrabajo,
    foreignKey: "idPublicacion",
    as: "solicitudes",
    otherKey: "idSolicitador",
  });

  // Asociaciones de Servicio
  Servicio.belongsToMany(Persona, {
    through: ServicioXPersona,
    as: "personas",
    foreignKey: "idServicio",
    otherKey: "idPersona",
  });

  Servicio.hasMany(Publicacion, {
    foreignKey: "idServicio",
    as: "publicaciones",
  });

  // Asociaciones de Resena
  Resena.belongsTo(Persona, {
    foreignKey: "idCalificador",
    as: "calificador",
  });

  Resena.belongsTo(Persona, {
    foreignKey: "idCalificado",
    as: "calificado",
  });
};
