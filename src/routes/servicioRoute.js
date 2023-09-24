// Define las rutas relacionadas con los servicios
const express = require("express");
const servicioController = require("../controllers/servicioController.js");
const Jwt = require("../models/Jwt.js");
const servicioRouter = express.Router();

// Ruta para obtener todos los servicios con manejo de errores
servicioRouter.get("/servicio", Jwt.verificarToken, async (req, res, next) => {
  await servicioController.traerServicios(req, res, next);
});

module.exports = servicioRouter;
