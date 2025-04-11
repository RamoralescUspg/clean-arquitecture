import { ProductoRepository } from "../../../domain/repositories/ProductoRepository.js";

export class ProductoRepositoryImpl extends ProductoRepository {
  constructor(database) {
    super();
    this.db = database;
  }

  async create(data) {}

  async getAll() {}

  async getById(id) {
    return (await this.db.products.find((item) => item.id === id)) || null;
  }

  async update(id, data) {}

  async delete(id) {
    const productExists = this.db.products.some((p) => p.id === id);
    if (!productExists) return false;

    this.db.products = this.db.products.filter((p) => p.id !== id);
    return true;
  }
}
