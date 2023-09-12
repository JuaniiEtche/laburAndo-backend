const Publicacion = require("../models/Publicacion");

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
}

module.exports = new publicacionController();
