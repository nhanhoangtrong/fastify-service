import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import nock from 'nock';
import createFastify from '../lib/fastify.js';

const fastify = await createFastify();

describe('FnG route test', () => {
  beforeAll(async () => {
    await fastify.ready();
  });

  afterAll(async () => {
    await fastify.close();
  });

  it('should handle FnG request', async () => {
    nock('https://api.alternative.me')
      .get('/fng')
      .reply(200, {
        name: 'Fear and Greed Index',
        data: [
          {
            value: '24',
            value_classification: 'Extreme Fear',
            timestamp: '1741651200',
            time_until_update: '44336',
          },
        ],
        metadata: {
          error: null,
        },
      });

    const response = await fastify.inject({
      method: 'GET',
      url: '/fng',
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      success: true,
      text: '*Fear and Greed Index*\n  _Classify: Extreme Fear - value: 24_',
    });
  });
});
