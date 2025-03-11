import fngServices from '../services/fng.service.js';
import { checkFnGTemplate } from '../templates/check-fng.template.js';

/**
 * @param {root.FastifyInstance} fastify fastify instance
 * @param {telegram.TelegramMessage} teleMessage
 * @returns {HandlerResponse}
 */
async function handleCheckFear(fastify, teleMessage) {
  const resp = {
    text: '',
    success: true,
  };
  try {
    const data = await fngServices.requestFnG();
    resp.text = checkFnGTemplate(data);
  } catch (err) {
    resp.success = false;
    resp.text = err.message;
  }
  return resp;
}

export { handleCheckFear };
