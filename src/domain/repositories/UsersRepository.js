import { InMemoryRepository } from "../../core/repositories/memory-db-repository.js";

export class UsersRepository extends InMemoryRepository {
    constructor(){
        super("users")
    }
}
