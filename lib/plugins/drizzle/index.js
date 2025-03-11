import fp from 'fastify-plugin';
import createConnector from './connector.js';

async function fastifyDrizzle(fastify, opts) {
  try {
    const connector = await createConnector(opts);
    const alias = opts?.alias ? opts.alias : 'db';

    fastify.decorate(alias, connector).addHook('onClose', (instance, done) => {
      const client = fastify[alias]?.session?.client;
      if (client) {
        fastify.log.info('Drizzle client is disconnecting');
        if (typeof client.end === 'function') {
          client.end();
        }
      }
      done();
    });
  } catch (err) {
    fastify.log.error(err.message, err.stack);
    throw new Error(err.message);
  }
}

export default fp(fastifyDrizzle);
