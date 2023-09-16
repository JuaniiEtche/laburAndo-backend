// Define las rutas relacionadas con las publicaciones
const express = require("express");
const publicacionController = require("../controllers/publicacionController.js");
const publicacionRouter = express.Router();
const Jwt = require("../models/Jwt.js");

/*
publicacionRouter.post(
  "/publicacion",
  Jwt.verificarToken,
  publicacionController.altaPublicacion
);*/
// Ruta para crear una nueva publicación con manejo de errores
publicacionRouter.post("/publicacion", async (req, res, next) => {
  try {
    const publicacionData = req.body;
    await publicacionController.altaPublicacion(publicacionData);
    res.status(201).json({
      Mensaje: "Publicación creada con éxito",
      Exito: true,
    });
  } catch (error) {
    next(error); // Delega el manejo del error al middleware de manejo de errores global
  }
});

// Ruta para obtener todas las publicaciones con manejo de errores
publicacionRouter.get("/publicacion", async (req, res, next) => {
  try {
    let publicaciones = await publicacionController.traerPublicaciones();
    res.status(200).json({
      Mensaje: "Publicaciones traídas con éxito",
      Exito: true,
      publicaciones: publicaciones,
    });
  } catch (error) {
    next(error); // Delega el manejo del error al middleware de manejo de errores global
  }
});

module.exports = publicacionRouter;
