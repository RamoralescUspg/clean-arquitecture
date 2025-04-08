export class MemoryDbBaseRepository {
    constructor() {
      this.data = new Map(); // Simula una DB con un Map
      this.idCounter = 1;
    }
  
    async create(item) {
      const id = this.idCounter++;
      const newItem = { id, ...item };
      this.data.set(id, newItem);
      return newItem;
    }
  
    async getAll() {
      return Array.from(this.data.values());
    }
  
    async getById(id) {
      return this.data.get(Number(id)) || null;
    }
  
    async update(id, updatedData) {
      if (!this.data.has(Number(id))) return null;
      const current = this.data.get(Number(id));
      const updated = { ...current, ...updatedData, id: Number(id) };
      this.data.set(Number(id), updated);
      return updated;
    }
  
    async delete(id) {
      return this.data.delete(Number(id));
    }
  }
  