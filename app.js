const express = require("express");
const morgan = require("morgan");
const { sequelize } = require("./src/db/db");
// Se traen los modelos para mapearlos en tablas
const PersonaModel = require("./src/models/Persona");
const localidadModel = require("./src/models/Localidad");
const proviciaModel = require("./src/models/Provincia");
const Publicacion = require("./src/models/Publicacion");
const Servicio = require("./src/models/Servicio");
// Se traen las rutas para gestionar los distintos recursos
const personaRouter = require("./src/routes/personaRoute");
const publicacionRouter = require("./src/routes/publicacionRoute");
const provinciaRouter = require("./src/routes/provinciaRoute");
const localidadRouter = require("./src/routes/localidadRoute");
const bodyParser = require("body-parser");

// Se crea la instancia de aplicacion express y se determina el puerto en el que va a escuchar el servidor
const app = express();
const port = 3000;

// Se configuran  las asociaciones entre los modelos
require("./src/models/associations")(sequelize);

//Configuraciones propias de la instancia de la aplicacion express
app.use(morgan("dev"));

// Configura body-parser antes de definir las rutas
app.use(bodyParser.json());

// Sincroniza los modelos con la base de datos (Se utiliza en esta etapa para mapear los modelos en tablas)
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Modelos sincronizados con la base de datos");
  })
  .catch((err) => {
    console.error("Error al sincronizar modelos:", err);
  });

app.use("/api", personaRouter);
app.use("/api", provinciaRouter);
app.use("/api", publicacionRouter);
app.use("/api", localidadRouter);

app.listen(port, () => {
  console.log(`La aplicación está escuchando en el puerto ${port}`);
});
