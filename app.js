const express = require("express");
const morgan = require("morgan");
const Sequelize = require("sequelize");
const app = express();
const port = 3000;
app.use(morgan("dev"));

// Carga la configuración desde config.json
const env = process.env.NODE_ENV || "development";
const config = require("./config/config.json")[env];

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
const PersonaModel = require("./models/Persona");

// Define los modelos en Sequelize
const Persona = PersonaModel(sequelize, Sequelize.DataTypes);

// Sincroniza los modelos con la base de datos
sequelize
  .sync({ force: false })
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
