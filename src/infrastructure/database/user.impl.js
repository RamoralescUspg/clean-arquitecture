import { UserRepository } from '../../domain/repositories/UserRepository.js';

export class UserRepositoryImpl extends UserRepository {
  constructor(database) {
    super();
    this.db = database; // "Base de datos" simulada en memoria
  }

  async create(userData) {
    // Generamos un nuevo id (simulación simple)
    const newId = String(this.db.users.data.length + 1);
    const newUser = { id: newId, ...userData };
    this.db.users.data.push(newUser);
    return newUser;
  }

  async getAll() {
    return this.db.users.data;
  }

  async getById(id) {
    return this.db.users.data.find((user) => user.id === id) || null;
  }

  async update(id, data) {
    const index = this.db.users.data.findIndex((user) => user.id === id);
    if (index === -1) return null;
    const updatedUser = { ...this.db.users.data[index], ...data };
    this.db.users.data[index] = updatedUser;
    return updatedUser;
  }

  async delete(id) {
    const index = this.db.users.data.findIndex((user) => user.id === id);
    if (index === -1) return null;
    const [deletedUser] = this.db.users.data.splice(index, 1);
    return deletedUser;
  }
}
