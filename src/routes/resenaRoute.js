// Define las rutas relacionadas con los servicios
const express = require("express");
const resenaController = require("../controllers/resenaController");
const Jwt = require("../models/Jwt.js");
const resenaRoute = express.Router();

// Ruta para obtener todos los servicios con manejo de errores
resenaRoute.get("/resenas/:idPersona", async (req, res, next) => {
  await resenaController.obtenerResenas(req, res, next);
});

module.exports = resenaRoute;
