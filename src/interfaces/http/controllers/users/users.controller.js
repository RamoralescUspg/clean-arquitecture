import { UsersUseCases } from "../../../../application/use_cases/users/usersUseCases.js";

export class UsersController {
  constructor(usersUseCases = new UsersUseCases()) {
    this.usersUseCases = usersUseCases;
  }

  async create(req, res) {
    const user = await this.usersUseCases.create(req.body);
    res.status(201).json(user);
  }

  async getAll(req, res) {
    const users = await this.usersUseCases.getAll();
    res.status(200).json(users);
  }

  async getById(req, res) {
    const user = await this.usersUseCases.getById(req.params.id);
    res.status(200).json(user);
  }

  async update(req, res) {
    const user = await this.usersUseCases.update(req.params.id, req.body);
    res.status(200).json(user);
  }
  
  async delete(req, res) {
    const user = await this.usersUseCases.delete(req.params.id);
    res.status(200).json(user);
  }
}
