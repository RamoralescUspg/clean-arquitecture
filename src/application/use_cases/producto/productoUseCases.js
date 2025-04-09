export class ProductoUseCases {
  constructor(productoRepository) {
    this.productoRepository = productoRepository;
  }

  async create(data) {
    return await this.productoRepository.create(data);
  }

  async getAll() {
    return await this.productoRepository.getAll();
  }

  async getById(id) {
    return await this.productoRepository.getById(id);
  }

  async update(id, data) {
    return await this.productoRepository.update(id, data);
  }

  async delete(id) {
    return await this.productoRepository.delete(id);
  }
}
