// Importa el modelo de Servicio
const Servicio = require("../models/Servicio");

class servicioController {
  // Función asincrónica para traer todos los servicios
  async traerServicios(req, res, next) {
    try {
      // Busca y devuelve todos los servicios en la base de datos
      let servicios = await Servicio.findAll();
      res.status(200).json({
        Mensaje: "Servicios traídos con éxito",
        servicios: servicios,
      });
    } catch (error) {
      next(error); // Lanzar el error para que se maneje en el middleware de manejo de errores
    }
  }
}

module.exports = new servicioController();
