// Importamos la interfaz o clase abstracta del repositorio
export class UserRepository {
  constructor(userImpl){
    this.userImpl = userImpl;
  }
  
  async create(userData) {
    // this.userImpl = 
  }
  async getAll() {
    throw new Error("Not implemented");
  }
  async getById(id) {
    throw new Error("Not implemented");
  }
  async update(id, data) {
    throw new Error("Not implemented");
  }
  async delete(id) {
    throw new Error("Not implemented");
  }
}
