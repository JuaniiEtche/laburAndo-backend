require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");

class Jwt {
  async crearToken(informacionUsuario) {
    try {
      const options = {
        expiresIn: process.env.JWT_EXPIRE,
      };
      const token = await jwt.sign(
        informacionUsuario,
        process.env.SECRET_KEY_JWT,
        options
      );
      return token;
    } catch (error) {
      console.error("Error al crear token", error);
      return res.status(500).json({
        Mensaje: "Error en el servidor",
        Exito: false,
      });
    }
  }

  async verificarToken(req, res, next) {
    try {
      const authHeader = req.headers["authorization"];
      if (!authHeader) {
        return res.status(401).json({ message: "Token no proporcionado" });
      }
      const token = authHeader.replace("Bearer ", "");
      await jwt.verify(token, process.env.SECRET_KEY_JWT, (err) => {
        if (err) {
          return res.status(403).json({ message: "Token no válido" });
        }
        next();
      });
    } catch (error) {
      console.error("Error en la verificacion de token:", error);
      return res.status(500).json({
        Mensaje: "Error en el servidor",
        Exito: false,
      });
    }
  }
}

module.exports = new Jwt();
