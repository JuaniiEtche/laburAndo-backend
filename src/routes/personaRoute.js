// Define las rutas relacionadas con las personas
const express = require("express");
const personaController = require("../controllers/personaController.js");
const personaRouter = express.Router();
const Jwt = require("../models/Jwt.js");
// Ruta para crear una nueva persona con manejo de errores
personaRouter.post("/usuario", async (req, res, next) => {
  await personaController.altaPersona(req, res, next);
});

personaRouter.get("/usuario", Jwt.verificarToken, async (req, res, next) => {
  await personaController.obtenerPersonas(req, res, next);
});

personaRouter.get(
  "/usuario/:id",
  Jwt.verificarToken,
  async (req, res, next) => {
    await personaController.obtenerPersona(req, res, next);
  }
);

personaRouter.get(
  "/usuario/telefono/:telefono",
  Jwt.verificarToken,
  async (req, res, next) => {
    await personaController.buscarPorTelefono(req, res, next);
  }
);

personaRouter.get(
  "/usuario/nombreUsuario/:username",
  Jwt.verificarToken,
  async (req, res, next) => {
    await personaController.buscarPorUsuario(req, res, next);
  }
);

module.exports = personaRouter;
