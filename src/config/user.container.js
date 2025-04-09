import { UsersRepositoryImpl } from '../infrastructure/database/users/users.impl.js';
import { UsersUseCases } from '../application/use_cases/users/usersUseCases.js';
import { UsersController } from '../interfaces/http/controllers/users/users.controller.js';
import { usersRoutes } from '../interfaces/http/routes/users/users.routes.js';
import {db} from "../core/databases/db.js";

const userRepository = new UsersRepositoryImpl(db);
const userUseCases = new UsersUseCases(userRepository);
const userController = new UsersController(userUseCases);

export default usersRoutes(userController);