// Define las rutas relacionadas con las publicaciones
const express = require("express");
const publicacionController = require("../controllers/publicacionController.js");
const publicacionRouter = express.Router();
const Jwt = require("../models/Jwt.js");

// Ruta para crear una nueva publicación con manejo de errores
publicacionRouter.post(
  "/publicacion",
  Jwt.verificarToken,
  async (req, res, next) => {
    await publicacionController.altaPublicacion(req, res, next);
  }
);

// Ruta para obtener todas las publicaciones con manejo de errores
publicacionRouter.get(
  "/publicacion",
  Jwt.verificarToken,
  async (req, res, next) => {
    await publicacionController.traerPublicaciones(req, res, next);
  }
);

module.exports = publicacionRouter;
