import Fastify from 'fastify';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Autoload from '@fastify/autoload';
import Config from './config.js';
import drizzlePlugin from './plugins/drizzle/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createFastify(opts) {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application

  const fastify = Fastify({ logger: { level: 'debug' } });

  fastify.register(drizzlePlugin, {
    connectionString: Config.DB_URL,
  });

  fastify.register(Autoload, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, {}),
  });

  return fastify;
}

export default createFastify;
