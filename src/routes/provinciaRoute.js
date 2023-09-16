// Define las rutas relacionadas con las provincias
const express = require("express");
const provinciaController = require("../controllers/provinciaController.js");
const provinciaRouter = express.Router();

// Ruta para obtener todas las provincias con manejo de errores
provinciaRouter.get("/provincia", async (req, res, next) => {
  try {
    let provincias = await provinciaController.traerProvincias();
    res.status(200).json({
      Mensaje: "Provincias traídas con éxito",
      Exito: true,
      provincias: provincias,
    });
  } catch (error) {
    next(error); // Delega el manejo del error al middleware de manejo de errores global
  }
});

module.exports = provinciaRouter;
