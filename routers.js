const express = require("express");
const router = express.Router();
const personaRouter = require("./src/routes/personaRoute");
const publicacionRouter = require("./src/routes/publicacionRoute");
const provinciaRouter = require("./src/routes/provinciaRoute");
const localidadRouter = require("./src/routes/localidadRoute");
const servicioRouter = require("./src/routes/servicioRoute");
const autenticacionRouter = require("./src/routes/autenticacionRoute");
// Definir rutas principales
router.use(personaRouter);
router.use(publicacionRouter);
router.use(provinciaRouter);
router.use(localidadRouter);
router.use(servicioRouter);
router.use(autenticacionRouter);
module.exports = router;
