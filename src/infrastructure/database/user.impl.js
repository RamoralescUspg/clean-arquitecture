import { UserRepository } from '../../domain/repositories/user.repository.js';

export class UserRepositoryImpl extends UserRepository {
  constructor(database) {
    super();
    this.db = database;
  }

  async getById(id) {
    const user = await this.db.users.findOne({ id }); // Supón Mongo o similar
    return user;
  }
}
