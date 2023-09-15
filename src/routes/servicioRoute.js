const express = require("express");
const servicioController = require("../controllers/servicioController.js");
const servicioRouter = express.Router();

servicioRouter.get("/servicio", servicioController.traerServicios);

module.exports = servicioRouter;
