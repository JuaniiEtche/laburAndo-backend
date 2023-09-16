// Importa las bibliotecas necesarias para configurar la aplicación Express
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

module.exports = (app) => {
  // Configuración de CORS (Habilita el intercambio de recursos entre dominios)
  app.use(cors());

  // Configuración de Morgan para el registro de solicitudes HTTP en formato "dev"
  app.use(morgan("dev"));

  // Configuración de bodyParser para analizar datos JSON en solicitudes
  app.use(bodyParser.json());
};
