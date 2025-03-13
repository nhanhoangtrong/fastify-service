import { config } from 'dotenv';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import createConnector from '../lib/plugins/drizzle/connector.js';
import * as schema from '../lib/schemas/main.js';

config();

async function run() {
  const db = await createConnector({
    connectionString: process.env.DB_URL || '',
  });

  await migrate(db, { migrationsFolder: './drizzle' });

  const salt = bcrypt.genSaltSync(10);
  const hash = await bcrypt.hash('password', salt);

  await db.delete(schema.users).where(eq(schema.users.id, '6de90a39-a3ec-4356-8428-e2d861d127da'));
  await db.insert(schema.users).values({
    id: '6de90a39-a3ec-4356-8428-e2d861d127da',
    email: 'test@testgroup.com',
    passwordHash: hash,
    salt: salt,
    avatar:
      'https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop',
  });

  // seed data with faker-js
  await db?.$client?.end();
}

run().then(() => {
  console.log('✓ All data seeded!');
});
