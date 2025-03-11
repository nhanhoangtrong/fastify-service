import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createFastify from '../lib/fastify.js';

const fastify = await createFastify();

describe('Status route test', () => {
  beforeAll(async () => {
    await fastify.ready();
  });

  afterAll(async () => {
    await fastify.close();
  });

  it('should handle status check', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/status',
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      status: 200,
      success: true,
      text: 'success',
    });
  });
});
