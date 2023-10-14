let request = require("supertest");
let app = require("../../app");
let Jwt = require("../models/Jwt");
let Sequelize = require("sequelize");
let Provincia = require("../models/Provincia");
let Localidad = require("../models/Localidad");

describe("Pruebas del endpoint /api/localidadesxprovincia", () => {
  let token;
  let sequelize;
  let provincia, localidad;

  beforeAll(async () => {
    // Configurar Sequelize para usar SQLite en memoria
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:", // Usar una base de datos en memoria para pruebas
      logging: false, // Deshabilitar registros de consultas SQL en la consola
    });
    await sequelize.sync();

    provincia = await Provincia.create({
      nombre: "bs asL",
    });

    localidad = await Localidad.create({
      nombre: "lpL",
      idProvincia: provincia.id,
    });

    let informacionUsuario = {
      email: "matiasomarbatista99@gmail.com",
      password: "1234",
    };

    token = await Jwt.crearToken(informacionUsuario);
  });

  afterAll(async () => {
    //Se eliminan las provincias y localidades creadas
    await Localidad.destroy({ where: { id: localidad.id } });
    await Provincia.destroy({ where: { id: provincia.id } });

    // Cierra la conexión a la base de datos después de todas las pruebas
    await sequelize.close();
  });

  it("Debería obtener todas las localidades de una provincia con el token válido", async () => {
    let response = await request(app)
      .get("/api/localidadesxprovincia/bs%20asL")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.Mensaje).toBe(
      "Localidades de la provincia traídas con éxito"
    );
    expect(Array.isArray(response.body.localidades)).toBe(true);
  });
});
