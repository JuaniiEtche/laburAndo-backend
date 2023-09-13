const express = require("express");
const publicacionController = require("../controllers/publicacionController.js");
const publicacionRouter = express.Router();

publicacionRouter.post("/publicacion", publicacionController.altaPublicacion);
publicacionRouter.get("/publicacion", publicacionController.traerPublicaciones);

module.exports = publicacionRouter;
