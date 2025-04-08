import { ProductsRepository } from '../../../domain/repositories/ProductsRepository.js';

export class ProductsRepositoryImpl extends ProductsRepository {
  constructor(database) {
    super();
    this.db = database;
  }

  async create(data) { /* implement */ }
  async getAll() { /* implement */ }
  async getById(id) { /* implement */ }
  async update(id, data) { /* implement */ }
  async delete(id) { /* implement */ }
}
