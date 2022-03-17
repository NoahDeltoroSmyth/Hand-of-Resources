const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('Hand-of-Resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a bike', async () => {
    const expected = {
      manufacturer: 'Federal',
      model: 'Shadow',
      frameSize: 26,
    };
    const res = await request(app).post('/api/v1/bikes').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});
