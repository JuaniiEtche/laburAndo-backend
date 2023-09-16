// Importa los modelos de Localidad, Persona, Publicacion y Servicio
const Localidad = require("../models/Localidad");
const Persona = require("../models/Persona");
const Publicacion = require("../models/Publicacion");
const Servicio = require("../models/Servicio");

class publicacionController {
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
}

module.exports = new publicacionController();
