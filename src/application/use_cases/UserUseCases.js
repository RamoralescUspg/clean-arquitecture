export class UserUseCases {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser(userData) {
    return await this.userRepository.create(userData);
  }

  async getUsers() {
    return await this.userRepository.getAll();
  }

  async getUserById(id) {
    return await this.userRepository.getById(id);
  }

  async updateUser(id, data) {
    return await this.userRepository.update(id, data);
  }

  async deleteUser(id) {
    return await this.userRepository.delete(id);
  }
}
