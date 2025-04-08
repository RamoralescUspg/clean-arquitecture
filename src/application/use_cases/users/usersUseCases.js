export class UsersUseCases {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async create(data) {
    return await this.usersRepository.create(data);
  }

  async getAll() {
    return await this.usersRepository.getAll();
  }

  async getById(id) {
    return await this.usersRepository.getById(id);
  }

  async update(id, data) {
    return await this.usersRepository.update(id, data);
  }

  async delete(id) {
    return await this.usersRepository.delete(id);
  }
}
