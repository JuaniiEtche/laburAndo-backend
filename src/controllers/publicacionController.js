// Importa los modelos de Localidad, Persona, Publicacion y Servicio
const Localidad = require("../models/Localidad");
const Persona = require("../models/Persona");
const Publicacion = require("../models/Publicacion");
const Servicio = require("../models/Servicio");

class publicacionController {
  // Función asincrónica para dar de alta una publicación
  async altaPublicacion(publicacionData) {
    try {
      // Crea un nuevo registro de publicación en la base de datos utilizando los datos proporcionados
      await Publicacion.create(publicacionData);
    } catch (error) {
      throw error; // Lanzar el error para que se maneje en el middleware de manejo de errores
    }
  }

  // Función asincrónica para traer todas las publicaciones
  async traerPublicaciones() {
    try {
      // Busca y devuelve todas las publicaciones en la base de datos
      return await Publicacion.findAll({
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
    } catch (error) {
      throw error; // Lanzar el error para que se maneje en el middleware de manejo de errores
    }
  }
}

module.exports = new publicacionController();
