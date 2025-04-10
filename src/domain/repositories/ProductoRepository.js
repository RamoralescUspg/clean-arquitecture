import { InMemoryRepository } from "../../core/repositories/memory-db-repository.js";

export class ProductoRepository  extends InMemoryRepository {
  constructor(){
    super("products")
  }
}
