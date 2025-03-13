import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Autoload from '@fastify/autoload';
import Fastify from 'fastify';
import Config from './config.js';
import drizzlePlugin from './plugins/drizzle/index.js';
import swaggerPlugin from './plugins/swagger.js';
import jwtPlugin from './plugins/jwt.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createFastify(opts) {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application

  const fastify = Fastify({ logger: Config.loggerConfig() });

  // Register plugins
  await fastify.register(drizzlePlugin, {
    connectionString: Config.dbUrl,
  });
  await fastify.register(jwtPlugin);
  await fastify.register(swaggerPlugin);

  await fastify.register(Autoload, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, {}),
  });
  return fastify;
}

export default createFastify;
