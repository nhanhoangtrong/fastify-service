import fp from 'fastify-plugin';
import { MongoClient } from 'mongodb';
import { MongoDbAdapter } from './DbAdapter.js'

/**
 * @param {import("fastify").FastifyInstance} fastify fastify instance
 * @param {import("fastify").FastifyPluginOptions} options initialize options
 */
function loadDb(fastify, options, done) {
  // Load db then assign to fastify
  const { dbUrl, dbName } = options;
  fastify.log.info('loadDb with url = ', dbUrl);

  const mongoClient = new MongoClient(dbUrl);
  mongoClient
    .connect()
    .then(() => {
      fastify.addHook('onClose', (instance, cb) => {
        mongoClient.close(cb);
      });
      const database = mongoClient.db(dbName);

      // After initialize database, load all models

      // Then assign dbAdapter
      const dbAdapter = new MongoDbAdapter(database);
      fastify.decorate('mongoClient', mongoClient);
      fastify.decorate('dbAdapter', dbAdapter);
      done();
    })
    .catch((err) => {
      fastify.log.error('error when connect db', err);
    });
}

export default fp(loadDb, {
  fastify: '>=3.0.0',
  name: 'fastify-mongodb',
});
