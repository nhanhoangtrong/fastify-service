import { handleCheckFear } from '../handlers/fear.js';

/**
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
async function getFnG(request, reply) {
  const resp = await handleCheckFear();
  reply.send(resp);
}

export { getFnG };
