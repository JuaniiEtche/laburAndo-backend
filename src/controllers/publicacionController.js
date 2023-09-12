const Publicacion = require("../models/Publicacion");

class publicacionController {
  async altaPublicacion(req, res) {
    try {
      const publicacionData = req.body;
      const nuevaPublicacion = await Publicacion.create(publicacionData);

      res.status(201).json({
        message: "Publicación creada con éxito",
        publicacion: nuevaPublicacion.toJSON(),
      });
    } catch (error) {
      console.error("Error al crear la publicación:", error);
      res.status(500).json({ error: "No se pudo crear la publicación" });
    }
  }
}

module.exports = new publicacionController();
