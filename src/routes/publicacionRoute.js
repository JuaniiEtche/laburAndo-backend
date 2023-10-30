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

// Ruta para obtener una publicacion
publicacionRouter.get(
  "/publicacion/:id",
  Jwt.verificarToken,
  async (req, res, next) => {
    await publicacionController.obtenerPublicacion(req, res, next);
  }
);

// Ruta para obtener una publicacion por localidad
publicacionRouter.get(
  "/publicacion/localidad/:idLocalidad",
  Jwt.verificarToken,
  async (req, res, next) => {
    await publicacionController.buscarPorLocalidad(req, res, next);
  }
);

// Ruta para obtener una publicacion por servicio
publicacionRouter.get(
  "/publicacion/servicio/:idServicio",
  Jwt.verificarToken,
  async (req, res, next) => {
    await publicacionController.buscarPorServicio(req, res, next);
  }
);

// Ruta para obtener una publicacion por usuario
publicacionRouter.get(
  "/publicacion/usuario/:idUsuario",
  Jwt.verificarToken,
  async (req, res, next) => {
    await publicacionController.buscarPorUsuario(req, res, next);
  }
);

// Ruta para obtener una publicacion por servicio y localidad
publicacionRouter.get(
  "/publicacion/servicio-y-localidad/:idServicio/:idLocalidad",
  Jwt.verificarToken,
  async (req, res, next) => {
    await publicacionController.buscarPorServicioYLocalidad(req, res, next);
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

publicacionRouter.delete(
  "/publicacion/:idPublicacion",
  Jwt.verificarToken,
  async (req, res, next) => {
    await publicacionController.eliminarPublicacion(req, res, next);
  }
);

module.exports = publicacionRouter;
