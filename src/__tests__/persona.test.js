let request = require("supertest");
let app = require("../../app");
let Sequelize = require("sequelize");
let Persona = require("../models/Persona");
let Localidad = require("../models/Localidad");
let Provincia = require("../models/Provincia");
let bcrypt = require("bcrypt");

describe("Pruebas del endpoint /api/usuario", () => {
  let sequelize;
  let localidad, provincia;
  beforeAll(async () => {
    // Configura Sequelize para usar SQLite en memoria para las pruebas
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:", // Utiliza una base de datos en memoria para las pruebas
      logging: false, // Deshabilita la visualización de consultas SQL en la consola
    });

    // Define tus modelos y sincroniza la base de datos
    await sequelize.authenticate();
    await sequelize.sync();

    provincia = await Provincia.create({
      nombre: "provinciaPer",
    });
    localidad = await Localidad.create({
      nombre: "localidadPer",
      idProvincia: provincia.id,
    });
  });

  afterAll(async () => {
    // Eliminar la localidad y provincia creada
    await Localidad.destroy({ where: { id: localidad.id } });
    await Provincia.destroy({ where: { id: provincia.id } });

    // Cierra la conexión a la base de datos después de todas las pruebas
    await sequelize.close();
  });

  it("Debería crear una nueva persona", async () => {
    let nuevaPersona = {
      nombre: "Juan",
      apellido: "Pérez",
      email: "juan@example2.com",
      telefono: "1234567890",
      usuario: "juanperezD",
      clave: "contraseña123",
      idLocalidad: localidad.id,
    };

    let response = await request(app).post("/api/usuario").send(nuevaPersona);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Persona creada con éxito");

    // Verifica que la contraseña se haya hasheado correctamente en la base de datos
    let personaCreada = await Persona.findOne({
      where: { email: nuevaPersona.email },
    });
    let isPasswordHashed = await bcrypt.compare(
      "contraseña123",
      personaCreada.clave
    );
    expect(isPasswordHashed).toBe(true);

    await Persona.destroy({ where: { id: personaCreada.id } });
  });

  it("Debería devolver un error si el correo electrónico ya existe", async () => {
    let nuevaPersona = {
      nombre: "Juan",
      apellido: "Pérez",
      email: "juan@example.com",
      telefono: "123456789",
      usuario: "juanperez",
      clave: "contraseña123",
      idLocalidad: localidad.id,
    };

    let personaCreada = await Persona.create(nuevaPersona);

    let personaExistente = {
      nombre: "Juan",
      apellido: "Pérez",
      email: "juan@example.com",
      telefono: "1234567899",
      usuario: "juanperezz",
      clave: "contraseña123",
      idLocalidad: localidad.id,
    };

    let response = await request(app)
      .post("/api/usuario")
      .send(personaExistente);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Ya existe una persona con este correo electrónico."
    );
    await Persona.destroy({ where: { id: personaCreada.id } });
  });

  it("Debería devolver un error si el usuario ya existe", async () => {
    let nuevaPersona = {
      nombre: "Juan",
      apellido: "Pérez",
      email: "juan@example.com",
      telefono: "123456789",
      usuario: "juanperez",
      clave: "contraseña123",
      idLocalidad: localidad.id,
    };

    let personaCreada = await Persona.create(nuevaPersona);

    let personaExistente = {
      nombre: "Juan",
      apellido: "Pérez",
      email: "juann@example.com",
      telefono: "1234567899",
      usuario: "juanperez",
      clave: "contraseña123",
      idLocalidad: localidad.id,
    };

    let response = await request(app)
      .post("/api/usuario")
      .send(personaExistente);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Ya existe una persona con este usuario."
    );
    await Persona.destroy({ where: { id: personaCreada.id } });
  });

  it("Debería devolver un error si el número de teléfono ya existe", async () => {
    let nuevaPersona = {
      nombre: "Juan",
      apellido: "Pérez",
      email: "juan@example.com",
      telefono: "123456789",
      usuario: "juanperez",
      clave: "contraseña123",
      idLocalidad: localidad.id,
    };

    let personaCreada = await Persona.create(nuevaPersona);

    let personaExistente = {
      nombre: "Juan",
      apellido: "Pérez",
      email: "juann@example.com",
      telefono: "123456789",
      usuario: "juanperezz",
      clave: "contraseña123",
      idLocalidad: localidad.id,
    };

    let response = await request(app)
      .post("/api/usuario")
      .send(personaExistente);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Ya existe una persona con este número de teléfono."
    );
    await Persona.destroy({ where: { id: personaCreada.id } });
  });
});
