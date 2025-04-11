export class ProductoController {
  constructor(productoUseCases) {
    this.productoUseCases = productoUseCases;
  }

  async create(req, res) { /* implement */ }
  async getAll(req, res) { /* implement */ }
  async getById(req, res) {
    try {
      const { id } = req.params;
      const producto = await this.productoUseCases.getById(id);
      
      if (!producto) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado'
        });
      }
  
      return res.status(200).json({
        success: true,
        data: producto
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error al obtener el producto',
        error: error.message
      });
    }
   }
  async update(req, res) { /* implement */ }
  async delete(req, res) { /* implement */ }
}
