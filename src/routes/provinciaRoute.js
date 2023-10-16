// Define las rutas relacionadas con las provincias
const express = require("express");
const provinciaController = require("../controllers/provinciaController.js");
const Jwt = require("../models/Jwt.js");
const provinciaRouter = express.Router();

// Ruta para obtener todas las provincias con manejo de errores
provinciaRouter.get("/provincia", async (req, res, next) => {
  await provinciaController.traerProvincias(req, res, next);
});

module.exports = provinciaRouter;
