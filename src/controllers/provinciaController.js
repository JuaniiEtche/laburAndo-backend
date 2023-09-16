// Importa el modelo de Provincia
const Provincia = require("../models/Provincia");

class provinciaController {
  // Función asincrónica para traer todas las provincias
  async traerProvincias() {
    try {
      // Busca y devuelve todas las provincias en la base de datos
      return await Provincia.findAll();
    } catch (error) {
      throw error; // Lanzar el error para que se maneje en el middleware de manejo de errores
    }
  }
}

module.exports = new provinciaController();
