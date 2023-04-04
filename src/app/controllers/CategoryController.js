const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    const { orderBy } = request.params;
    const categories = await CategoriesRepository.findAll(orderBy);
    if (!categories) {
      return response.status(404).json({ error: 'Not found' });
    }

    return response.json(categories);
  }

  async show(request, response) {
    const { id } = request.params.id;
    const category = await CategoriesRepository.findById(id);

    if (!category) {
      return response.status(404).json({ error: 'Category not found' });
    }

    return response.json(category);
  }

  async store(request, response) {
    const { name } = request.body;
    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }
    const categoryExists = await CategoriesRepository.findByName(name);
    if (categoryExists) {
      return response.status(400).json({ error: 'This category already exists' });
    }
    const newCategory = await CategoriesRepository.create(name);
    return response.json(newCategory);
  }

  async update(request, response) {
    const { id } = request.params.id;
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }
    const categoryExists = await CategoriesRepository.findByName(name);
    if (categoryExists) {
      return response.status(400).json({ error: 'This category already exists' });
    }
    const updatedCategory = await CategoriesRepository.update(id, name);

    return response.json(updatedCategory);
  }

  async delete(request, response) {
    const { id } = request.params.id;
    const category = await CategoriesRepository.findById(id);
    if (!category) {
      return response.status(404).json({ error: 'Category not found' });
    }
    await CategoriesRepository.delete(id);
    return response.json(204);
  }
}

module.exports = new CategoryController();
