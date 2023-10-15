// Define las rutas relacionadas con los servicios
const express = require("express");
const ServicioXPersonaController = require("../controllers/servicioXPersonaController");
const Jwt = require("../models/Jwt.js");
const ServicioXPersonaRoute = express.Router();

// Ruta para obtener todos los servicios con manejo de errores
ServicioXPersonaRoute.get("/servicioxpersona", async (req, res, next) => {
  await ServicioXPersonaController.altaServicioXPersona(req, res, next);
});

module.exports = ServicioXPersonaRoute;
