export class GetUserById {
    constructor(userRepository) {
      this.userRepository = userRepository;
    }
  
    async execute(id) {
      return await this.userRepository.getById(id);
    }
  }
  