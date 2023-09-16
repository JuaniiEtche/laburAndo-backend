// Importa el modelo de Servicio
const Servicio = require("../models/Servicio");

class servicioController {
  // Función asincrónica para traer todos los servicios
  async traerServicios() {
    try {
      // Busca y devuelve todos los servicios en la base de datos
      return await Servicio.findAll();
    } catch (error) {
      throw error; // Lanzar el error para que se maneje en el middleware de manejo de errores
    }
  }
}

module.exports = new servicioController();
