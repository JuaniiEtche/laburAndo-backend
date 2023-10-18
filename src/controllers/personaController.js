// Importa el modelo de Persona y la librería bcrypt para el hashing de contraseñas
const Persona = require("../models/Persona");
const bcrypt = require("bcrypt");
const Localidad = require("../models/Localidad");
const Provincia = require("../models/Provincia");
const s = require("../middlewares/notFoundHandler");
const Servicio = require("../models/Servicio");
const ServicioXPersona = require("../models/ServicioXPersona");
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
          {
            model: Servicio,
            as: "servicios",
            through: {
              attributes: [],
            },
            attributes: ["nombre", "descripcion"],
          },
        ],
        attributes: { exclude: ["idLocalidad", "clave"] },
      });

      // Ahora, serviciosDeLaPersona contendrá un arreglo de los servicios de la persona.

      if (!usuario) {
        return res.status(404).json({ message: "Persona no encontrada" });
      }
      res.json(usuario);
    } catch (error) {
      next(error);
    }
  }

  async buscarPorTelefono(req, res, next) {
    try {
      const telefono = req.params.telefono;
      const usuario = await Persona.findOne({
        where: { telefono: telefono },
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
            as: "servicios",
            through: {
              attributes: [],
            },
            attributes: ["nombre", "descripcion"],
          },
        ],
        attributes: { exclude: ["idLocalidad", "clave"] },
      });

      if (!usuario) {
        return res.status(404).json({ message: "Persona no encontrada" });
      }
      res.json(usuario);
    } catch (error) {
      next(error);
    }
  }

  async buscarPorUsuario(req, res, next) {
    try {
      const username = req.params.username;
      const usuario = await Persona.findOne({
        where: { usuario: username },
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
            as: "servicios",
            through: {
              attributes: [],
            },
            attributes: ["nombre", "descripcion"],
          },
        ],
        attributes: { exclude: ["idLocalidad", "clave"] },
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
        attributes: { exclude: ["idLocalidad", "clave"] },
      });
      res.json(usuarios);
    } catch (error) {
      next(error);
    }
  }
  async altaPersona(req, res, next) {
    try {
      const personaData = req.body;
      const clavesNecesarias = [
        "nombre",
        "apellido",
        "email",
        "telefono",
        "usuario",
        "clave",
        "idLocalidad",
        "imagenAdjunta",
        "descripcion",
      ];
      clavesNecesarias.forEach((element) => {
        if (!personaData.hasOwnProperty(element)) {
          let e = new Error(
            `Debe proporcionarse el atributo '${element}' en la solicitud`
          );
          e.statusCode = 400;
          next(e);
        }
      });

      // Verifica si ya existe una persona con el mismo correo electrónico
      const existingEmail = await Persona.findOne({
        where: {
          email: personaData.email,
        },
      });

      if (existingEmail) {
        const error = new Error(
          "El email ingresado ya esta registrado en otra cuenta"
        );
        error.statusCode = 409;
        throw error;
      }

      // Verifica si ya existe una persona con el mismo usuario
      const existingUsuario = await Persona.findOne({
        where: {
          usuario: personaData.usuario,
        },
      });

      if (existingUsuario) {
        const error = new Error(
          "El username ingresado ya esta registrado en otra cuenta"
        );
        error.statusCode = 409;
        throw error;
      }

      // Verifica si ya existe una persona con el mismo número de teléfono
      const existingTelefono = await Persona.findOne({
        where: {
          telefono: personaData.telefono,
        },
      });

      if (existingTelefono) {
        const error = new Error(
          "El numero de telefono ingresado ya esta registrado en otra cuenta"
        );
        error.statusCode = 409;
        throw error;
      }
      const p = await Persona.create(personaData);

      for (const element of personaData.servicios) {
        const servicioxpersona = {
          idPersona: p.id,
          idServicio: element,
        };
        await ServicioXPersona.create(servicioxpersona);
      }
      res.status(201).json({
        message: "Persona creada con exito",
      });
    } catch (error) {
      next(error); // Lanzar el error para que se maneje en el middleware de manejo de errores
    }
  }
}

module.exports = new PersonaController();
