import { BaseRepository } from "../../core/repositories/base-repository.js";
import { db } from "../databases/db.js"; // Ajusta ruta según tu estructura
import { v4 as uuidv4 } from "uuid";

export class InMemoryRepository extends BaseRepository {
  constructor(collectionKey, entityConvertor) {
    super();
    if (!db[collectionKey]) {
      throw new Error(`Collection '${collectionKey}' does not exist in db`);
    }
    this.collection = db[collectionKey].data;
    this.entityConvertor = entityConvertor;
  }

  async create(data) {
    const newItem = { id: uuidv4(), ...data };
    this.collection.push(newItem);
    return this.entityConvertor(newItem);
  }

  async getAll() {
    return this.collection.map(this.entityConvertor);
  }

  async getById(id) {
    return this.entityConvertor(this.collection.find(item => item.id === id) || null);
  }

  async update(id, data) {
    const index = this.collection.findIndex(item => item.id === id);
    if (index === -1) return null;

    this.collection[index] = { ...this.collection[index], ...data };
    return this.entityConvertor(this.collection[index]);
  }

  async delete(id) {
    const index = this.collection.findIndex(item => item.id === id);
    if (index === -1) return false;

    this.collection.splice(index, 1);
    return true;
  }
}
