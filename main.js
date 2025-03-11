import Config from './lib/config.js';
import createFastify from './lib/fastify.js';
import registerJobs from './lib/jobs/main.js';
// Start server
const start = async () => {
  try {
    const fastify = await createFastify();
    // Wait for readiness
    await fastify.ready();
    await fastify.listen({
      port: Number.parseInt(Config.PORT) || 3000,
    });
    // Register job after
    registerJobs(fastify);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
