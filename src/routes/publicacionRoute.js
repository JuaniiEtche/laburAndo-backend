const express = require("express");
const publicacionController = require("../controllers/publicacionController.js");
const publicacionRouter = express.Router();

publicacionRouter.post("/publicacion", publicacionController.altaPublicacion);

module.exports = publicacionRouter;
