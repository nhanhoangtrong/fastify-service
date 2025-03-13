import { text } from 'drizzle-orm/gel-core';
import { getFnGText } from '../repositories/fng.repository.js';

/**
 * @param {import("fastify").FastifyInstance} fastify
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
    async (request, reply) => {
      try {
        const result = await getFnGText();
        reply.send({
          text: result,
          success: true,
        });
      } catch (error) {
        fastify.log.error('Error in /fng', error);
        reply.send({
          text: `Error: ${error.message}`,
          success: false,
        });
      }
    },
  );
}

export default fngRoute;
