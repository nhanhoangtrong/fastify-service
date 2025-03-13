import * as telegramControllers from '../repositories/telegram.repository.js';

/**
 * @param {import("fastify").FastifyInstance} fastify
 * @param {import("fastify").FastifyPluginOptions} options
 */
async function webhookRoutes(fastify, options) {
  // Register webhook routes
  fastify.log.info('register /telegram routes with options', options);
  fastify.post('/telegram', telegramControllers.webhook.bind(null, fastify));
}

export default webhookRoutes;
