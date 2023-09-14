const Localidad = require("../models/Localidad");
const Provincia = require("../models/Provincia");

class localidadController {
  async traerLocalidadesPorProvincia(req, res) {
    try {
      const { nombreProvincia } = req.body;

      const provincia = await Provincia.findOne({
        where: { nombre: nombreProvincia },
      });

      if (!provincia) {
        return res.status(404).json({
          Mensaje: "Provincia no encontrada",
          Exito: false,
        });
      }

      const localidades = await Localidad.findAll({
        where: { idProvincia: provincia.id },
      });

      res.status(200).json({
        Mensaje: "Localidades de la provincia traidas con éxito",
        Exito: true,
        localidades: localidades,
      });
    } catch (error) {
      res.status(500).json({
        Mensaje: "No se pudieron traer las localidades",
        Exito: false,
      });
    }
  }
}

module.exports = new localidadController();
