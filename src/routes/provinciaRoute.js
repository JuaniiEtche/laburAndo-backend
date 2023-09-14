const express = require("express");
const provinciaController = require("../controllers/provinciaController.js");
const provinciaRouter = express.Router();

provinciaRouter.get("/provincia", provinciaController.traerProvincias);

module.exports = provinciaRouter;
