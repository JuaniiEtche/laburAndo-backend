const express = require("express");
const autenticacionController = require("../controllers/autenticacionController");
const autenticacionRouter = express.Router();

autenticacionRouter.post("/auth", autenticacionController.login);

module.exports = autenticacionRouter;
