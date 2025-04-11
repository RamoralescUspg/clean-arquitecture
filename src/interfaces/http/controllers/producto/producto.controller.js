export class ProductoController {
  constructor(productoUseCases) {
    this.productoUseCases = productoUseCases;
  }

  async create(req, res) {
    try {
      const producto = await this.productoUseCases.create(req.body);
      
      return res.status(201).json({
        success: true,
        data: producto
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error al crear el producto",
        error: error.message
      });
    }
  }
  
  async getAll(req, res) {
    /* implement */
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const producto = await this.productoUseCases.getById(id);

      if (!producto) {
        return res.status(404).json({
          success: false,
          message: "Producto no encontrado",
        });
      }

      return res.status(200).json({
        success: true,
        data: producto,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error al obtener el producto",
        error: error.message,
      });
    }
  }
  
  async update(req, res) {
    const producto = await this.productoUseCases.update(req.params.id, req.body);
    res.status(200).json(producto);
  }

  async delete(req, res) {
    const productDeletedSuccess = await this.productoUseCases.delete(
      req.params.id
    );
    if (!productDeletedSuccess) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    return res.status(200).json({ deletedId: req.params.id });
  }
}
