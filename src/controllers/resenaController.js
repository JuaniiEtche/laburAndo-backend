// Importa el modelo de Provincia
const Persona = require("../models/Persona");
const Publicacion = require("../models/Publicacion");
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

  async altaResenia(req, res, next) {
    try {
      const ReseniaData = req.body;
      const clavesNecesarias = [
        "calificacion",
        "descripcion",
        "fecha",
        "idCalificador",
        "idCalificado",
      ];
      clavesNecesarias.forEach((element) => {
        if (!ReseniaData.hasOwnProperty(element)) {
          let e = new Error(
            `Debe proporcionarse el atributo '${element}' en la solicitud`
          );
          e.statusCode = 400;
          throw e;
        }
      });

      if (ReseniaData.idCalificado == ReseniaData.idCalificador) {
        let e = new Error(
          `Un mismo usuario no puede dar de alta una resenia de si mismo`
        );
        e.statusCode = 409;
        throw e;
      }
      const personaCalificadora = await Persona.findByPk(
        ReseniaData.idCalificador
      );
      if (!personaCalificadora) {
        let e = new Error(`No se encontro la persona calificadora asociada `);
        e.statusCode = 409;
        throw e;
      }
      const personaCalificada = await Persona.findByPk(
        ReseniaData.idCalificado
      );
      if (!personaCalificada) {
        let e = new Error(`No se encontro la persona a la que se la califica `);
        e.statusCode = 409;
        throw e;
      }

      await Resena.create(ReseniaData);
      res.status(201).json({
        Mensaje: "Resenia creada con exito",
      });
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
