// Importa el modelo de Provincia
const Persona = require("../models/Persona");
const Publicacion = require("../models/Publicacion");
const Resena = require("../models/Resena");
const Servicio = require("../models/Servicio");

class resenaController {
  async obtenerResenasAceptadasPorCalificado(idCalificado, res, next) {
    try {
      const existePersona = await this.ExistePersonaPorId(idCalificado);
      if (!existePersona) {
        let e = new Error("No existe la persona calificadora asociada");
        e.statusCode = 404;
        throw e;
      }
      const resenias = await Resena.findAll({
        where: { idCalificado: idCalificado, estado: "aceptado" },
        include: [
          {
            model: Persona,
            as: "calificador",
            attributes: ["id", "nombre", "apellido"],
          },
        ],
        attributes: ["id", "descripcion", "fecha", "calificacion"],
        order: [["id", "DESC"]],
      });

      res.send(resenias);
    } catch (error) {
      next(error);
    }
  }

  async obtenerResenasPendientesPorCalificador(idCalificador, res, next) {
    try {
      const existePersona = await this.ExistePersonaPorId(idCalificador);
      if (!existePersona) {
        let e = new Error("No existe la persona calificadora asociada");
        e.statusCode = 404;
        throw e;
      }
      const resenias = await Resena.findAll({
        where: { idCalificador: idCalificador, estado: "pendiente" },
        include: [
          {
            model: Persona,
            as: "calificado",
            attributes: ["id", "nombre", "apellido", "telefono"],
            include: [
              {
                model: Servicio,
                as: "servicios",
                attributes: ["nombre"],
                through: { attributes: [] },
              },
            ],
          },
        ],
        attributes: ["id"],
        order: [["id", "DESC"]],
      });

      res.send(resenias);
    } catch (error) {
      next(error);
    }
  }

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
        order: [["id", "DESC"]],
      });

      res.json(usuario);
    } catch (error) {
      next(error);
    }
  }

  async eliminarResenia(req, res, next) {
    try {
      const id = req.params.id;
      if (!(await this.existeResenia(id))) {
        let e = new Error(`No se encontro la resenia asociada`);
        e.statusCode = 409;
        throw e;
      }
      await Resena.destroy({
        where: {
          id: id,
        },
      });
      res.status(201).json({
        Mensaje: "Resenia eliminada con exito",
      });
    } catch (error) {
      next(error);
    }
  }

  async aceptarResenia(req, res, next) {
    try {
      const ReseniaData = req.body;
      const clavesNecesarias = ["id", "calificacion", "fecha", "descripcion"];
      clavesNecesarias.forEach((element) => {
        if (!ReseniaData.hasOwnProperty(element)) {
          let e = new Error(
            `Debe proporcionarse el atributo '${element}' en la solicitud`
          );
          e.statusCode = 400;
          throw e;
        }
      });
      if (!(await this.existeResenia(ReseniaData.id))) {
        let e = new Error(`No se encontro la resenia asociada`);
        e.statusCode = 409;
        throw e;
      }
      await Resena.update(
        {
          descripcion: ReseniaData.descripcion,
          calificacion: ReseniaData.calificacion,
          fecha: ReseniaData.fecha,
          estado: "aceptado",
        },
        {
          where: {
            id: ReseniaData.id,
          },
        }
      );
      res.status(201).json({
        Mensaje: "Resenia aceptada con exito",
      });
    } catch (error) {
      next(error);
    }
  }

  async altaResenia(req, res, next) {
    try {
      const ReseniaData = req.body;
      const clavesNecesarias = ["idCalificador", "idCalificado"];
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
      ReseniaData.estado = "pendiente";
      await Resena.create(ReseniaData);
      res.status(201).json({
        Mensaje: "Resenia creada con exito",
      });
    } catch (error) {
      next(error);
    }
  }

  async existeResenia(idResenia) {
    try {
      const resenia = await Resena.findByPk(idResenia);
      if (resenia != null) {
        return true;
      }
      return false;
    } catch (e) {
      e.message = "No existe la resenia asociada";
      e.statusCode = 404;
      throw e;
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
