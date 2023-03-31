const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  // Listar todos os registros
  async index(request, response) {
    const { orderBy } = request.params;
    const contacts = await ContactsRepository.findAll(orderBy);
    response.json(contacts);
  }

  // Obter UM registro
  async show(requst, response) {
    const { id } = requst.params.id;
    const contact = await ContactsRepository.findById(id);
    if (!contact) {
      return response.status(404).json({ error: 'User not found' });
    }
    return response.json(contact);
  }

  // Criar novo registro
  async store(request, response) {
    // Pega os dados do corpo da requisição
    const {
      name, email, phone, category_id,
    } = request.body;

    // Verifica se o nome está vazio, e retorna o erro
    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    // Verifica se existe algum usuário com o email cadastrado
    const contactExist = await ContactsRepository.findByEmail(email);
    if (contactExist) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    // Cria o usuário no banco de dados
    const contact = await ContactsRepository.create({
      name, email, phone, category_id,
    });

    // Retorna OK com os dados do contato
    response.json(contact);
  }

  // Editar um registro
  async update(request, response) {
    const { id } = request.params.id;
    const {
      name, email, phone, category_id,
    } = request.body;
    const contactExists = ContactsRepository.findById(id);

    if (!contactExists) {
      return response.status(404).json({ error: 'User not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactByEmail = await ContactsRepository.findByEmail(email);
    if (contactByEmail && contactByEmail.id !== id) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    const contact = await ContactsRepository.update(id, {
      name, email, phone, category_id,
    });

    response.json(contact);
  }

  // Deletar um registro
  async delete(request, response) {
    const { id } = request.params.id;
    const contact = ContactsRepository.findById(id);
    if (!contact) {
      return response.status(404).json({ error: 'User not found' });
    }

    await ContactsRepository.delete(id);
    return response.sendStatus(204);
  }
}

// Singleton
module.exports = new ContactController();
