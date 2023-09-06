const express = require("express");
const morgan = require("morgan");
const Sequelize = require("sequelize");
const app = express();
const port = 3000;
app.use(morgan("dev"));

// Carga la configuración desde config.json
const env = process.env.NODE_ENV || "development";
const config = require("./src/config/config.json")[env];

// Configura la conexión a la base de datos MySQL
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
);

// Importa los modelos Sequelize

const PersonaModel = require("./src/models/Persona");
const LocalidadModel = require("./src/models/Localidad");
const ProvinciaModel = require("./src/models/Provincia");
const PublicacionModel = require("./src/models/Publicacion");
const ServicioModel = require("./src/models/Servicio");

// Define los modelos en Sequelize
const Persona = PersonaModel(sequelize, Sequelize.DataTypes);
const Localidad = LocalidadModel(sequelize, Sequelize.DataTypes);
const Provincia = ProvinciaModel(sequelize, Sequelize.DataTypes);
const Publicacion = PublicacionModel(sequelize, Sequelize.DataTypes);
const Servicio = ServicioModel(sequelize, Sequelize.DataTypes);

// Configura las asociaciones
require("./src/models/associations")(sequelize);

// Sincroniza los modelos con la base de datos
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Modelos sincronizados con la base de datos");
  })
  .catch((err) => {
    console.error("Error al sincronizar modelos:", err);
  });

app.get("/", (req, res) => {});

const personaRouter = require("./src/routes/personaRoute");

app.use("/api", personaRouter);

app.listen(port, () => {
  console.log(`La aplicación está escuchando en el puerto ${port}`);
});
