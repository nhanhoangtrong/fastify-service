import { getFnG } from '../controllers/fng.controller.js';

/**
 * @param {root.FastifyInstance} fastify
 * @param {import("fastify").FastifyPluginOptions} options
 */
async function fngRoute(fastify, options) {
  // Register webhook routes
  fastify.log.info('register /fng routes with options', options);
  fastify.get(
    '/fng',
    {
      schema: {
        description: 'Get Feed and Greedy number',
        summary: 'Get Feed and Greedy number',
        tags: ['utilities'],
        response: {
          200: {
            description: 'Success response',
            type: 'object',
            properties: {
              text: { type: 'string' },
              success: { type: 'boolean' },
            },
          },
        },
      },
    },
    getFnG,
  );
}

export default fngRoute;
