import { ProductoRepository } from '../../../domain/repositories/ProductoRepository.js';

export class ProductoRepositoryImpl extends ProductoRepository {
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
