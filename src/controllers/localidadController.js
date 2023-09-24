// Importa los modelos de Localidad y Provincia
const Localidad = require("../models/Localidad");
const Provincia = require("../models/Provincia");

class localidadController {
  // Función asincrónica para traer localidades por provincia
  async traerLocalidadesPorProvincia(req, res, next) {
    try {
      const { nombreProvincia } = req.body;

      // Busca la provincia por nombre en la base de datos
      const provincia = await Provincia.findOne({
        where: { nombre: nombreProvincia },
      });

      // Si la provincia no se encuentra, regresa sin hacer nada
      if (!provincia) {
        return;
      }

      // Busca las localidades relacionadas a la provincia y las devuelve
      const localidades = await Localidad.findAll({
        where: { idProvincia: provincia.id },
      });

      res.status(200).json({
        Mensaje: "Localidades de la provincia traídas con éxito",
        localidades: localidades, // Incluye localidades en la respuesta JSON
      });
    } catch (error) {
      next(error); // Lanzar el error para que se maneje en el middleware de manejo de errores
    }
  }
}

module.exports = new localidadController();
