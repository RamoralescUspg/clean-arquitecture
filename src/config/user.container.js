import { UserRepositoryImpl } from '../infrastructure/database/users/users.impl.js';
import { UserUseCases } from '../application/use_cases/users/usersUseCases.js';
import { UserController } from '../interfaces/http/controllers/users/users.controller.js';
import { userRoutes } from '../interfaces/http/routes/users/users.routes.js';

const userRepository = new UserRepositoryImpl(db);
const userUseCases = new UserUseCases(userRepository);
const userController = new UserController(userUseCases);

// Configuramos las rutas para el CRUD de usuarios
app.use('/api/users', userRoutes(userController));

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
