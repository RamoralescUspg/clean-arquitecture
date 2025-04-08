import fs from 'fs';
import path from 'path';

const basePath = process.cwd();
const moduleName = process.argv[2];

if (!moduleName) {
  console.error('❌ Debes especificar un nombre de módulo. Ejemplo: node generate-module.js user');
  process.exit(1);
}

const pascalCase = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const camelCase = (str) => str.charAt(0).toLowerCase() + str.slice(1);

const folders = [
  `src/application/use_cases/${moduleName}`,
  `src/domain/entities/${moduleName}`,
  `src/domain/repositories`,
  `src/infrastructure/database/${moduleName}`,
  `src/interfaces/http/controllers/${moduleName}`,
  `src/interfaces/http/routes/${moduleName}`
];

const files = {
  [`src/domain/entities/${moduleName}/${pascalCase(moduleName)}.js`]: `export default class ${pascalCase(moduleName)} {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }
}
`,

  [`src/domain/repositories/${pascalCase(moduleName)}Repository.js`]: `export class ${pascalCase(moduleName)}Repository {
  async create(data) { throw new Error("Not implemented"); }
  async getAll() { throw new Error("Not implemented"); }
  async getById(id) { throw new Error("Not implemented"); }
  async update(id, data) { throw new Error("Not implemented"); }
  async delete(id) { throw new Error("Not implemented"); }
}
`,

  [`src/application/usecases/${moduleName}/${moduleName}UseCases.js`]: `export class ${pascalCase(moduleName)}UseCases {
  constructor(${camelCase(moduleName)}Repository) {
    this.${camelCase(moduleName)}Repository = ${camelCase(moduleName)}Repository;
  }

  async create(data) {
    return await this.${camelCase(moduleName)}Repository.create(data);
  }

  async getAll() {
    return await this.${camelCase(moduleName)}Repository.getAll();
  }

  async getById(id) {
    return await this.${camelCase(moduleName)}Repository.getById(id);
  }

  async update(id, data) {
    return await this.${camelCase(moduleName)}Repository.update(id, data);
  }

  async delete(id) {
    return await this.${camelCase(moduleName)}Repository.delete(id);
  }
}
`,

  [`src/infrastructure/database/${moduleName}/${moduleName}.impl.js`]: `import { ${pascalCase(moduleName)}Repository } from '../../../domain/repositories/${pascalCase(moduleName)}Repository.js';

export class ${pascalCase(moduleName)}RepositoryImpl extends ${pascalCase(moduleName)}Repository {
  constructor(database) {
    super();
    this.db = database;
  }

  async create(data) { /* implement */ }
  async getAll() { /* implement */ }
  async getById(id) { /* implement */ }
  async update(id, data) { /* implement */ }
  async delete(id) { /* implement */ }
}
`,

  [`src/interfaces/http/controllers/${moduleName}/${moduleName}.controller.js`]: `export class ${pascalCase(moduleName)}Controller {
  constructor(${camelCase(moduleName)}UseCases) {
    this.${camelCase(moduleName)}UseCases = ${camelCase(moduleName)}UseCases;
  }

  async create(req, res) { /* implement */ }
  async getAll(req, res) { /* implement */ }
  async getById(req, res) { /* implement */ }
  async update(req, res) { /* implement */ }
  async delete(req, res) { /* implement */ }
}
`,

  [`src/interfaces/http/routes/${moduleName}/${moduleName}.routes.js`]: `import { Router } from 'express';
const router = Router();

export function ${camelCase(moduleName)}Routes(controller) {
  router.post('/', (req, res) => controller.create(req, res));
  router.get('/', (req, res) => controller.getAll(req, res));
  router.get('/:id', (req, res) => controller.getById(req, res));
  router.put('/:id', (req, res) => controller.update(req, res));
  router.delete('/:id', (req, res) => controller.delete(req, res));
  return router;
}
`
};

function generate() {
  folders.forEach(folder => {
    const dirPath = path.join(basePath, folder);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`📁 Carpeta creada: ${folder}`);
    }
  });

  for (const [filePath, content] of Object.entries(files)) {
    const fullPath = path.join(basePath, filePath);
    if (!fs.existsSync(fullPath)) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`📄 Archivo creado: ${filePath}`);
    }
  }

  console.log(`\n✅ Módulo '${moduleName}' generado en /src con Clean Architecture.`);
}

generate();
