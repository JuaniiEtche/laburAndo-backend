const express = require("express");
const resenaController = require("../controllers/resenaController");
const Jwt = require("../models/Jwt.js");
const resenaRoute = express.Router();

resenaRoute.get("/resenas/:idPersona", async (req, res, next) => {
  await resenaController.obtenerResenas(req, res, next);
});

resenaRoute.post("/resenas", async (req, res, next) => {
  await resenaController.altaResenia(req, res, next);
});

module.exports = resenaRoute;
