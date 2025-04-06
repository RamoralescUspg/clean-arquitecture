import express from 'express';
import { UserRepositoryImpl } from './src/infrastructure/database/user.impl.js';
import { GetUserById } from './src/application/use_cases/get-user-by-id.js';
import { makeGetUserController } from './src/interfaces/http/controllers/user.controller.js';

const app = express();
const db = {
    users: {
      data: [
        { id: '1', name: 'Alice Smith', email: 'alice@example.com' },
        { id: '2', name: 'Bob Johnson', email: 'bob@example.com' },
        { id: '3', name: 'Charlie Brown', email: 'charlie@example.com' }
      ],
      async findOne({ id }) {
        return this.data.find((user) => user.id === id) || null;
      }
    }
  };
  
const userRepository = new UserRepositoryImpl(db);
const getUserById = new GetUserById(userRepository);
const getUserController = makeGetUserController(getUserById);

app.get('/users/:id', getUserController);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
