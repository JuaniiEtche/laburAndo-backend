// Importa el modelo de Persona y la librería bcrypt para el hashing de contraseñas
const Persona = require("../models/Persona");
const bcrypt = require("bcrypt");

class PersonaController {
  // Función asincrónica para dar de alta a una persona
  async altaPersona(req, res, next) {
    try {
      let personaData = req.body;

      // Verifica si ya existe una persona con el mismo correo electrónico
      const existingEmail = await Persona.findOne({
        where: {
          email: personaData.email,
        },
      });

      if (existingEmail) {
        return res.status(400).json({
          message: "Ya existe una persona con este correo electrónico.",
        });
      }

      // Verifica si ya existe una persona con el mismo usuario
      const existingUsuario = await Persona.findOne({
        where: {
          usuario: personaData.usuario,
        },
      });

      if (existingUsuario) {
        return res.status(400).json({
          message: "Ya existe una persona con este usuario.",
        });
      }

      // Verifica si ya existe una persona con el mismo número de teléfono
      const existingTelefono = await Persona.findOne({
        where: {
          telefono: personaData.telefono,
        },
      });

      if (existingTelefono) {
        return res.status(400).json({
          message: "Ya existe una persona con este número de teléfono.",
        });
      }

      // Hashea la contraseña proporcionada en personaData
      var claveHasheada = await bcrypt.hash(personaData.clave, 10);
      personaData.clave = claveHasheada;

      // Crea un nuevo registro de persona en la base de datos
      await Persona.create(personaData);

      res.status(201).json({
        message: "Persona creada con éxito",
      });
    } catch (error) {
      next(error); // Lanzar el error para que se maneje en el middleware de manejo de errores
    }
  }
}

module.exports = new PersonaController();
