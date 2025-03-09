import { getFnG } from '../controllers/fng.controller.js';

/**
 * @param {root.FastifyInstance} fastify
 * @param {import("fastify").FastifyPluginOptions} options
 */
async function fngRoute(fastify, options) {
  // Register webhook routes
  fastify.log.info('register /fng routes with options', options);
  fastify.get('/fng', getFnG);
}

export default fngRoute;
