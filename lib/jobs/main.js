import cron from 'node-cron';
import Config from '../config.js';

/**
 * Register jobs
 * @param {root.FastifyInstance} fastify fastify FastifyInstance
 */
export default function registerJobs(fastify) {
  fastify.log.info('✓ All job registered');
}
