import express from 'express';
import { UserRepositoryImpl } from './src/infrastructure/database/user.impl.js';
import { UserUseCases } from './src/usecases/userUseCases.js';
import { UserController } from './src/interfaces/http/controllers/user.controller.js';
import { userRoutes } from './src/interfaces/http/routes/user.routes.js';

const app = express();
app.use(express.json());

// Simulación de base de datos en memoria
const db = {
  users: {
    data: [
      { id: '1', name: 'Alice Smith', email: 'alice@example.com', password: 'secret1' },
      { id: '2', name: 'Bob Johnson', email: 'bob@example.com', password: 'secret2' },
      { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', password: 'secret3' }
    ]
  }
};

// Instanciamos el repositorio, casos de uso y controlador
const userRepository = new UserRepositoryImpl(db);
const userUseCases = new UserUseCases(userRepository);
const userController = new UserController(userUseCases);

// Configuramos las rutas para el CRUD de usuarios
app.use('/api/users', userRoutes(userController));

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
