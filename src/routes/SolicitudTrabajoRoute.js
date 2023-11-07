// Define las rutas relacionadas con los servicios
const express = require("express");
const SolicitudTrabajoController = require("../controllers/SolicitudTrabajoController");
const Jwt = require("../models/Jwt.js");
const SolicitudTrabajoRoute = express.Router();

// Ruta para obtener todos los servicios con manejo de errores
SolicitudTrabajoRoute.delete("/SolicitudTrabajo/:idPersona/:idPublicacion",Jwt.verificarToken, async (req, res, next) => {
  await SolicitudTrabajoController.desvincular(req, res, next);
});

SolicitudTrabajoRoute.post("/SolicitudTrabajo/:idPersona/:idPublicacion",Jwt.verificarToken, async (req, res, next) => {
    await SolicitudTrabajoController.vincular(req, res, next);
  });

module.exports = SolicitudTrabajoRoute;
