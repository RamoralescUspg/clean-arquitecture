export class UserController {
  constructor(userUseCases) {
    this.userUseCases = userUseCases;
  }

  async create(req, res) {
    try {
      const user = await this.userUseCases.createUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getAll(req, res) {
    try {
      const users = await this.userUseCases.getUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getById(req, res) {
    try {
      const user = await this.userUseCases.getUserById(req.params.id);
      if (user) res.json(user);
      else res.status(404).json({ error: "User not found" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const user = await this.userUseCases.updateUser(req.params.id, req.body);
      if (user) res.json(user);
      else res.status(404).json({ error: "User not found" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const user = await this.userUseCases.deleteUser(req.params.id);
      if (user) res.status(204).send();
      else res.status(404).json({ error: "User not found" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
