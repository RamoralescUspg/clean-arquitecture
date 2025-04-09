## Clean architecture
Clean Architecture, propuesta por Robert C. Martin (Uncle Bob), busca separar responsabilidades y hacer que el código sea escalable, testeable y mantenible.
Las dependencias deben ir de afuera hacia adentro.
Nada en el "centro" debe depender de lo externo (como Express, DBs, etc).

# Partes de una aplicación construida con Clean Architecutre

### 1. Domain (Dominio)
La primera capa, la capa mas baja o las bases de la aplicación, ¿Qué se encuentra en esta capa?
- Entidades base por ejemplo:

```js
export default class Users {
  constructor({ id, name="Jhon doe", email="example@gmail.com" }) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

```
- Interfaces de repositorios: definición de contratos (sin implementación), que deberia tener el repositorio ya implementado
- En este contexto un contrato es una interfaz o clase abstracta que sera implementada por otra clase, es una especie de "reglas" para una clase,
en este caso nos pide que implementemos un metodo "updateMultiple" 
```js
import { MemoryDbBaseRepository } from "../../core/repositories/memorydb-repository";

export class UsersRepository extends MemoryDbBaseRepository {

    updateMultiple(...data){
        throw new Error("No se implemento el metodo updateMultiple");
    }
}

```

### 2. Application/use_cases (Use cases)
- Contiene la lógica de negocio específica, une las entidades con los repositorios.
- Se comunica solo con `domain`.
En este ejemplo vemos un `CRUD` pero pueden ser acciones más simples o complejas.

```js
export class UsersUseCases {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async create(data) {
    return await this.usersRepository.create(data);
  }

  async getAll() {
    return await this.usersRepository.getAll();
  }

  async getById(id) {
    return await this.usersRepository.getById(id);
  }

  async update(id, data) {
    return await this.usersRepository.update(id, data);
  }

  async delete(id) {
    return await this.usersRepository.delete(id);
  }
}

```

### 3. Infrastructure (Infraestructura)
- Implementaciones reales de los repositorios (base de datos, archivos, servicios externos).
- Conexión con MongoDB, PostgreSQL, Firebase, etc.

```js
// infrastructure/database/UserRepositoryImpl.js
import { UserRepository } from '../../domain/repositories/UserRepository.js';

export class UserRepositoryImpl extends UserRepository {
  constructor(database) {
    super();
    this.db = database;
  }

  async getById(id) {
    return await this.db.users.findOne({ id });
  }
}
```

### 4. Interfaces (Interfaz de usuario / delivery)
- Logica de "envio" "interfaz" etc.
- En interfaces encontramos toda la logica del codigo, cosas específicas de un framework, enrutado, apis, etc.
- En esta capa se interactua con nuestros casos de uso.
```js
// interfaces/http/controllers/UserController.js
export class UserController {
  constructor(userUseCases) {
    this.userUseCases = userUseCases;
  }

  async getById(req, res) {
    const user = await this.userUseCases.getById(req.params.id);
    res.json(user);
  }
}

```

###  5. Config / Composition Root (Ensamblado)
Pero, ¿Cómo podemos unir todas estás capas?
En la capa de "config" podemos unir nuestras capas
Ej.

```js
// src/config/container.js
const repo = new UserRepositoryImpl(db);
const useCase = new GetUserById(repo);
const controller = new UserController(useCase);

```

Como podemos observar tomamos nuestra implementacion del `repositorio`, se la "entregamos" a nuestro `useCase` y finalmente se la damos a nuestra interface
que es un controlador de express en este caso.

```
   Interfaces (Express, CLI, UI)
           ↓
     Application (UseCases)
           ↓
       Domain (Entities, Interfaces)
           ↑
Infrastructure (DB, API calls)

```

## Ventajas
- ✨ Testeable de manera sencilla.
- 🔄 Cambiar la base de datos no afecta la lógica.
- ♻️ Separación clara de responsabilidades.
- ⚙️ Reutilizable en distintos entornos: web, CLI, móvil.


### Resumen
La arquitectura limpia, divide las responsabilidades en varias capas y abstrae conceptos reales de manera que la aplicación se vuelva más escalable.
Cómo se observa en la explicación vamos de manera literalmente `abstracta` en la capa más profunda.

- domain: Es la capa mas baja y abstracta donde se tiene la logica más básica del negocio, (`entities`, `repositories`)
- application: Es la segunda capa más baja, aquí se define que comportamientos tendrá nuestra aplicación en base a nuestras entidades y repositorios.
- infrastructure: Es la tercera capa aqui implementamos las funcionalidades de nuestros repositorios, es una capa más cercana al usuario. (`database`, `sql`, `database/users.impl.js`)
- interfaces: Esta capa es la más alta de nuestra arquitectura, podemos encontrar la interacción con el usuario o la entrega de nuestro producto, en este caso un API REST,
pero podría ser una vista, xml, etc. (`controllers`, `routes`)

### Q&A
- ¿Por qué abstraer tanto?
Abstraer las capas facilita los cambios, por ejemplo, si necesitas cambiar la base de datos. Con Clean Architecture, solo debes modificar la capa de infraestructura, mientras que la lógica de negocio permanece intacta. En MVC, los cambios pueden requerir modificar múltiples partes del código, afectando la lógica principal del negocio.

- ¿Por qué Clean Architecture es mejor que MVC?
Clean Architecture ofrece una mejor separación de responsabilidades, facilitando los cambios sin afectar la lógica central. En MVC, las responsabilidades pueden estar más entrelazadas, lo que hace más difícil mantener y escalar el código.

- ¿Por qué Clean Architecture es ideal para cambios frecuentes?
Permite modificar tecnologías (como bases de datos o servicios externos) sin afectar otras capas. La capa de infraestructura puede cambiar sin tocar la lógica del negocio, lo que facilita las actualizaciones.

- ¿Por qué dividir tanto el código si puedo tenerlo todo en un solo archivo?
Aunque tener todo en un solo archivo puede parecer más simple al principio, a medida que el proyecto crece, el código puede volverse desordenado y difícil de mantener. Clean Architecture organiza el código en capas, mejorando su mantenibilidad, testeabilidad y escalabilidad.

![image](https://github.com/user-attachments/assets/c19801fa-75bd-48b3-8e12-99b7bc4b1a21)
