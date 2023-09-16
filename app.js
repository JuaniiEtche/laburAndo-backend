const express = require("express");
const { sequelize } = require("./src/db/db");
const configApp = require("./src/config/configApp");
const errorHandler = require("./src/middlewares/errorHandler");
const notFoundHandler = require("./src/middlewares/notFoundHandler");
const routers = require("./routers.js");
const configureModels = require("./models");

const app = express();
const port = 3000;

// Configuración de la aplicación
configApp(app);

// Configura los modelos y asociaciones
configureModels(sequelize);

// Cargar rutas definidas en el archivo 'routes.js'
app.use("/api", routers);

// Middleware de manejo de errores global
app.use(errorHandler);

// Middleware para manejar rutas no encontradas
app.use(notFoundHandler);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`La aplicación está escuchando en el puerto ${port}`);
});
