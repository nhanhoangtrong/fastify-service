import { migrate } from 'drizzle-orm/node-postgres/migrator';
import createConnector from '../lib/plugins/drizzle/connector.js';
import { config } from 'dotenv';
import * as schema from '../lib/schemas/main.js';

config();

async function run() {
  const db = await createConnector({
    connectionString: process.env.DB_URL || '',
  });

  await migrate(db, { migrationsFolder: './drizzle' });

  await db.insert(schema.users).values({
    id: '6de90a39-a3ec-4356-8428-e2d861d127da',
    username: 'spotted-hyena-312',
    avatar:
      'https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop',
  });

  // await db.insert(schema.posts).values({
  //   id: '6de90a39-a3ec-4356-8428-e2d861d127da',
  //   title: 'This is the Discussion Title',
  //   content:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut re et doshu dgna aliqua. Ut enim ad minim veniam, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut re et doshu dgna aliqua.',
  //   authorId: '6de90a39-a3ec-4356-8428-e2d861d127da',
  // });

  // await db.insert(schema.comments).values({
  //   title: 'This is the Comment Title',
  //   content:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut re et doshu dgna aliqua. Ut enim ad minim veniam, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut re et doshu dgna aliqua.',
  //   authorId: '6de90a39-a3ec-4356-8428-e2d861d127da',
  //   parentId: '6de90a39-a3ec-4356-8428-e2d861d127da',
  //   parentType: 'posts',
  // });

  // seed data with faker-js
  await db?.$client?.end();
}

run().then(() => {
  console.log('✓ All data seeded!');
});
