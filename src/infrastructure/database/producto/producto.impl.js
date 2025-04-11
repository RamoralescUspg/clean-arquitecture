import { ProductoRepository } from '../../../domain/repositories/ProductoRepository.js';

export class ProductoRepositoryImpl extends ProductoRepository {
  constructor(database) {
    super();
    this.db = database;
  }

  async create(data) { /* implement */ }
  async getAll() { /* implement */ }
  async getById(id) {return await this.db.products.find(item => item.id === id) || null;}
  async update(id, data) { /* implement */ }
  async delete(id) { /* implement */ }
}
