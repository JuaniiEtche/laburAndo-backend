const express = require("express");
const publicacionController = require("../controllers/publicacionController.js");
const publicacionRouter = express.Router();
const Jwt = require("../models/Jwt.js");

publicacionRouter.post(
  "/publicacion",
  Jwt.verificarToken,
  publicacionController.altaPublicacion
);

module.exports = publicacionRouter;
