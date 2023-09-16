// Define las rutas relacionadas con las personas
const express = require("express");
const personaController = require("../controllers/personaController.js");
const personaRouter = express.Router();

// Ruta para crear una nueva persona con manejo de errores
personaRouter.post("/usuario", async (req, res, next) => {
  try {
    await personaController.altaPersona(req.body);
    res.status(201).json({
      Mensaje: "Persona creada con éxito",
      Exito: true,
    });
  } catch (error) {
    next(error); // Delega el manejo del error al middleware de manejo de errores global
  }
});

module.exports = personaRouter;
