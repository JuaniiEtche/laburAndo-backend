const bcrypt = require("bcrypt");
const Persona = require("../models/Persona");
const Jwt = require("../models/Jwt");
class AutenticacionController {
  async login(req, res, next) {
    const campoIdentificador = req.body["email"] || req.body["usuario"];
    const password = req.body["password"];

    if (!campoIdentificador) {
      let e = new Error();
      e.statusCode = 400;
      next(e);
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
        let e = new Error();
        e.statusCode = 401;
        next(e);
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
        let e = new Error();
        e.statusCode = 401;
        next(e);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AutenticacionController();
