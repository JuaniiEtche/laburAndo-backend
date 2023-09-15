const Servicio = require("../models/Servicio");

class servicioController {
  async traerServicios(req, res) {
    try {
      const servicios = await Servicio.findAll();

      res.status(200).json({
        Mensaje: "Servicios traídas con éxito",
        Exito: true,
        servicios: servicios,
      });
    } catch (error) {
      res.status(500).json({
        Mensaje: "No se pudieron traer los servicios",
        Exito: false,
      });
    }
  }
}

module.exports = new servicioController();
