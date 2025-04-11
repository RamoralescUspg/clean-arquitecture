import Producto from "../../../domain/entities/producto/Producto.js";

export class ProductoUseCases {
  constructor(productoRepository) {
    this.productoRepository = productoRepository;
  }

  async create(data) {
    const producto = new Producto(data);
    producto.id = Date.now().toString();
    return await this.productoRepository.create(producto);
  }

  async getAll() {
    return await this.productoRepository.getAll();
  }

  async getById(id) {
    return await this.productoRepository.getById(id);
  }

  async update(id, data) {
    const producto = new Producto({ ...data, id });
    return await this.productoRepository.update(id, producto);
  }

  async delete(id) {
    return await this.productoRepository.delete(id);
  }
}
