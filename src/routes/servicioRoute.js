// Define las rutas relacionadas con los servicios
const express = require("express");
const servicioController = require("../controllers/servicioController.js");
const servicioRouter = express.Router();

// Ruta para obtener todos los servicios con manejo de errores
servicioRouter.get("/servicio", async (req, res, next) => {
  try {
    let servicios = await servicioController.traerServicios();
    res.status(200).json({
      Mensaje: "Servicios traídos con éxito",
      Exito: true,
      servicios: servicios,
    });
  } catch (error) {
    next(error); // Delega el manejo del error al middleware de manejo de errores global
  }
});

module.exports = servicioRouter;
