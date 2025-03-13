import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import fp from 'fastify-plugin';

/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 * @param {import("@fastify/jwt").FastifyJWTOptions} opts
 */
async function fastifySwagger(fastify, opts = {}) {
  await fastify.register(swagger, {
    openapi: {
      openapi: '3.0.3',
      info: {
        title: 'Fastify Service Docs',
        description: 'The Fastify swagger API documentation',
        version: '0.1.0',
      },
      servers: [
        {
          url: 'http://localhost:4000',
          description: 'Development server',
        },
      ],
      tags: [
        { name: 'user', description: 'User related end-points' },
        { name: 'auth', description: 'Authentication related end-points' },
        { name: 'utilities', description: 'Utilities related end-points' },
      ],
    },
  });

  await fastify.register(swaggerUI, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
  });
}

export default fp(fastifySwagger);
