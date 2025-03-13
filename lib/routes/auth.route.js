import Config from '../config.js';
import AuthRepository from '../repositories/auth.repository.js';
import { HttpStatusCode } from 'axios';
/**
 * @param {import("fastify").FastifyInstance} fastify
 * @param {import("fastify").FastifyPluginOptions} options
 */
async function authRoute(fastify, ops) {
  fastify.log.info('register /auth routes with options', ops);

  const authRepository = new AuthRepository(fastify.db);

  // User registration route
  fastify.post(
    '/auth/register',
    {
      schema: {
        summary: 'Register new user',
        tags: ['auth'],
        body: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 8 },
            avatar: { type: 'string', format: 'uri' },
          },
        },
        response: {
          [HttpStatusCode.Created]: {
            type: 'object',
            properties: {
              token: { type: 'string' },
            },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const { email, password, avatar } = request.body;

        const user = await authRepository.register({ email, password, avatar });

        const token = fastify.jwt.sign({ sub: user.id, iat: Date.now() });
        return reply.status(HttpStatusCode.Created).send({ token });
      } catch (e) {
        fastify.log.error(e);
        return reply
          .status(HttpStatusCode.BadRequest)
          .send({ message: `Bad request: ${e.message}` });
      }
    },
  );

  // User login route
  fastify.post(
    '/auth/login',
    {
      schema: {
        summary: 'Get token from email/password',
        tags: ['auth'],
        body: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 8 },
          },
        },
        response: {
          [HttpStatusCode.Ok]: {
            type: 'object',
            properties: {
              token: { type: 'string' },
            },
          },
          [HttpStatusCode.Unauthorized]: {
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body;
      // Create user and return token

      try {
        const user = await authRepository.login({ email, password });

        const exp = Math.floor(Date.now() / 1000 + Config.get('jwtExpire', 86400));
        const token = fastify.jwt.sign({
          sub: user.id,
          iat: Date.now() / 1000,
          exp: exp,
        });
        return reply.status(HttpStatusCode.Ok).send({ token });
      } catch (e) {
        fastify.log.error(e);
        return reply
          .status(HttpStatusCode.Unauthorized)
          .send({ message: `Unauthorized: ${e.message}` });
      }
    },
  );
}

export default authRoute;
