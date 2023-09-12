const express = require("express");
const personaController = require("../controllers/personaController.js");
const personaRouter = express.Router();

//Ejemplo
personaRouter.post("/usuario", personaController.altaPersona);

module.exports = personaRouter;
