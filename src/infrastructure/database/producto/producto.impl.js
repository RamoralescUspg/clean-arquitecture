import { ProductoRepository } from "../../../domain/repositories/ProductoRepository.js";
import Producto from "../../../domain/entities/producto/Producto.js";

export class ProductoRepositoryImpl extends ProductoRepository {
  constructor(database) {
    super();
    this.db = database;
  }

  async create(producto) {
    try {
      this.db.products.push(producto);
      return producto;
    } catch (error) {
      throw new Error(`Error creating product: ${error.message}`);
    }
  }

  async getAll() {}

  async getById(id) {
    return (
      new Producto(await this.db.products.find((item) => item.id === id)) ??
      null
    );
  }

  async update(id, data) {
    const index = this.db.products.findIndex((item) => item.id === id);
    if (index === -1) return null;

    this.db.products[index] = data;
    return new Producto(this.db.products[index]);
  }

  async delete(id) {
    const productExists = this.db.products.some((p) => p.id === id);
    if (!productExists) return false;

    this.db.products = this.db.products.filter((p) => p.id !== id);
    return true;
  }
}
