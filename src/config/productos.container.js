import { ProductoRepositoryImpl } from '../infrastructure/database/producto/producto.impl.js';
import { ProductoUseCases } from '../application/use_cases/producto/productoUseCases.js';
import { ProductoController } from '../interfaces/http/controllers/producto/producto.controller.js';
import { productoRoutes } from '../interfaces/http/routes/producto/producto.routes.js';
import {db} from "../core/databases/db.js";

const productoRepository = new ProductoRepositoryImpl(db);
const productoUsecase = new ProductoUseCases(productoRepository);
const productoController = new ProductoController(productoUsecase);

export default productoRoutes(productoController);