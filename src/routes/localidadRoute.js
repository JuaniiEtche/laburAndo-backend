const express = require("express");
const localidadController = require("../controllers/localidadController");
const localidadRouter = express.Router();

localidadRouter.get(
  "/localidadesxprovincia",
  localidadController.traerLocalidadesPorProvincia
);

module.exports = localidadRouter;
