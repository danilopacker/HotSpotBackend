class ContactController {
  index(request, response) {
    // Listar todos os registros
    response.send('Send from contact controller');
  }

  show() {
    // Obter UM registro
  }

  store() {
    // Criar novo registro

  }

  update() {
    // Editar um registro
  }

  delete() {
    // Deletar um registro
  }
}

// Singleton
module.exports = new ContactController();
