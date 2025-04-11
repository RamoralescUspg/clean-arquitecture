import Users from "../../../domain/entities/users/Users.js";

export class UsersUseCases {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async create(data) {
    return await this.usersRepository.create(new Users(data));
  }

  async getAll() {
    return (await this.usersRepository.getAll())?.map((p) => new Users(p));
  }

  async getById(id) {
    return new Users(await this.usersRepository.getById(id)) || null;
  }

  async update(id, data) {
    return await this.usersRepository.update(id, new Users(data));
  }

  async delete(id) {
    return await this.usersRepository.delete(id);
  }
}
