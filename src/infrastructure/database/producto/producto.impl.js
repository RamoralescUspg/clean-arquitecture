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
  
  async delete(id) { 
    const productExists = this.db.products.some(p => p.id === id);
  if (!productExists) return false;

  this.db.products = this.db.products.filter(p => p.id !== id); 
  return true;
  }
}
