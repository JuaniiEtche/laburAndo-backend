// Importa el modelo de Persona y la librería bcrypt para el hashing de contraseñas
const Persona = require("../models/Persona");
const bcrypt = require("bcrypt");

class PersonaController {
  // Función asincrónica para dar de alta a una persona
  async altaPersona(personaData) {
    try {
      // Hashea la contraseña proporcionada en personaData
      var claveHasheada = await bcrypt.hash(personaData.clave, 10);
      personaData.clave = claveHasheada;

      // Crea un nuevo registro de persona en la base de datos
      await Persona.create(personaData);
    } catch (error) {
      throw error; // Lanzar el error para que se maneje en el middleware de manejo de errores
    }
  }
}

module.exports = new PersonaController();
