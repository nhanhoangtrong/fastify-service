import fngService from '../services/fng.service.js';
import { checkFnGTemplate } from '../templates/check-fng.template.js';

/**
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
async function getFnGText() {
  try {
    const data = await fngService.requestFnG();
    return checkFnGTemplate(data);
  } catch (err) {
    throw new Error(err.name);
  }
}

export { getFnGText };
