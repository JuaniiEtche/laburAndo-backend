require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");

class Jwt {
  async crearToken(informacionUsuario, req, res, next) {
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
      next(error);
    }
  }

  async verificarToken(req, res, next) {
    try {
      const authHeader = req.headers["authorization"];
      if (!authHeader) {
        let e = new Error();
        e.statusCode = 401;
        next(e);
        return;
      }
      const token = authHeader.replace("Bearer ", "");
      await jwt.verify(token, process.env.SECRET_KEY_JWT, (err) => {
        if (err) {
          let e = new Error();
          e.statusCode = 403;
          next(e);
          return;
        }
        next();
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Jwt();
