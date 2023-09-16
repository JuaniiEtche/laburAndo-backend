// Define las rutas relacionadas con las personas
const express = require("express");
const personaController = require("../controllers/personaController.js");
const personaRouter = express.Router();

// Ruta para crear una nueva persona con manejo de errores
personaRouter.post("/usuario", async (req, res, next) => {
  await personaController.altaPersona(req, res, next);
});

module.exports = personaRouter;
