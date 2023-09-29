// Define las rutas para las operaciones relacionadas con localidades
const express = require("express");
const localidadController = require("../controllers/localidadController");
const Jwt = require("../models/Jwt");
const localidadRouter = express.Router();

localidadRouter.get(
  "/localidadesxprovincia/:nombre",
  Jwt.verificarToken,
  async (req, res, next) => {
    // Llama a la función del controlador para obtener localidades por provincia
    await localidadController.traerLocalidadesPorProvincia(req, res, next);
  }
);

module.exports = localidadRouter;
