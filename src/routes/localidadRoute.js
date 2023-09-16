// Define las rutas para las operaciones relacionadas con localidades
const express = require("express");
const localidadController = require("../controllers/localidadController");
const localidadRouter = express.Router();

localidadRouter.get("/localidadesxprovincia", async (req, res, next) => {
  try {
    // Llama a la función del controlador para obtener localidades por provincia
    let localidades = await localidadController.traerLocalidadesPorProvincia(
      req
    );
    res.status(200).json({
      Mensaje: "Localidades de la provincia traídas con éxito",
      Exito: true,
      localidades: localidades, // Incluye localidades en la respuesta JSON
    });
  } catch (error) {
    next(error); // Delega el manejo del error al middleware de manejo de errores global
  }
});

module.exports = localidadRouter;
