// Importa el modelo de Provincia
const Provincia = require("../models/Provincia");

class provinciaController {
  // Función asincrónica para traer todas las provincias
  async traerProvincias(req, res, next) {
    try {
      // Busca y devuelve todas las provincias en la base de datos
      let provincias = await Provincia.findAll();
      res.status(200).json({
        Mensaje: "Provincias traídas con éxito",
        provincias: provincias,
      });
    } catch (error) {
      next(error); // Lanzar el error para que se maneje en el middleware de manejo de errores
    }
  }
}

module.exports = new provinciaController();
