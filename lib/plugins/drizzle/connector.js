import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import Config from '../../config.js';

/**
 *
 * @param {{ connectionString: string }} opts Connection string
 * @returns {Promise<ReturnType<typeof import('drizzle-orm/node-postgres').drizzle>>}
 */
async function createConnection(opts) {
  try {
    const connectionString = opts.connectionString;

    const client = new pg.Client({ connectionString });
    await client.connect();

    const handler = drizzle({ client, logger: Config.env === 'development' });
    return handler;
  } catch (err) {
    throw new Error(`An error occured initializing connection: ${err.message}`);
  }
}

export default createConnection;
