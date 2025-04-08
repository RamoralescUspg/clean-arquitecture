export class BaseRepository {
    async create(data) { throw new Error("Not implemented"); }
    async getAll() { throw new Error("Not implemented"); }
    async getById(id) { throw new Error("Not implemented"); }
    async update(id, data) { throw new Error("Not implemented"); }
    async delete(id) { throw new Error("Not implemented"); }
}