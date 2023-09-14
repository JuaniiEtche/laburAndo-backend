const Localidad = require("../models/Localidad");
const Persona = require("../models/Persona");
const Publicacion = require("../models/Publicacion");
const Servicio = require("../models/Servicio");

class publicacionController {
  async altaPublicacion(req, res) {
    try {
      const publicacionData = req.body;
      await Publicacion.create(publicacionData);

      res.status(201).json({
        Mensaje: "Publicación creada con éxito",
        Exito: true,
      });
    } catch (error) {
      res
        .status(500)
        .json({ Mensaje: "No se pudo crear la publicación", Exito: false });
    }
  }

  async traerPublicaciones(req, res) {
    try {
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
        Exito: true,
        publicaciones: publicaciones,
      });
    } catch (error) {
      res.status(500).json({
        Mensaje: "No se pudieron traer las publicaciones",
        Exito: false,
      });
    }
  }
}

module.exports = new publicacionController();
