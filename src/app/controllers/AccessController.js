const AccessRepository = require('../repositories/AccessRepository');

class AccessController {
  // Listar todos os registros
  async index(request, response) {
    const { orderBy } = request.params;
    const access = await AccessRepository.findAll(orderBy);
    return response.json(access);
  }

  // Obter UM registro
  async show(requst, response) {
    const { id } = requst.params;
    const access = await AccessRepository.findById(id);
    if (!access) {
      return response.status(404).json({ error: 'Access not found' });
    }
    return response.json(access);
  }

  // Criar novo registro
  async store(request, response) {
    // Pega os dados do corpo da requisição
    const {
      name, email, datetime,
    } = request.body;

    // Verifica se o nome está vazio, e retorna o erro
    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    if (!email) {
      return response.status(400).json({ error: 'Email is required' });
    }

    // // Verifica se existe algum usuário com o email cadastrado
    // const contactExist = await ContactsRepository.findByEmail(email);
    // if (contactExist) {
    //   return response.status(400).json({ error: 'This e-mail is already in use' });
    // }

    // Cria o usuário no banco de dados
    const access = await AccessRepository.create({
      name, email, datetime,
    });

    // Retorna OK com os dados do contato
    return response.json(access);
  }

  // Editar um registro
  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, datetime,
    } = request.body;
    const findAaccess = AccessRepository.findById(id);

    if (!findAaccess) {
      return response.status(404).json({ error: 'Access not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    // const accessByEmail = await AccessRepository.findByEmail(email);
    // if (!accessByEmail) {
    //   return response.status(400).json({ error: 'This e-mail does not have any access' });
    // }

    const access = await AccessRepository.update(id, {
      name, email, datetime,
    });

    return response.json(access);
  }

  // Deletar um registro
  async delete(request, response) {
    const { id } = request.params;
    const access = await AccessRepository.findById(id);

    if (!access) {
      return response.status(404).json({ error: 'Access not found' });
    }

    await AccessRepository.delete(id);
    return response.sendStatus(204);
  }
}

// Singleton
module.exports = new AccessController();
