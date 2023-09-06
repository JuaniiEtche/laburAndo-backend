class PersonaController {
  //Ejemplos
  showProfile(req, res) {
    res.send("Página de perfil del usuario");
  }

  editProfile(req, res) {
    res.send("Editar perfil del usuario");
  }
}

module.exports = new PersonaController();
