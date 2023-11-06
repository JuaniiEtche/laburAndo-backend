// Importa el modelo de Provincia
const Persona = require("../models/Persona");
const Publicacion = require("../models/Publicacion");
const Resena = require("../models/Resena");
const SolicitudTrabajo = require("../models/SolicitudTrabajo");

class resenaController {
 
    async desvincular(req, res, next) {
        try {
            const idPersona = req.params.idPersona;
            const idPublicacion = req.params.idPublicacion;

            if (!(await this.existePublicacion(idPublicacion))) {
            let e = new Error(`No se encontro la publicacion asociada`);
            e.statusCode = 409;
            throw e;
          }
          
          if (!(await this.ExistePersonaPorId(idPersona))) {
            let e = new Error(`No se encontro la persona asociada`);
            e.statusCode = 409;
            throw e;
          }

          const solicitudTrabajo = await SolicitudTrabajo.findOne({
            where: { idSolicitador: idPersona,idPublicacion:idPublicacion },
          })
          
          if (solicitudTrabajo == null) {
            let e = new Error(`No se encontro la solicitud de trabajo asociada`);
            e.statusCode = 404;
            throw e;
          }
          await SolicitudTrabajo.destroy({
            where: {
              id: solicitudTrabajo.id,
            },
          });
          res.status(201).json({
            Mensaje: "Solicitud de tabajo eliminada con exito",
          });
        } catch (error) {
          next(error);
        }
      }

  async existePublicacion(idPublicacion) {
    try {
      const publicacion = await Publicacion.findByPk(idPublicacion);
      if (publicacion != null) {
        return true;
      }
      return false;
    } catch (e) {
      e.message = "No existe la publicacion asociada";
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
