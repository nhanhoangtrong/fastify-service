import * as userControllers from "../controllers/users.controller.js";

/**
 * @param {root.FastifyInstance} fastify
 * @param {import("fastify").FastifyPluginOptions} options
 */
async function usersRoute(fastify, options) {
  // Register webhook routes
  fastify.log.info('register /users routes with options', options);
  fastify.get('/users', userControllers.getUsers);
  fastify.post('/users', userControllers.createUser);
  fastify.put('/users', userControllers.updateUser);
  fastify.delete('/users', userControllers.deleteUser);
  fastify.get('/users/:userId', userControllers.getUser);
}

export default usersRoute;
