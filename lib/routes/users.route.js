import * as userControllers from '../repositories/users.repository.js';

/**
 * @param {import("fastify").FastifyInstance} fastify
 * @param {import("fastify").FastifyPluginOptions} options
 */
async function usersRoute(fastify, options) {
  // Register webhook routes
  fastify.log.info('register /users routes with options', options);

  fastify.route({
    method: ['GET', 'POST', 'PUT', 'DELETE'],
    url: '/users',
    onRequest: [fastify.authorized],
    handler: (request, reply) => {
      if (request.method === 'GET') {
        return userControllers.getUsers(request, reply);
      }
      if (request.method === 'POST') {
        return userControllers.createUser(request, reply);
      }
      if (request.method === 'PUT') {
        return userControllers.updateUser(request, reply);
      }
      if (request.method === 'DELETE') {
        return userControllers.deleteUser(request, reply);
      }
    },
  });

  fastify.get(
    '/users/:userId',
    {
      onRequest: [fastify.authorized],
    },
    userControllers.getUser,
  );
}

export default usersRoute;
