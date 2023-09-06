const express = require("express");
const personaController = require("../controllers/personaController.js");
const personaRouter = express.Router();

//Ejemplo
personaRouter.get("/user", personaController.showProfile);

module.exports = personaRouter;
