// Importa los modelos de Localidad, Persona, Publicacion y Servicio
const Localidad = require("../models/Localidad");
const Persona = require("../models/Persona");
const Publicacion = require("../models/Publicacion");
const Servicio = require("../models/Servicio");
const Provincia = require("../models/Provincia");
const Resena = require("../models/Resena");
const SolicitudTrabajo = require("../models/SolicitudTrabajo");
class publicacionController {
  //Funcion asincronica para obtener una publicacion

  async obtenerPostuladosPorPublicacion(idPublicacion, res, next) {
    try {
      const existePublicacion = await this.ExistePublicacionPorId(
        idPublicacion
      );
      if (!existePublicacion) {
        let e = new Error(`No existe la publicacion asociada`);
        e.statusCode = 404;
        throw e;
      }
      const publicacion = await Publicacion.findByPk(idPublicacion, {
        attributes: [],
        include: [
          {
            model: Persona,
            as: "solicitudes",
            attributes: {
              exclude: ["idLocalidad", "descripcion", "clave"],
            },
            through: { attributes: [] },
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
      });
      const arregloSolicitadores = [];

      for (let i = 0; i < publicacion.solicitudes.length; i++) {
        const solicitador = publicacion.solicitudes[i];
        const persona = await Persona.findByPk(solicitador.id);
        const calificacionPromedio = await persona.getCalificacionGeneral();
        solicitador.calificacionPromedio = calificacionPromedio;
        arregloSolicitadores.push(solicitador);
      }
      const arreglo = arregloSolicitadores.map((solicitador) => ({
        id: solicitador.id,
        nombre: solicitador.nombre,
        apellido: solicitador.apellido,
        email: solicitador.email,
        telefono: solicitador.telefono,
        usuario: solicitador.usuario,
        imagenAdjunta: solicitador.imagenAdjunta,
        servicios: solicitador.servicios,
        calificacionPromedio: solicitador.calificacionPromedio,
      }));

      res.status(200).json(arreglo);
    } catch (error) {
      next(error);
    }
  }

  async obtenerPublicacion(req, res, next) {
    try {
      const idPublicacion = req.params.id;
      const existePublicacion = await this.ExistePublicacionPorId(
        idPublicacion
      );
      if (!existePublicacion) {
        let e = new Error(`No existe la publicacion asociada`);
        e.statusCode = 404;
        throw e;
      }
      const publicacion = await Publicacion.findByPk(idPublicacion, {
        include: [
          {
            model: Localidad,
            as: "localidad",
            attributes: ["nombre"],
            include: [
              {
                model: Provincia,
                as: "provincia",
                attributes: ["nombre"],
              },
            ],
          },
          {
            model: Servicio,
            as: "servicio",
            attributes: ["nombre"],
          },
          {
            model: Persona,
            as: "persona",
            attributes: [
              "id",
              "usuario",
              "imagenAdjunta",
              "nombre",
              "telefono",
            ],
          },
        ],
        attributes: {
          exclude: [
            "idLocalidad",
            "idPersona",
            "idProvincia",
            "idServicio",
            "duracionDias",
          ],
        },
      });
      res.status(200).json({
        Mensaje: "Publicacion traida con éxito",
        publicacion: publicacion,
      });
    } catch (error) {
      next(error);
    }
  }

  // Método para buscar publicaciones por localidad
  async buscarPorLocalidad(req, res, next) {
    try {
      const idLocalidad = req.params.idLocalidad;
      const publicaciones = await Publicacion.findAll({
        where: { idLocalidad: idLocalidad },
        include: [
          {
            model: Localidad,
            as: "localidad",
            attributes: ["nombre"],
            include: [
              {
                model: Provincia,
                as: "provincia",
                attributes: ["nombre"],
              },
            ],
          },
          {
            model: Servicio,
            as: "servicio",
            attributes: ["nombre"],
          },
          {
            model: Persona,
            as: "persona",
            attributes: [
              "id",
              "usuario",
              "imagenAdjunta",
              "nombre",
              "telefono",
            ],
          },
        ],
        attributes: {
          exclude: [
            "idLocalidad",
            "idPersona",
            "idProvincia",
            "idServicio",
            "duracionDias",
          ],
        },
      });

      if (!publicaciones) {
        return res.status(404).json({
          message: "No se encontraron publicaciones en esta localidad",
        });
      }
      res.status(200).json({
        Mensaje: "Publicaciones encontradas con éxito",
        publicaciones: publicaciones,
      });
    } catch (error) {
      next(error);
    }
  }

  // Método para buscar publicaciones por servicio y localidad
  async buscarPorServicioYLocalidad(req, res, next) {
    try {
      const { idServicio, idLocalidad } = req.params;
      const publicaciones = await Publicacion.findAll({
        where: {
          idServicio: idServicio,
          idLocalidad: idLocalidad,
        },
        include: [
          {
            model: Localidad,
            as: "localidad",
            attributes: ["nombre"],
            include: [
              {
                model: Provincia,
                as: "provincia",
                attributes: ["nombre"],
              },
            ],
          },
          {
            model: Servicio,
            as: "servicio",
            attributes: ["nombre"],
          },
          {
            model: Persona,
            as: "persona",
            attributes: [
              "id",
              "usuario",
              "imagenAdjunta",
              "nombre",
              "telefono",
            ],
          },
        ],
        attributes: {
          exclude: [
            "idLocalidad",
            "idPersona",
            "idProvincia",
            "idServicio",
            "duracionDias",
          ],
        },
      });

      if (!publicaciones) {
        return res.status(404).json({
          message:
            "No se encontraron publicaciones para este servicio y localidad",
        });
      }
      res.status(200).json({
        Mensaje: "Publicaciones encontradas con éxito",
        publicaciones: publicaciones,
      });
    } catch (error) {
      next(error);
    }
  }

  // Método para buscar publicaciones por servicio
  async buscarPorServicio(req, res, next) {
    try {
      const idServicio = req.params.idServicio;
      const publicaciones = await Publicacion.findAll({
        where: { idServicio: idServicio },
        include: [
          {
            model: Localidad,
            as: "localidad",
            attributes: ["nombre"],
            include: [
              {
                model: Provincia,
                as: "provincia",
                attributes: ["nombre"],
              },
            ],
          },
          {
            model: Servicio,
            as: "servicio",
            attributes: ["nombre"],
          },
          {
            model: Persona,
            as: "persona",
            attributes: [
              "id",
              "usuario",
              "imagenAdjunta",
              "nombre",
              "telefono",
            ],
          },
        ],
        attributes: {
          exclude: [
            "idLocalidad",
            "idPersona",
            "idProvincia",
            "idServicio",
            "duracionDias",
          ],
        },
      });

      if (!publicaciones) {
        return res.status(404).json({
          message: "No se encontraron publicaciones para este servicio",
        });
      }
      res.status(200).json({
        Mensaje: "Publicaciones encontradas con éxito",
        publicaciones: publicaciones,
      });
    } catch (error) {
      next(error);
    }
  }

  // Método para buscar publicaciones por usuario
  async buscarPorUsuario(req, res, next) {
    try {
      const idUsuario = req.params.idUsuario;
      const publicaciones = await Publicacion.findAll({
        where: { idPersona: idUsuario },
        include: [
          {
            model: Localidad,
            as: "localidad",
            attributes: ["nombre"],
            include: [
              {
                model: Provincia,
                as: "provincia",
                attributes: ["nombre"],
              },
            ],
          },
          {
            model: Servicio,
            as: "servicio",
            attributes: ["nombre"],
          },
          {
            model: Persona,
            as: "persona",
            attributes: [
              "id",
              "usuario",
              "imagenAdjunta",
              "nombre",
              "telefono",
            ],
          },
        ],
        attributes: {
          exclude: [
            "idLocalidad",
            "idPersona",
            "idProvincia",
            "idServicio",
            "duracionDias",
          ],
        },
      });

      if (!publicaciones) {
        return res.status(404).json({
          message: "No se encontraron publicaciones para este servicio",
        });
      }
      res.status(200).json({
        Mensaje: "Publicaciones encontradas con éxito",
        publicaciones: publicaciones,
      });
    } catch (error) {
      next(error);
    }
  }

  // Función asincrónica para dar de alta una publicación
  async altaPublicacion(req, res, next) {
    try {
      const publicacionData = req.body;
      // Crea un nuevo registro de publicación en la base de datos utilizando los datos proporcionados
      await Publicacion.create(publicacionData);
      res.status(201).json({
        Mensaje: "Publicación creada con éxito",
        Exito: true,
      });
    } catch (error) {
      next(error); // Lanzar el error para que se maneje en el middleware de manejo de errores
    }
  }

  // Función asincrónica para traer todas las publicaciones
  async traerPublicaciones(req, res, next) {
    try {
      // Busca y devuelve todas las publicaciones en la base de datos
      let publicaciones = await Publicacion.findAll({
        include: [
          {
            model: Localidad,
            as: "localidad",
            attributes: ["nombre"],
          },
          {
            model: Servicio,
            as: "servicio",
            attributes: ["nombre"],
          },
        ],
        attributes: ["id", "titulo", "fechaPublicacion"],
      });
      res.status(200).json({
        Mensaje: "Publicaciones traídas con éxito",
        publicaciones: publicaciones,
      });
    } catch (error) {
      next(error); // Lanzar el error para que se maneje en el middleware de manejo de errores
    }
  }

  async ExistePublicacionPorId(id) {
    try {
      const publicacion = await Publicacion.findByPk(id);
      if (publicacion != null) {
        return true;
      }
      return false;
    } catch (e) {
      e.message = "Error al verificar si existe la publicacion mediante ID";
      e.statusCode = 500;
      throw e;
    }
  }

  async eliminarPublicacion(req, res, next) {
    try {
      const id = req.params.idPublicacion;
      if (!(await this.ExistePublicacionPorId(id))) {
        let e = new Error(`No se encontro la publicacion asociada`);
        e.statusCode = 409;
        throw e;
      }
      await Publicacion.destroy({
        where: {
          id: id,
        },
      });
      res.status(201).json({
        Mensaje: "publicacion eliminada con exito",
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new publicacionController();
