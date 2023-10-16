let request = require("supertest");
let app = require("../../app");
let Jwt = require("../models/Jwt");
let Sequelize = require("sequelize");
let Provincia = require("../models/Provincia");
let Localidad = require("../models/Localidad");
let Persona = require("../models/Persona");
let Servicio = require("../models/Servicio");
const Publicacion = require("../models/Publicacion");

describe("Pruebas del endpoint /api/publicacion", () => {
  let token;
  let sequelize;
  let provinciaPu, localidadPu, personaPu, servicioPu;
  beforeAll(async () => {
    // Configurar Sequelize para usar SQLite en memoria
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:", // Usar una base de datos en memoria para pruebas
      logging: false, // Deshabilitar registros de consultas SQL en la consola
    });
    await sequelize.sync();

    provinciaPu = await Provincia.create({
      nombre: "bs asP",
    });
    localidadPu = await Localidad.create({
      nombre: "lpP",
      idProvincia: provinciaPu.id,
    });
    personaPu = await Persona.create({
      nombre: "JuanPepito",
      apellido: "Pérez Gonzales",
      email: "juanLopez@example.com",
      telefono: "123456789123",
      usuario: "juanperezG",
      clave: "contraseniaa123",
      idLocalidad: localidadPu.id,
    });
    servicioPu = await Servicio.create({
      nombre: "plomeria",
      descripcion: "plomeria descripcion",
    });
    let informacionUsuario = {
      email: "matiasomarbatista99@gmail.com",
      password: "1234",
    };

    token = await Jwt.crearToken(informacionUsuario);
  });

  afterAll(async () => {
    await Persona.destroy({ where: { id: personaPu.id } });
    await Localidad.destroy({ where: { id: localidadPu.id } });
    await Provincia.destroy({ where: { id: provinciaPu.id } });
    await Servicio.destroy({ where: { id: servicioPu.id } });

    // Cierra la conexión a la base de datos después de todas las pruebas
    await sequelize.close();
  });

  it("Debería obtener todas las publicaciones con el token válido", async () => {
    let response = await request(app)
      .get("/api/publicacion")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.Mensaje).toBe("Publicaciones traídas con éxito");
    expect(Array.isArray(response.body.publicaciones)).toBe(true);
  });

  it("Debería obtener la publicacion mediante un id", async () => {
    let publicacion = {
      titulo: "titulo publicacion",
      idLocalidad: localidadPu.id,
      idPersona: personaPu.id,
      idServicio: servicioPu.id,
      descripcion: "descripcion",
      duracionDias: 20,
      fechaPublicacion: "2023-10-11T12:00:00.000Z",
    };

    const p = await Publicacion.create(publicacion);

    let response = await request(app)
      .get(`/api/publicacion/${p.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.Mensaje).toBe("Publicacion traida con éxito");
  });

  it("Debería poder dar de alta una publicación", async () => {
    let publicacion = {
      titulo: "titulo publicacion",
      idLocalidad: localidadPu.id,
      idPersona: personaPu.id,
      idServicio: servicioPu.id,
      descripcion: "descripcion",
      duracionDias: 20,
      fechaPublicacion: "2023-10-11T12:00:00.000Z",
    };

    let response = await request(app)
      .post("/api/publicacion")
      .set("Authorization", `Bearer ${token}`)
      .send(publicacion);

    expect(response.status).toBe(201);
    expect(response.body.Mensaje).toBe("Publicación creada con éxito");
  });

  it("Debería devolver un error si el token es inválido", async () => {
    let tokenInvalido = "token-invalido"; // Token inválido

    let response = await request(app)
      .get("/api/publicacion")
      .set("Authorization", `Bearer ${tokenInvalido}`);

    expect(response.status).toBe(403);
  });
});
