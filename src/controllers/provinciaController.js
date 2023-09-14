const Provincia = require("../models/Provincia");

class provinciaController {
  async traerProvincias(req, res) {
    try {
      const provincias = await Provincia.findAll();

      res.status(200).json({
        Mensaje: "Provincias traídas con éxito",
        Exito: true,
        provincias: provincias,
      });
    } catch (error) {
      res.status(500).json({
        Mensaje: "No se pudieron traer las provincias",
        Exito: false,
      });
    }
  }
}

module.exports = new provinciaController();
