import { UsersUseCases } from "../../../../application/use_cases/users/usersUseCases.js";

export class UsersController {
  constructor(usersUseCases = new UsersUseCases()) {
    this.usersUseCases = usersUseCases;
  }

  async create(req, res) {
    return this.usersUseCases.create(req.body);
  }

  async getAll(req, res) {
    return this.usersUseCases.getAll();
  }

  async getById(req, res) {
    return this.usersUseCases.getById(req.params.id);
  }

  async update(req, res) {
    return this.usersUseCases.update(req.params.id, req.body);
  }
  
  async delete(req, res) {
    return this.usersUseCases.update(req.params.id);
  }
}
