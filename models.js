module.exports = (sequelize) => {
  // Se importan los modelos y rutas
  const PersonaModel = require("./src/models/Persona");
  const LocalidadModel = require("./src/models/Localidad");
  const ProvinciaModel = require("./src/models/Provincia");
  const Publicacion = require("./src/models/Publicacion");
  const Servicio = require("./src/models/Servicio");

  const personaRouter = require("./src/routes/personaRoute");
  const publicacionRouter = require("./src/routes/publicacionRoute");
  const provinciaRouter = require("./src/routes/provinciaRoute");
  const localidadRouter = require("./src/routes/localidadRoute");
  const servicioRouter = require("./src/routes/servicioRoute");

  // Se configuran las asociaciones entre los modelos
  require("./src/models/associations")(sequelize);

  // Sincroniza los modelos con la base de datos (Se utiliza en esta etapa para mapear los modelos en tablas)
  sequelize
    .sync({ force: false })
    .then(() => {
      console.log("Modelos sincronizados con la base de datos");
    })
    .catch((err) => {
      console.error("Error al sincronizar modelos:", err);
    });
};
