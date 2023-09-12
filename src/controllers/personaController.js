const Persona = require("../models/Persona");
const bcrypt = require("bcrypt");

class PersonaController {
  async altaPersona(req, res) {
    try {
      var personaData = req.body;
      var claveHasheada = await bcrypt.hash(personaData.clave, 10);
      personaData.clave = claveHasheada;
      await Persona.create(personaData);

      res.status(201).json({
        Mensaje: "Persona creada con éxito",
        Exito: true,
      });
    } catch (error) {
      res
        .status(500)
        .json({ Mensaje: "No se pudo crear la persona", Exito: false });
    }
  }
}

module.exports = new PersonaController();
