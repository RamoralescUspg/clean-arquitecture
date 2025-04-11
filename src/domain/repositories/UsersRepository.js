import { InMemoryRepository } from "../../core/repositories/memory-db-repository.js";
import Users from "../entities/users/Users.js";

export class UsersRepository extends InMemoryRepository {
    constructor(){
        super("users", (item) => new Users(item))
    }
}
