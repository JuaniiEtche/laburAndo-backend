let request = require("supertest");
let app = require("../../app");
let Jwt = require("../models/Jwt");
let Sequelize = require("sequelize");

describe("Pruebas del endpoint /api/servicio", () => {
  let token;
  let sequelize;

  beforeAll(async () => {
    // Configurar Sequelize para usar SQLite en memoria
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:", // Usar una base de datos en memoria para pruebas
      logging: false, // Deshabilitar registros de consultas SQL en la consola
    });
    await sequelize.sync();
    let informacionUsuario = {
      email: "matiasomarbatista99@gmail.com",
      password: "1234",
    };

    token = await Jwt.crearToken(informacionUsuario);
  });

  afterAll(async () => {
    // Cierra la conexión a la base de datos después de todas las pruebas
    await sequelize.close();
  });

  it("Debería obtener todos los servicios con el token válido", async () => {
    let response = await request(app)
      .get("/api/servicio")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.Mensaje).toBe("Servicios traídos con éxito");
    expect(Array.isArray(response.body.servicios)).toBe(true);
  });
});
