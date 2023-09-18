// Importa el modelo de Persona y la librería bcrypt para el hashing de contraseñas
const Persona = require("../models/Persona");
const bcrypt = require("bcrypt");
const Localidad = require("../models/Localidad");
const Provincia = require("../models/Provincia");
const s = require("../middlewares/notFoundHandler");
class PersonaController {
  async obtenerPersona(req, res, next) {
    try {
      const id = req.params.id;
      const usuario = await Persona.findByPk(id, {
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
        ],
      });
      if (!usuario) {
        return res.status(404).json({ message: "Persona no encontrada" });
      }
      res.json(usuario);
    } catch (error) {
      next(error);
    }
  }

  async obtenerPersonas(req, res, next) {
    try {
      let usuarios = await Persona.findAll({
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
        ],
        attributes: { exclude: ["idLocalidad", "usuario", "clave"] },
      });
      res.json(usuarios);
    } catch (error) {
      next(error);
    }
  }
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
