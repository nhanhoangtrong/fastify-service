import swagger from '@fastify/swagger';
import fp from 'fastify-plugin';

async function fastifySwagger(fastify, opts = {}) {
  await fastify.register(swagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'Service swagger',
        description: 'Testing the Fastify swagger API',
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
        { name: 'utilities', description: 'Utilities related end-points' },
      ],
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here',
      },
    },
  });

  await fastify.register(import('@fastify/swagger-ui'), {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
    uiHooks: {
      onRequest: (request, reply, next) => {
        next();
      },
      preHandler: (request, reply, next) => {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
    ...opts,
  });
}

export default fp(fastifySwagger);
