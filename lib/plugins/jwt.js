import jwt from '@fastify/jwt';
import fp from 'fastify-plugin';
import Config from '../config.js';

/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 * @param {import("@fastify/jwt").FastifyJWTOptions} opts
 */
async function fastifyJWT(fastify, opts = {}) {
  await fastify.register(jwt, {
    secret: Config.get('jwtSecret', 'supersecret'),
  });

  /**
   * @param {import("fastify").FastifyRequest} request
   * @param {import("fastify").FastifyReply} reply
   */
  async function isAuthorized(request, reply) {
    try {
      const decoded = await request.jwtDecode();
      request.decoded = decoded;
    } catch (err) {
      reply.code(401).send({ message: 'Unauthorized' });
    }
  }

  /**
   * @param {import("fastify").FastifyRequest} request
   * @param {import("fastify").FastifyReply} reply
   */
  async function isAuthenticated(request, reply) {
    try {
      const decoded = await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({ message: 'Unauthorized' });
    }
  }

  fastify.decorate('authenticate', isAuthenticated);
  fastify.decorate('authorized', isAuthorized);
}

export default fp(fastifyJWT);
