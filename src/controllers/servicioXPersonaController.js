const Persona = require("../models/Persona");
const Servicio = require("../models/Servicio");
const ServicioXPersona = require("../models/ServicioXPersona");

class servicioXPersonaController {
  async altaServicioXPersona(req, res, next) {
    try {
      const servicioxPersonaData = req.body;

      const persona = await Persona.findByPk(servicioxPersonaData.idPersona);

      if (persona == null) {
        return res.status(404).json({ message: "Persona no encontrada" });
      }

      const servicio = await Servicio.findByPk(servicioxPersonaData.idServicio);

      if (servicio == null) {
        return res.status(404).json({ message: "Servicio no encontrada" });
      }

      await ServicioXPersona.create(servicioxPersonaData);
      res.status(201).json({
        Mensaje: "servicio x persona creado con éxito",
        Exito: true,
      });
    } catch (error) {
      next(error); // Lanzar el error para que se maneje en el middleware de manejo de errores
    }
  }
}
module.exports = new servicioXPersonaController();
