export class ProductsUseCases {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }

  async create(data) {
    return await this.productsRepository.create(data);
  }

  async getAll() {
    return await this.productsRepository.getAll();
  }

  async getById(id) {
    return await this.productsRepository.getById(id);
  }

  async update(id, data) {
    return await this.productsRepository.update(id, data);
  }

  async delete(id) {
    return await this.productsRepository.delete(id);
  }
}
