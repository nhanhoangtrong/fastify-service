import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import createFastify from '../lib/fastify.js';

const fastify = await createFastify();

describe('Authentication', () => {
  beforeAll(async () => {
    await fastify.ready();
  });

  afterAll(async () => {
    await fastify.close();
  });

  it('should return user JWT payload for exist user', async () => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/auth/login',
      body: {
        email: 'test@testgroup.com',
        password: 'password',
      },
    });

    expect(response.statusCode).toBe(200);

    const token = response.json().token;
    const payload = fastify.jwt.decode(token);

    expect(payload).toHaveProperty('sub');
    expect(payload.sub).toBe('6de90a39-a3ec-4356-8428-e2d861d127da');
    expect(payload).toHaveProperty('iat');
    expect(payload).toHaveProperty('exp');
  });

  it('should return 400 - bad request for invalid login info', async () => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/auth/login',
      body: {
        email: '',
        password: '',
      },
    });

    expect(response.statusCode).toBe(400);
  });

  it('should return 401 for invalid JWT on /users route', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/users',
      headers: {
        Authorization: 'Bearer invalidtoken',
      },
    });

    expect(response.statusCode).toBe(401);
  });
});
