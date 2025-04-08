export class MemoryDb {
  constructor() {
    this.data = new Map(); // para almacenar elementos con IDs
    this.currentId = 1;
  }

  create(item) {
    const id = this.currentId++;
    const newItem = { id, ...item };
    this.data.set(id, newItem);
    return newItem;
  }

  getAll() {
    return Array.from(this.data.values());
  }

  getById(id) {
    return this.data.get(id) || null;
  }

  update(id, updatedFields) {
    if (!this.data.has(id)) return null;
    const existingItem = this.data.get(id);
    const updatedItem = { ...existingItem, ...updatedFields, id };
    this.data.set(id, updatedItem);
    return updatedItem;
  }

  delete(id) {
    return this.data.delete(id);
  }

  clear() {
    this.data.clear();
    this.currentId = 1;
  }
}
