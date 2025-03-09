import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import { connectorInitializationErrorMessage } from './utils/errors.js';

/**
 *
 * @param {{ connectionString: string; isPool?: boolean }} opts Connection string
 */
async function createConnection(opts) {
  try {
    let handler;
    const connectionString = opts.connectionString;
    if (opts.isPool) {
      handler = drizzle(new pg.Pool({ connectionString }));
    } else {
      const client = new pg.Client({ connectionString });
      await client.connect();
      handler = drizzle(client);
    }
    return handler;
  } catch (err) {
    throw new Error(connectorInitializationErrorMessage(opts.connector));
  }
}

export default createConnection;
