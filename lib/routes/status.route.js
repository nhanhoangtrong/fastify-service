/**
 * @param {root.FastifyInstance} fastify
 * @param {import("fastify").FastifyPluginOptions} options
 */
async function statusRoute(fastify, options) {
  // Register webhook routes
  fastify.log.info('register /status routes with options', options);
  fastify.get('/status', () => {
    return {
      text: 'success',
      status: 200,
      success: true,
    };
  });
}

export default statusRoute;
