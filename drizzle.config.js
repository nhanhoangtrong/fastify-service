import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './lib/schemas/*.js',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    connectionString: process.env.DB_URL || '',
  },
});
