// associations.js
const { DataTypes } = require("sequelize");
const LocalidadModel = require("./Localidad");
const PersonaModel = require("./Persona");
const ProvinciaModel = require("./Provincia");
const PublicacionModel = require("./Publicacion");
const ServicioModel = require("./Servicio");

module.exports = (sequelize) => {
  // Importa los modelos
  const Localidad = LocalidadModel(sequelize, DataTypes);
  const Persona = PersonaModel(sequelize, DataTypes);
  const Provincia = ProvinciaModel(sequelize, DataTypes);
  const Publicacion = PublicacionModel(sequelize, DataTypes);
  const Servicio = ServicioModel(sequelize, DataTypes);

  // Define las asociaciones entre modelos
  // Asociaciones de Persona
  Persona.hasMany(Localidad, {
    foreignKey: "idPersona",
    as: "localidades",
  });
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
