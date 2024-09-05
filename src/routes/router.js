import { Router } from 'express';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const files = fs
  .readdirSync(__dirname)
  .filter(file => file !== path.basename(__filename) && file.endsWith('.js')); // Asegúrate de filtrar solo archivos .js

files.forEach(async (file) => {
  try {
    const routePath = path.join(__dirname, file);
    const routeModule = await import(pathToFileURL(routePath).href);

    // Verifica si routeModule.default es una función y tiene el método 'use'
    if (typeof routeModule.default === 'function' && 'use' in routeModule.default) {
      // Configura la ruta, ajusta el split según tu convención
      const routeName = file.replace(/\.js$/, ''); // Remueve la extensión .js
      router.use(`/${routeName}`, routeModule.default);
    }
  } catch (error) {
    console.error(`Error al importar el módulo ${file}:`, error);
  }
});

export default router;
