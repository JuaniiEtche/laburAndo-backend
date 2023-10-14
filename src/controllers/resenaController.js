// Importa el modelo de Provincia
const Persona = require("../models/Persona");
const Resena = require("../models/Resena");

class resenaController {
  async obtenerResenas(req, res, next) {
    try {
      const idPersona = req.params.idPersona;
      const existePersona = await this.ExistePersonaPorId(idPersona);

      if (!existePersona) {
        let e = new Error("No existe la persona asociada");
        e.statusCode = 404;
        throw e;
      }

      const usuario = await Persona.findByPk(idPersona, {
        include: [
          {
            model: Resena,
            as: "reseñasRecibidas",
            attributes: ["calificacion", "descripcion", "fecha"],
          },
        ],
      });

      res.json(usuario);
    } catch (error) {
      next(error);
    }
  }

  async ExistePersonaPorId(idPersona) {
    try {
      const Persona2 = await Persona.findByPk(idPersona);
      if (Persona2 != null) {
        return true;
      }
      return false;
    } catch (e) {
      e.message = "No existe la persona asociada";
      e.statusCode = 404;
      throw e;
    }
  }
}

module.exports = new resenaController();
