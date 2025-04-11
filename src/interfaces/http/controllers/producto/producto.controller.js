export class ProductoController {
  constructor(productoUseCases) {
    this.productoUseCases = productoUseCases;
  }

  async create(req, res) { /* implement */ }
  async getAll(req, res) { /* implement */ }
  async getById(req, res) { /* implement */ }
  async update(req, res) { /* implement */ }
  async delete(req, res) {
    const success = await this.productoUseCases.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    return res.status(200).json({ deletedId: req.params.id });
  }
}
