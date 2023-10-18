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

resenaRoute.delete("/resenas/:id", async (req, res, next) => {
  await resenaController.eliminarResenia(req, res, next);
});

resenaRoute.put("/resenas", async (req, res, next) => {
  await resenaController.aceptarResenia(req, res, next);
});

resenaRoute.delete("/resenas", async (req, res, next) => {
  let e = new Error(`Debe proporcionarse el id de la resenia en la solicitud`);
  e.statusCode = 400;
  next(e);
});

module.exports = resenaRoute;
