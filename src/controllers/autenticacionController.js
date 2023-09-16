const bcrypt = require("bcrypt");
const Persona = require("../models/Persona");
const Jwt = require("../models/Jwt");

class AutenticacionController {
  async login(req, res) {
    const campoIdentificador = req.body["email"] || req.body["usuario"];
    const password = req.body["password"];

    if (!campoIdentificador) {
      return res.status(400).json({
        Mensaje: "Campo de identificación no proporcionado",
        Exito: false,
      });
    }

    try {
      let usuario;

      if (campoIdentificador.includes("@")) {
        usuario = await Persona.findOne({
          where: { email: campoIdentificador },
        });
      } else {
        usuario = await Persona.findOne({
          where: { usuario: campoIdentificador },
        });
      }

      if (!usuario) {
        return res.status(401).json({
          Mensaje: "Usuario/Contraseña incorrectos",
          Exito: false,
        });
      }

      const esCorrectaLaPassword = await bcrypt.compare(
        password,
        usuario.clave
      );

      if (esCorrectaLaPassword) {
        const user = {
          id: usuario.id,
          usuario: usuario.usuario,
        };
        const token = await Jwt.crearToken(user);
        return res.json({ token });
      } else {
        return res.status(401).json({
          Mensaje: "Usuario/Contraseña incorrectos",
          Exito: false,
        });
      }
    } catch (error) {
      console.error("Error en la autenticación:", error);
      return res.status(500).json({
        Mensaje: "Error en el servidor",
        Exito: false,
      });
    }
  }
}

module.exports = new AutenticacionController();
